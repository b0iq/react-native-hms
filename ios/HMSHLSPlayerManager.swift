import HMSSDK
import HMSHLSPlayerSDK
import AVKit.AVPlayerViewController

typealias HmsHlsPlayer = HMSHLSPlayerSDK.HMSHLSPlayer

@objc(HMSHLSPlayerManager)
class HMSHLSPlayerManager: RCTViewManager {
    override func view() -> (HMSHLSPlayer) {
        let view = HMSHLSPlayer()
        let hms = getHmsFromBridge()

        view.setHms(hms)

        return view
    }

    func getHmsFromBridge() -> [String: HMSRNSDK] {
        let collection = (bridge.module(for: HMSManager.classForCoder()) as? HMSManager)?.hmsCollection ?? [String: HMSRNSDK]()
        return collection
    }

    override class func requiresMainQueueSetup() -> Bool {
        true
    }
}

class HMSHLSPlayer: UIView {
    // MARK: class instance properties
    var hlsStatsTimerRef: Timer?
    var eventController: HLSPlaybackEventController?
    var hmsHLSPlayerViewController: AVPlayerViewController?
    lazy var hmsHLSPlayer = HmsHlsPlayer()

    // MARK: Handle HMSRNSDK Instance in HMSHLSPlayer instance
    var hmsCollection = [String: HMSRNSDK]()

    func setHms(_ hmsInstance: [String: HMSRNSDK]) {
        hmsCollection = hmsInstance
    }

    // MARK: Handle HMSHLSPlayer RN Component props

    @objc var onHmsHlsPlaybackEvent: RCTDirectEventBlock?

    @objc var onHmsHlsStatsEvent: RCTDirectEventBlock?

    @objc var url: String? {
        didSet {
            if let validURLString = url, !validURLString.isEmpty {
                if let urlInstance = URL(string: validURLString) {
                    hmsHLSPlayer.play(urlInstance)
                }
                return
            }

            guard let hlsStreamingState = hmsCollection["12345"]?.hms?.room?.hlsStreamingState else {
                return
            }

            if hlsStreamingState.running && !hlsStreamingState.variants.isEmpty {
                hmsHLSPlayer.play(hlsStreamingState.variants[0].meetingURL)
            }
        }
    }

    @objc var enableStats: Bool = false {
        didSet {
            if enableStats == true {
                attachHLSPlayerStatsListener()
            } else {
                // If we have existing Stats Timer, Invalidate it
                if let hlsStatsTimer = hlsStatsTimerRef {
                    hlsStatsTimer.invalidate()
                    hlsStatsTimerRef = nil
                }
            }
        }
    }

    @objc var enableControls: Bool = true {
        didSet {
            hmsHLSPlayerViewController?.showsPlaybackControls = enableControls
        }
    }

    // MARK: Constructor & Deconstructor

    override init(frame: CGRect) {
        super.init(frame: frame)

        // setting properties on current UIView
        self.frame = frame
        self.backgroundColor = UIColor(displayP3Red: 0, green: 0, blue: 0, alpha: 1)

        // creating 100ms HLS Player and getting player view controller
        let playerViewController = hmsHLSPlayer.videoPlayerViewController(showsPlayerControls: false)
        hmsHLSPlayerViewController = playerViewController
        playerViewController.view.frame = self.bounds

        // Setting 100ms HLS Player as subview of current UIView
        self.addSubview(playerViewController.view)

        attachPlayerPlaybackListeners()
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    deinit {
        cleanup()
    }

    // MARK: Utility functions
    func cleanup() {
        hmsHLSPlayer.stop()

        // Remove HLS player playback events
        hmsHLSPlayer.delegate = nil

        // Remove HLS player stats timer
        hlsStatsTimerRef?.invalidate()
    }

    private func sendHLSPlaybackEventToJS(_ eventName: String, _ data: [String: Any]) {
        guard let onHmsHlsPlaybackEvent = onHmsHlsPlaybackEvent else { return }

        onHmsHlsPlaybackEvent(["event": eventName, "data": data])
    }

    private func sendHLSStatsEventToJS(_ eventName: String, _ data: [String: Any]) {
        guard let onHmsHlsStatsEvent = onHmsHlsStatsEvent else { return }

        onHmsHlsStatsEvent(["event": eventName, "data": data])
    }

    private func attachPlayerPlaybackListeners() {
        // Attaching HLS Player Playback Events Listener
        eventController = HLSPlaybackEventController(self)
        hmsHLSPlayer.delegate = eventController
    }

    private func attachHLSPlayerStatsListener() {
        // Only Attach listener, if there is no previously attached listener
        if hlsStatsTimerRef == nil {

            // Attaching HLS Player Stats Event Listener
            hlsStatsTimerRef = Timer.scheduledTimer(withTimeInterval: 2.0, repeats: true) { [weak self] _ in
                guard let self = self, self.onHmsHlsStatsEvent != nil else { return }

                let statsMonitor = self.hmsHLSPlayer.statMonitor

                var data = [String: Any]()

                // bandwidth
                data["bandWidthEstimate"] = statsMonitor.estimatedBandwidth
                data["totalBytesLoaded"] = statsMonitor.bytesDownloaded

                // bufferedDuration
                data["bufferedDuration"] = statsMonitor.bufferedDuration
                data["watchDuration"] = statsMonitor.watchDuration

                // distanceFromLive
                data["distanceFromLive"] = statsMonitor.distanceFromLiveEdge

                // frameInfo
                data["droppedFrameCount"] = statsMonitor.droppedFrames

                // videoInfo
                data["averageBitrate"] = statsMonitor.bitrate
                data["videoHeight"] = statsMonitor.videoSize.height
                data["videoWidth"] = statsMonitor.videoSize.width

                self.sendHLSStatsEventToJS(HMSHLSPlayerConstants.ON_STATS_EVENT_UPDATE, data)
            }
        }
    }

    fileprivate func onCue(cue: HMSHLSCue) {
        guard onHmsHlsPlaybackEvent != nil else { return }

        var data = [String: Any]()

        data["id"] = cue.id
        data["startDate"] = String(cue.startDate.timeIntervalSince1970)
        if let endDate = cue.endDate {
            data["endDate"] = String(endDate.timeIntervalSince1970)
        }
        if let payload = cue.payload {
            data["payloadval"] = payload
        }

        sendHLSPlaybackEventToJS(HMSHLSPlayerConstants.ON_PLAYBACK_CUE_EVENT, data)
    }

    fileprivate func onPlaybackFailure(error: Error) {
        guard onHmsHlsPlaybackEvent != nil else { return }

        var data = [String: Any]()

        data["error"] = [
            "errorCode": error.localizedDescription,
            "errorCodeName": error.localizedDescription,
            "message": error.localizedDescription
        ]

        sendHLSPlaybackEventToJS(HMSHLSPlayerConstants.ON_PLAYBACK_FAILURE_EVENT, data)
    }

    fileprivate func onPlaybackStateChanged(state: HMSHLSPlaybackState) {
        guard onHmsHlsPlaybackEvent != nil else { return }

        var data = [String: Any]()

        data["state"] = state.description

        sendHLSPlaybackEventToJS(HMSHLSPlayerConstants.ON_PLAYBACK_STATE_CHANGE_EVENT, data)
    }
}

class HLSPlaybackEventController: HMSHLSPlayerDelegate {
    weak var hmsHlsPlayerDelegate: HMSHLSPlayer?

    init(_ hmsPlayerDelegate: HMSHLSPlayer) {
        self.hmsHlsPlayerDelegate = hmsPlayerDelegate
    }

    func onPlaybackStateChanged(state: HMSHLSPlaybackState) {
        hmsHlsPlayerDelegate?.onPlaybackStateChanged(state: state)
    }

    func onCue(cue: HMSHLSCue) {
        hmsHlsPlayerDelegate?.onCue(cue: cue)
    }

    func onPlaybackFailure(error: Error) {
        hmsHlsPlayerDelegate?.onPlaybackFailure(error: error)
    }
}

enum HMSHLSPlayerConstants {
    // HLS Playback Events
    static let ON_PLAYBACK_CUE_EVENT = "ON_PLAYBACK_CUE_EVENT"
    static let ON_PLAYBACK_FAILURE_EVENT = "ON_PLAYBACK_FAILURE_EVENT"
    static let ON_PLAYBACK_STATE_CHANGE_EVENT = "ON_PLAYBACK_STATE_CHANGE_EVENT"

    // HLS Playback Stats Events
    static let ON_STATS_EVENT_UPDATE = "ON_STATS_EVENT_UPDATE"
}

extension HMSHLSPlaybackState: CustomStringConvertible {
    public var description: String {
        switch self {
        case .buffering:
            return "buffering"
        case .failed:
            return "failed"
        case .paused:
            return "paused"
        case .playing:
            return "playing"
        case .stopped:
            return "stopped"
        case .unknown:
            return "unknown"
        @unknown default:
            return "unknown"
        }
    }
}
