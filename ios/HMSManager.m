#import <React/RCTEventEmitter.h>
#import <Foundation/Foundation.h>

@interface RCT_EXTERN_MODULE(HMSManager, RCTEventEmitter)

RCT_EXTERN_METHOD(join: (NSDictionary) credentials)
RCT_EXTERN_METHOD(preview: (NSDictionary) credentials)
RCT_EXTERN_METHOD(previewForRole: (NSDictionary) data :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)
RCT_EXTERN_METHOD(cancelPreview: (NSDictionary) data)
RCT_EXTERN_METHOD(setLocalMute: (NSDictionary) isMute)
RCT_EXTERN_METHOD(setLocalVideoMute: (NSDictionary) isMute)
RCT_EXTERN_METHOD(sendBroadcastMessage: (NSDictionary) data :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)
RCT_EXTERN_METHOD(sendGroupMessage: (NSDictionary) data :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)
RCT_EXTERN_METHOD(sendDirectMessage: (NSDictionary) data :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)
RCT_EXTERN_METHOD(setPlaybackAllowed: (NSDictionary) data)
RCT_EXTERN_METHOD(removePeer: (NSDictionary) data :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)
RCT_EXTERN_METHOD(endRoom: (NSDictionary) data :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)
RCT_EXTERN_METHOD(changeRole: (NSDictionary) data :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)
RCT_EXTERN_METHOD(changeTrackState: (NSDictionary) data :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)
RCT_EXTERN_METHOD(changeTrackStateForRoles: (NSDictionary) data :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)
RCT_EXTERN_METHOD(acceptRoleChange: (NSDictionary) data :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)
RCT_EXTERN_METHOD(isMute: (NSDictionary) data :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)
RCT_EXTERN_METHOD(getRoom: (NSDictionary) data :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)
RCT_EXTERN_METHOD(switchCamera: (NSDictionary) data)
RCT_EXTERN_METHOD(setVolume: (NSDictionary) data)
RCT_EXTERN_METHOD(build : (NSDictionary) data :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)
RCT_EXTERN_METHOD(leave: (NSDictionary) data :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)
RCT_EXTERN_METHOD(setPlaybackForAllAudio: (NSDictionary) mute)
RCT_EXTERN_METHOD(remoteMuteAllAudio: (NSDictionary) data :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)
RCT_EXTERN_METHOD(isPlaybackAllowed: (NSDictionary) data :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)
RCT_EXTERN_METHOD(changeMetadata: (NSDictionary) data :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)
RCT_EXTERN_METHOD(startRTMPOrRecording: (NSDictionary) data :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)
RCT_EXTERN_METHOD(stopRtmpAndRecording: (NSDictionary) data :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)
RCT_EXTERN_METHOD(startHLSStreaming: (NSDictionary) data :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)
RCT_EXTERN_METHOD(stopHLSStreaming: (NSDictionary) data :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)
RCT_EXTERN_METHOD(changeName: (NSDictionary) data :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)
RCT_EXTERN_METHOD(enableRTCStats: (NSDictionary) data)
RCT_EXTERN_METHOD(disableRTCStats: (NSDictionary) data)
RCT_EXTERN_METHOD(destroy: (NSDictionary) data :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)
RCT_EXTERN_METHOD(startScreenshare: (NSDictionary) data :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)
RCT_EXTERN_METHOD(stopScreenshare: (NSDictionary) data :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)
RCT_EXTERN_METHOD(isScreenShared: (NSDictionary) data :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)
RCT_EXTERN_METHOD(playAudioShare: (NSDictionary) data :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)
RCT_EXTERN_METHOD(setAudioShareVolume: (NSDictionary) data)
RCT_EXTERN_METHOD(stopAudioShare: (NSDictionary) data)
RCT_EXTERN_METHOD(resumeAudioShare: (NSDictionary) data)
RCT_EXTERN_METHOD(pauseAudioShare: (NSDictionary) data)
RCT_EXTERN_METHOD(audioShareIsPlaying: (NSDictionary) data :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)
RCT_EXTERN_METHOD(audioShareCurrentTime: (NSDictionary) data :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)
RCT_EXTERN_METHOD(audioShareDuration: (NSDictionary) data :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)
RCT_EXTERN_METHOD(getLocalPeer: (NSDictionary) data :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)
RCT_EXTERN_METHOD(getRemotePeers: (NSDictionary) data :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)
RCT_EXTERN_METHOD(getRoles: (NSDictionary) data :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)
RCT_EXTERN_METHOD(enableNetworkQualityUpdates: (NSDictionary) data)
RCT_EXTERN_METHOD(disableNetworkQualityUpdates: (NSDictionary) data)
RCT_EXTERN_METHOD(setSessionMetaData: (NSDictionary) data :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)
RCT_EXTERN_METHOD(getSessionMetaData: (NSDictionary) data :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)
RCT_EXTERN_METHOD(changeRoleOfPeer: (NSDictionary) data :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)
RCT_EXTERN_METHOD(changeRoleOfPeersWithRoles: (NSDictionary) data :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)
RCT_EXTERN_METHOD(enableEvent: (NSDictionary) data :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)
RCT_EXTERN_METHOD(disableEvent: (NSDictionary) data :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)
@end
