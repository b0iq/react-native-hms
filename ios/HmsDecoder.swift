import HMSSDK
import Foundation

class HmsDecoder: NSObject {
    static func getHmsRoom (_ room: HMSRoom) -> [String: Any] {
        let id: String = room.id
        let name: String = room.name
        let metaData: String = room.metaData ?? ""
        var peers: [[String: Any]] = []
        
        for peer in room.peers {
            peers.append(getHmsPeer(peer))
        }
        
        let result:[String: Any] = ["id": id, "name": name, "metaData": metaData, "peers": peers]
        return result
        
    }
    
    static func getHmsPeer (_ peer: HMSPeer) -> [String: Any] {
        let peerID: String = peer.peerID
        let name: String = peer.name
        let isLocal: Bool = peer.isLocal
        let customerUserID: String = peer.customerUserID ?? ""
        let customerDescription: String = peer.customerDescription ?? ""
        let audioTrack: [String: Any] = getHmsAudioTrack(peer.audioTrack)
        let videoTrack : [String: Any] = getHmsVideoTrack(peer.videoTrack)
        var auxiliaryTracks: [[String: Any]] = []
        
        for track in peer.auxiliaryTracks ?? [] {
            auxiliaryTracks.append(getHmsTrack(track))
        }
        
        let result:[String: Any] = ["peerID": peerID, "name": name, "isLocal": isLocal, "customerUserID": customerUserID, "customerDescription": customerDescription, "audioTrack": audioTrack, "videoTrack": videoTrack, "auxiliaryTracks": auxiliaryTracks]

        return result
    }
    
    static func getHmsTrack (_ track: HMSTrack?) -> [String: Any] {
        if let hmsTrack = track {
            let trackId: String = hmsTrack.trackId
            let source: HMSTrackSource = hmsTrack.source
            let trackDescription: String = hmsTrack.trackDescription
            
            let result:[String: Any]  = ["trackId": trackId, "source": source, "trackDescription": trackDescription]
            return result;
        } else {
            return [:];
        }
    }
    
    static func getHmsAudioTrack (_ hmsAudioTrack: HMSAudioTrack?) -> [String: Any] {
        if let hmsTrack = hmsAudioTrack {
            let trackId: String = hmsTrack.trackId
            let source: HMSTrackSource = hmsTrack.source
            let trackDescription: String = hmsTrack.trackDescription
            
            let result:[String: Any]  = ["trackId": trackId, "source": source, "trackDescription": trackDescription]
            return result;
        } else {
            return [:]
        }
    }
    
    static func getHmsVideoTrack (_ hmsVideoTrack: HMSVideoTrack?) -> [String: Any] {
        if let hmsTrack = hmsVideoTrack {
            let trackId: String = hmsTrack.trackId
            let source: HMSTrackSource = hmsTrack.source
            let trackDescription: String = hmsTrack.trackDescription
            let result : [String: Any] = ["trackId": trackId, "source": source, "trackDescription": trackDescription]
            return result;
        } else {
            return [:]
        }
    }
    
    static func getHmsLocalPeer(_ hmsLocalPeer: HMSLocalPeer?) -> [String: Any] {
        if let peer = hmsLocalPeer {
            let peerID: String = peer.peerID
            let name: String = peer.name
            let isLocal: Bool = peer.isLocal
            let customerUserID: String = peer.customerUserID ?? ""
            let customerDescription: String = peer.customerDescription ?? ""
            let audioTrack: [String: Any] = getHmsAudioTrack(peer.audioTrack)
            let videoTrack : [String: Any] = getHmsVideoTrack(peer.videoTrack)
            var auxiliaryTracks: [[String: Any]] = []
            
            for track in peer.auxiliaryTracks ?? [] {
                auxiliaryTracks.append(getHmsTrack(track))
            }
            
            let localAudioTrack = peer.localAudioTrack()
            let localVideoTrack = peer.localVideoTrack()
            
            var localAudioTrackData: [String: Any] = [:]
            if let localAudio = localAudioTrack {
                localAudioTrackData = ["trackId": localAudio.trackId, "source": localAudio.source, "trackDescription": localAudio.trackDescription, "settings": getHmsAudioTrackSettings(localAudio.settings)]
            }
            
            var localVideoTrackData: [String: Any] = [:]
            if let localVideo = localVideoTrack {
                localVideoTrackData = ["trackId": localVideo.trackId, "source": localVideo.source, "trackDescription": localVideo.trackDescription, "settings": getHmsVideoTrackSettings(localVideo.settings)]
            }
            
            return ["peerID": peerID, "name": name, "isLocal": isLocal, "customerUserID": customerUserID, "customerDescription": customerDescription, "audioTrack": audioTrack, "videoTrack": videoTrack, "auxiliaryTracks": auxiliaryTracks, "localAudioTrackData": localAudioTrackData, "localVideoTrackData": localVideoTrackData]
        } else {
            return [:]
        }
    }
    
    static func getHmsAudioTrackSettings(_ hmsAudioTrackSettings: HMSAudioTrackSettings?) -> [String: Any] {
        if let settings = hmsAudioTrackSettings {
            let maxBitrate = settings.maxBitrate
            let trackDescription = settings.trackDescription ?? ""
            
            return ["maxBitrate": maxBitrate, "trackDescription": trackDescription]
        } else {
            return [:]
        }
    }
    
    static func getHmsVideoTrackSettings(_ hmsVideoTrackSettings: HMSVideoTrackSettings?) -> [String: Any] {
        if let settings = hmsVideoTrackSettings {
            let codec = settings.codec
            let resolution = settings.resolution
            let maxBitrate = settings.maxBitrate
            let maxFrameRate = settings.maxFrameRate
            let cameraFacing = settings.cameraFacing
            let trackDescription = settings.trackDescription ?? ""
            //TODO: add hms simulcast layer settings here
            
            return ["codec": codec, "resolution": resolution, "maxBitrate": maxBitrate, "maxFrameRate": maxFrameRate, "cameraFacing": cameraFacing, "trackDescription": trackDescription]
        } else {
            return [:]
        }
    }
}
