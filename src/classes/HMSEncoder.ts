import { NativeModules } from 'react-native';

import { HMSTrack } from './HMSTrack';
import { HMSAudioTrack } from './HMSAudioTrack';
import { HMSVideoTrack } from './HMSVideoTrack';
import { HMSRoom } from './HMSRoom';
import { HMSPeer } from './HMSPeer';
import { HMSLocalPeer } from './HMSLocalPeer';
import { HMSRemotePeer } from './HMSRemotePeer';
import { HMSAudioTrackSettings } from './HMSAudioTrackSettings';
import { HMSVideoTrackSettings } from './HMSVideoTrackSettings';
import { HMSLocalVideoTrack } from './HMSLocalVideoTrack';
import { HMSLocalAudioTrack } from './HMSLocalAudioTrack';
import { HMSRole } from './HMSRole';
import { HMSRoleChangeRequest } from './HMSRoleChangeRequest';
import { HMSChangeTrackStateRequest } from './HMSChangeTrackStateRequest';
import { HMSVideoResolution } from './HMSVideoResolution';
import { HMSRTCStats } from './HMSRTCStats';
import { HMSRTCStatsReport } from './HMSRTCStatsReport';
import { HMSRemoteAudioTrack } from './HMSRemoteAudioTrack';
import { HMSRemoteVideoTrack } from './HMSRemoteVideoTrack';
import { HMSSpeaker } from './HMSSpeaker';
import { HMSHLSRecordingState } from './HMSHLSRecordingState';
import { HMSNetworkQuality } from './HMSNetworkQuality';
import { HMSBrowserRecordingState } from './HMSBrowserRecordingState';
import { HMSHLSStreamingState } from './HMSHLSStreamingState';
import { HMSHLSVariant } from './HMSHLSVariant';
import { HMSRtmpStreamingState } from './HMSRtmpStreamingState';
import { HMSServerRecordingState } from './HMSServerRecordingState';
import { HMSMessage } from './HMSMessage';
import { HMSMessageRecipient } from './HMSMessageRecipient';
import { HMSException } from './HMSException';

const { HMSManager } = NativeModules;

interface InitialData {
  roles: Record<string, HMSRole>;
}

export class HMSEncoder {
  private data: InitialData = { roles: {} };

  clearData() {
    this.data = { roles: {} };
  }

  encodeHmsRoom(room: HMSRoom, id: string) {
    const encodedObj = {
      id: room?.id,
      sessionId: room?.sessionId,
      metaData: room?.metaData,
      name: room?.name,
      peerCount: room?.peerCount,
      peers: this.encodeHmsPeers(room?.peers, id),
      browserRecordingState: this.encodeBrowserRecordingState(
        room?.browserRecordingState
      ),
      rtmpHMSRtmpStreamingState: this.encodeRTMPStreamingState(
        room?.rtmpHMSRtmpStreamingState
      ),
      serverRecordingState: this.encodeServerRecordingState(
        room?.serverRecordingState
      ),
      hlsStreamingState: this.encodeHLSStreamingState(
        room?.hlsStreamingState
      ),
      hlsRecordingState: this.encodeHLSRecordingState(
        room?.hlsRecordingState
      ),
      localPeer: this.encodeHmsLocalPeer(room?.localPeer, id),
    };

    return new HMSRoom(encodedObj);
  }

  encodeHmsPeers(peers: any, id: string) {
    const encodedPeers: HMSPeer[] = [];
    peers?.map((peer: any) => {
      encodedPeers.push(this.encodeHmsPeer(peer, id));
    });

    return encodedPeers;
  }

  encodeHmsPeer(peer: any, id: string) {
    const encodedObj = {
      peerID: peer?.peerID,
      name: peer?.name || '',
      isLocal: peer?.isLocal,
      customerUserID: peer?.customerUserID,
      customerDescription: peer?.customerDescription || undefined,
      metadata: peer?.metadata,
      role: this.encodeHmsRole(peer?.role),
      networkQuality: peer?.networkQuality
        ? this.encodeHMSNetworkQuality(peer?.networkQuality)
        : undefined,
      audioTrack: peer?.audioTrack
        ? this.encodeHmsAudioTrack(peer?.audioTrack, id)
        : undefined,
      videoTrack: peer?.videoTrack
        ? this.encodeHmsVideoTrack(peer?.videoTrack, id)
        : undefined,
      auxiliaryTracks: Array.isArray(peer?.auxiliaryTracks)
        ? this.encodeHmsAuxiliaryTracks(peer?.auxiliaryTracks, id)
        : undefined,
    };

    return new HMSPeer(encodedObj);
  }

  encodeHmsAudioTrack(track: any, id: string) {
    const encodedObj = {
      trackId: track?.trackId,
      source: track?.source,
      trackDescription: track?.trackDescription,
      isMute: track?.isMute,
      id: id,
      type: track?.type,
    };

    return new HMSAudioTrack(encodedObj);
  }

  encodeHmsVideoTrack(track: any, id: string) {
    const encodedObj = {
      id: id,
      trackId: track?.trackId,
      source: track?.source,
      trackDescription: track?.trackDescription,
      isMute: track?.isMute,
      isDegraded: track?.isDegraded,
      type: track?.type,
    };

    return new HMSVideoTrack(encodedObj);
  }

  encodeHmsAuxiliaryTracks(tracks: any, id: string) {
    const auxiliaryTracks: HMSTrack[] = [];
    tracks?.map((track: any) => {
      auxiliaryTracks.push(this.encodeHmsTrack(track, id));
    });
    return auxiliaryTracks;
  }

  encodeHmsTrack(track: any, id: string) {
    const encodedObj = {
      trackId: track?.trackId,
      source: track?.source,
      trackDescription: track?.trackDescription,
      isMute: track?.isMute,
      id: id,
      type: track?.type,
    };

    return new HMSTrack(encodedObj);
  }

  encodeHmsLocalPeer(peer: any, id: string) {
    const encodedObj = {
      peerID: peer?.peerID,
      name: peer?.name,
      isLocal: true,
      customerUserID: peer?.customerUserID,
      customerDescription: peer?.customerDescription || undefined,
      metadata: peer?.metadata || undefined,
      role: this.encodeHmsRole(peer?.role),
      networkQuality: peer?.networkQuality
        ? this.encodeHMSNetworkQuality(peer?.networkQuality)
        : undefined,
      audioTrack: peer?.audioTrack
        ? this.encodeHmsAudioTrack(peer?.audioTrack, id)
        : undefined,
      videoTrack: peer?.videoTrack
        ? this.encodeHmsVideoTrack(peer?.videoTrack, id)
        : undefined,
      auxiliaryTracks: Array.isArray(peer?.auxiliaryTracks)
        ? this.encodeHmsAuxiliaryTracks(peer?.auxiliaryTracks, id)
        : undefined,
      localAudioTrackData: peer?.localAudioTrackData?.trackId
        ? {
            id: id,
            trackId: peer?.localAudioTrackData?.trackId,
            source: peer?.localAudioTrackData?.source,
            trackDescription: peer?.localAudioTrackData?.trackDescription,
            isMute: peer?.localAudioTrackData?.isMute,
            settings: peer?.localAudioTrackData?.settings
              ? this.encodeHmsAudioTrackSettings(
                  peer?.localAudioTrackData?.settings
                )
              : undefined,
            type: peer?.localAudioTrackData?.type,
          }
        : undefined,
      localVideoTrackData: peer?.localVideoTrackData?.trackId
        ? {
            id: id,
            trackId: peer?.localVideoTrackData?.trackId,
            source: peer?.localVideoTrackData?.source,
            trackDescription: peer?.localVideoTrackData?.trackDescription,
            isMute: peer?.localVideoTrackData?.isMute,
            settings: peer?.localVideoTrackData?.settings
              ? this.encodeHmsVideoTrackSettings(
                  peer?.localVideoTrackData?.settings
                )
              : undefined,
            type: peer?.localVideoTrackData?.type,
          }
        : undefined,
    };

    return new HMSLocalPeer(encodedObj);
  }

  encodeHmsAudioTrackSettings(settings: any) {
    const encodedObj = {
      useHardwareEchoCancellation: settings?.useHardwareAcousticEchoCanceler,
      initialState: settings?.initialState,
    };

    return new HMSAudioTrackSettings(encodedObj);
  }

  encodeHmsVideoTrackSettings(settings: any) {
    const encodedObj = {
      initialState: settings?.initialState,
      forceSoftwareDecoder: settings?.forceSoftwareDecoder,
      simulcastSettings: settings?.simulcastSettings,
      cameraFacing: settings?.cameraFacing,
      disableAutoResize: settings?.disableAutoResize,
    };

    return new HMSVideoTrackSettings(encodedObj);
  }

  encodeHmsVideoResolution(resolution: any) {
    const encodedObj = {
      height: resolution?.height,
      width: resolution?.width,
    };

    return new HMSVideoResolution(encodedObj);
  }

  encodeHmsLocalAudioTrack(track: any, id: string) {
    const encodedObj = {
      id: id,
      trackId: track?.trackId,
      source: track?.source,
      trackDescription: track?.trackDescription,
      isMute: track?.isMute,
      settings: track?.settings
        ? this.encodeHmsAudioTrackSettings(track?.settings)
        : undefined,
      type: track?.type,
    };

    return new HMSLocalAudioTrack(encodedObj);
  }

  encodeHmsLocalVideoTrack(track: any, id: string) {
    const encodedObj = {
      id: id,
      trackId: track?.trackId,
      source: track?.source,
      trackDescription: track?.trackDescription,
      isMute: track?.isMute,
      settings: track?.settings
        ? this.encodeHmsVideoTrackSettings(track?.settings)
        : undefined,
      type: track?.type,
    };

    return new HMSLocalVideoTrack(encodedObj);
  }

  encodeHmsRemotePeers(peers: any, id: string) {
    const hmsPeers: HMSRemotePeer[] = [];

    peers.map((peer: any) => {
      const encodedPeer = this.encodeHmsRemotePeer(peer, id);

      hmsPeers.push(encodedPeer);
    });

    return hmsPeers;
  }

  encodeHmsRemotePeer(peer: any, id: string) {
    const encodedObj = {
      peerID: peer?.peerID,
      name: peer?.name,
      isLocal: false,
      customerUserID: peer?.customerUserID,
      customerDescription: peer.customerDescription,
      metadata: peer.metadata,
      role: this.encodeHmsRole(peer?.role),
      networkQuality: peer?.networkQuality
        ? this.encodeHMSNetworkQuality(peer?.networkQuality)
        : undefined,
      audioTrack: peer?.audioTrack
        ? this.encodeHmsAudioTrack(peer?.audioTrack, id)
        : undefined,
      videoTrack: peer?.videoTrack
        ? this.encodeHmsVideoTrack(peer.videoTrack, id)
        : undefined,
      auxiliaryTracks: Array.isArray(peer?.auxiliaryTracks)
        ? this.encodeHmsAuxiliaryTracks(peer?.auxiliaryTracks, id)
        : undefined,
      remoteAudioTrackData: peer?.remoteAudioTrackData?.trackId
        ? {
            id: id,
            trackId: peer?.remoteAudioTrackData?.trackId,
            source: peer?.remoteAudioTrackData?.source,
            trackDescription: peer?.remoteAudioTrackData?.trackDescription,
            isMute: peer?.remoteAudioTrackData?.isMute,
            playbackAllowed: peer?.remoteAudioTrackData?.playbackAllowed,
          }
        : undefined,
      remoteVideoTrackData: peer?.remoteVideoTrackData?.trackId
        ? {
            id: id,
            trackId: peer?.remoteVideoTrackData?.trackId,
            source: peer?.remoteVideoTrackData?.source,
            trackDescription: peer?.remoteVideoTrackData?.trackDescription,
            layer: peer?.remoteVideoTrackData?.layer,
            isMute: peer?.remoteVideoTrackData?.isMute,
            playbackAllowed: peer?.remoteVideoTrackData?.playbackAllowed,
          }
        : undefined,
    };

    return new HMSRemotePeer(encodedObj);
  }

  encodeHmsRemoteAudioTrack(track: any, id: string) {
    const encodedObj = {
      id: id,
      trackId: track?.trackId,
      source: track?.source,
      trackDescription: track?.trackDescription,
      isMute: track?.isMute,
      playbackAllowed: track?.playbackAllowed,
    };

    return new HMSRemoteAudioTrack(encodedObj);
  }

  encodeHmsRemoteVideoTrack(track: any, id: string) {
    const encodedObj = {
      id: id,
      trackId: track?.trackId,
      source: track?.source,
      trackDescription: track?.trackDescription,
      layer: track?.layer,
      isMute: track?.isMute,
      playbackAllowed: track?.playbackAllowed,
    };

    return new HMSRemoteVideoTrack(encodedObj);
  }

  encodeHmsPreviewTracks(previewTracks: any[], id: string) {
    return previewTracks?.map((track) => {
      return this.encodeHmsTrack(track, id);
    });
  }

  encodeHmsRoles(roles: any[]) {
    const encodedRoles: HMSRole[] = [];

    roles?.map((item: any) => {
      encodedRoles.push(this.encodeHmsRole(item));
    });

    return encodedRoles;
  }

  encodeHmsRole(role: any) {
    if (!role) {
      return new HMSRole(role);
    }

    const rolesCache = this.data.roles;

    const cachedRole = rolesCache[role.name];

    // create new HMSRole instance, if cached role does not exist OR `role.publishSettings?.allowed` does not exist
    if (!cachedRole || !cachedRole.publishSettings?.allowed) {
      // Creating HMSRole object with data
      const hmsRole = new HMSRole(role);

      // saving the created HMSRole object into cache
      rolesCache[role.name] = hmsRole;

      // If the created HMSRole object is complete,
      // sending notification to Native Side to stop sending data for this role
      if (hmsRole.publishSettings?.allowed) {
        HMSManager.restrictData({ id: "12345", roleName: hmsRole.name });
      }
    }

    return rolesCache[role.name];
  }

  encodeHmsRoleChangeRequest(data: any, id: string) {
    const encodedRoleChangeRequest = {
      requestedBy: data.requestedBy
        ? this.encodeHmsPeer(data.requestedBy, id)
        : undefined,
      suggestedRole: this.encodeHmsRole(data.suggestedRole),
    };

    return new HMSRoleChangeRequest(encodedRoleChangeRequest);
  }

  encodeHmsChangeTrackStateRequest(
    data: HMSChangeTrackStateRequest,
    id: string
  ) {
    const encodedChangeTrackStateRequest = {
      requestedBy: data?.requestedBy
        ? this.encodeHmsPeer(data?.requestedBy, id)
        : undefined,
      trackType: data.trackType,
      mute: data.mute,
    };

    return new HMSChangeTrackStateRequest(encodedChangeTrackStateRequest);
  }

  encodeRTCStats(data: any) {
    let video = this.encodeRTCStatsUnit(data?.video);
    let audio = this.encodeRTCStatsUnit(data?.audio);
    let combined = this.encodeRTCStatsUnit(data?.combined);

    return new HMSRTCStatsReport({ video, audio, combined });
  }

  encodeRTCStatsUnit(data: any) {
    return new HMSRTCStats({
      bitrateReceived: data?.bitrateReceived,
      bitrateSent: data?.bitrateSent,
      bytesReceived: data?.bytesReceived,
      bytesSent: data?.bytesSent,
      packetsLost: data?.packetsLost,
      packetsReceived: data?.packetsReceived,
      roundTripTime: data?.roundTripTime,
    });
  }

  encodeHmsSpeakers(data: any, id: string) {
    let encodedSpeakers: Array<HMSSpeaker> = [];

    data?.map((item: any) => {
      encodedSpeakers.push(this.encodeHmsSpeaker(item, id));
    });

    return encodedSpeakers;
  }

  encodeHmsSpeaker(data: any, id: string) {
    return new HMSSpeaker({
      level: data?.level,
      peer: this.encodeHmsPeer(data?.peer, id),
      track: this.encodeHmsTrack(data?.track, id),
    });
  }

  encodeBrowserRecordingState(data: any) {
    return new HMSBrowserRecordingState({
      running: data?.running || false,
      startedAt: this.encodeDate(data?.startedAt),
      stoppedAt: this.encodeDate(data?.stoppedAt),
      error: data?.error || undefined,
    });
  }

  encodeServerRecordingState(data: any) {
    return new HMSServerRecordingState({
      running: data?.running || false,
      error: data?.error || undefined,
      startedAt: this.encodeDate(data?.startedAt),
    });
  }

  encodeRTMPStreamingState(data: any) {
    return new HMSRtmpStreamingState({
      running: data?.running || false,
      startedAt: this.encodeDate(data?.startedAt),
      stoppedAt: this.encodeDate(data?.stoppedAt),
      error: data?.error || undefined,
    });
  }

  encodeDate(dateData: any) {
    if (!dateData) {
      return undefined;
    }
    const dateNum = parseInt(dateData);
    if (isNaN(dateNum)) {
      return undefined;
    }
    return new Date(dateNum);
  }

  encodeHLSStreamingState(data: any) {
    return new HMSHLSStreamingState({
      running: data?.running || false,
      variants: Array.isArray(data?.variants)
        ? this.encodeHLSVariants(data?.variants)
        : undefined,
    });
  }

  encodeHLSRecordingState(data: any) {
    if (data) {
      return new HMSHLSRecordingState({
        running: data?.running || false,
        startedAt: this.encodeDate(data?.startedAt),
        singleFilePerLayer: data?.singleFilePerLayer || false,
        videoOnDemand: data?.videoOnDemand || false,
      });
    } else {
      return undefined;
    }
  }

  encodeHLSVariants(data: any) {
    let variants: HMSHLSVariant[] = [];

    data?.map((item: any) => {
      let variant = new HMSHLSVariant({
        hlsStreamUrl: item.hlsStreamUrl,
        meetingUrl: item.meetingUrl,
        metadata: item?.metaData ? item?.metadata : undefined,
        startedAt: this.encodeDate(item?.startedAt),
      });
      variants.push(variant);
    });

    return variants;
  }

  encodeHMSNetworkQuality(data: any) {
    if (data) {
      return new HMSNetworkQuality({
        downlinkQuality: data?.downlinkQuality,
      });
    } else {
      return undefined;
    }
  }

  encodeHMSMessage(data: any, id: string) {
    if (data) {
      return new HMSMessage({
        message: data?.message,
        type: data?.type,
        time: new Date(parseInt(data?.time)),
        sender: this.encodeHmsPeer(data?.sender, id),
        recipient: this.encodeHMSMessageRecipient(data?.recipient, id),
      });
    } else {
      return undefined;
    }
  }

  encodeHMSMessageRecipient(data: any, id: string) {
    return new HMSMessageRecipient({
      recipientType: data?.recipientType,
      recipientPeer: data?.recipientPeer
        ? this.encodeHmsPeer(data.recipientPeer, id)
        : undefined,
      recipientRoles: Array.isArray(data?.recipientRoles)
        ? this.encodeHmsRoles(data.recipientRoles)
        : [],
    });
  }

  encodeHMSException(data: any) {
    return new HMSException({
      code: data?.error?.code,
      description: data?.error?.description,
      message: data?.error?.message,
      name: data?.error?.name,
      action: data?.error?.action,
      isTerminal: data?.error?.isTerminal,
      canRetry: data?.error?.canRetry,
    });
  }
}
