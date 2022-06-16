import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import HmsManager, {HMSVideoViewMode} from '@100mslive/react-native-hms';
import {useSelector} from 'react-redux';

import type {RootState} from '../redux';
import {COLORS, FONTS} from '../utils/theme';

export const PreviewModal = ({
  trackId,
  audio,
  video,
  join,
  instance,
  setPreviewButtonState,
  previewButtonState,
  videoAllowed,
  audioAllowed,
}: {
  videoAllowed: boolean;
  audioAllowed: boolean;
  trackId: string;
  video: boolean;
  audio: boolean;
  join: Function;
  instance?: HmsManager;
  setPreviewButtonState: Function;
  previewButtonState: string;
}) => {
  const {mirrorLocalVideo} = useSelector((state: RootState) => state.user);
  const [isMute, setIsMute] = useState(audio);
  const [muteVideo, setMuteVideo] = useState(video);
  const [numberOfLines, setNumberOfLines] = useState(true);
  const HmsView = instance?.HmsView;
  const [peers, setPeers] = useState(
    instance?.room?.peers ? instance?.room?.peers : [],
  );

  useEffect(() => {
    setPeers(instance?.room?.peers ? instance?.room?.peers : []);
  }, [instance?.room?.peers]);

  return HmsView ? (
    <View style={styles.container}>
      <View style={styles.modalContainer}>
        <HmsView
          scaleType={HMSVideoViewMode.ASPECT_FILL}
          style={styles.hmsView}
          trackId={trackId}
          mirror={mirrorLocalVideo}
        />
      </View>
      <View style={styles.peerList}>
        <TouchableWithoutFeedback
          onPress={() => {
            setNumberOfLines(!numberOfLines);
          }}>
          <Text
            style={styles.collapsibleText}
            numberOfLines={numberOfLines ? 1 : undefined}>
            {peers.map((peer, index) => {
              return (index !== 0 ? ', ' : '') + peer.name;
            })}
          </Text>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.buttonRow}>
        <View style={styles.iconContainer}>
          {audioAllowed && (
            <TouchableOpacity
              style={styles.singleIconContainer}
              onPress={async () => {
                setIsMute(!isMute);
                instance?.localPeer?.localAudioTrack()?.setMute(!isMute);
              }}>
              <Feather
                name={isMute ? 'mic-off' : 'mic'}
                style={styles.videoIcon}
                size={50}
              />
            </TouchableOpacity>
          )}
          {videoAllowed && (
            <TouchableOpacity
              style={styles.singleIconContainer}
              onPress={() => {
                setMuteVideo(!muteVideo);
                instance?.localPeer?.localVideoTrack()?.setMute(!muteVideo);
              }}>
              <Feather
                name={muteVideo ? 'video-off' : 'video'}
                style={styles.videoIcon}
                size={50}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.joinButtonContainer}>
          <TouchableOpacity
            disabled={previewButtonState !== 'Active'}
            style={[
              styles.buttonTextContainer,
              previewButtonState !== 'Active'
                ? styles.lowOpacity
                : styles.highOpacity,
            ]}
            onPress={() => {
              join();
              setPreviewButtonState('Loading');
            }}>
            {previewButtonState === 'Loading' ? (
              <ActivityIndicator color={COLORS.WHITE} />
            ) : (
              <Text style={styles.joinButtonText}>Join</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  ) : (
    <></>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.OVERLAY,
    justifyContent: 'center',
  },
  modalContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.WHITE,
  },
  hmsView: {
    height: '100%',
    width: '100%',
  },
  buttonTextContainer: {
    backgroundColor: COLORS.PRIMARY.DEFAULT,
    padding: 10,
    borderRadius: 5,
    width: '48%',
  },
  videoIcon: {
    color: COLORS.PRIMARY.DEFAULT,
  },
  joinButtonText: {
    textAlign: 'center',
    color: COLORS.WHITE,
    ...FONTS.H6,
    paddingHorizontal: 8,
  },
  buttonRow: {
    position: 'absolute',
    bottom: '10%',
    width: '100%',
    zIndex: 99,
  },
  peerList: {
    position: 'absolute',
    top: '15%',
    width: '70%',
    zIndex: 99,
    alignSelf: 'center',
    backgroundColor: COLORS.OVERLAY,
    borderRadius: 20,
  },
  iconContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  singleIconContainer: {
    marginHorizontal: 18,
  },
  joinButtonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  collapsibleText: {
    paddingVertical: 8,
    color: COLORS.WHITE,
    ...FONTS.H6,
    paddingHorizontal: 16,
  },
  lowOpacity: {
    opacity: 0.5,
  },
  highOpacity: {
    opacity: 1,
  },
});
