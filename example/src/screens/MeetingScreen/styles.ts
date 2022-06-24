import {StyleSheet} from 'react-native';

import {COLORS, FONTS} from '../../utils/theme';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  videoIcon: {
    color: COLORS.PRIMARY.DEFAULT,
  },
  labelContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    flexDirection: 'row',
    padding: 10,
  },
  raiseHand: {
    color: COLORS.INDICATORS.WARNING,
  },
  degraded: {
    color: COLORS.INDICATORS.ERROR,
  },
  fullScreenTile: {
    width: '100%',
    marginVertical: 1,
    padding: 0.5,
    overflow: 'hidden',
    borderRadius: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    height: '100%',
  },
  generalTile: {
    height: '100%',
    width: '100%',
    marginVertical: 1,
    padding: '0.25%',
    overflow: 'hidden',
    borderRadius: 20,
  },
  hmsView: {
    height: '100%',
    width: '100%',
  },
  hmsViewScreen: {
    width: '100%',
    height: '100%',
  },
  iconContainers: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 4,
    paddingTop: 4,
    width: '100%',
    backgroundColor: COLORS.OVERLAY,
    borderRadius: 20,
    height: 60,
  },
  leaveIconContainer: {
    backgroundColor: COLORS.INDICATORS.ERROR,
    padding: 10,
    borderRadius: 60,
  },
  singleIconContainer: {
    padding: 10,
  },
  leaveIcon: {
    color: COLORS.WHITE,
  },
  wrapper: {
    flex: 1,
    overflow: 'hidden',
  },
  displayContainer: {
    position: 'absolute',
    top: 4,
    alignSelf: 'center',
    padding: 8,
    borderRadius: 8,
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 3,
  },
  peerName: {
    color: COLORS.PRIMARY.DEFAULT,
    fontFamily: 'Inter-Bold',
  },
  peerNameContainer: {
    maxWidth: 70,
  },
  micContainer: {
    flexDirection: 'row',
  },
  mic: {
    color: COLORS.PRIMARY.DEFAULT,
    paddingHorizontal: 3,
  },
  avatarContainer: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
    alignItems: 'center',
    justifyContent: 'center',
  },
  degradedContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: COLORS.BLACK,
    zIndex: 2,
  },
  avatar: {
    aspectRatio: 1,
    width: '50%',
    maxWidth: 100,
    maxHeight: 100,
    borderRadius: 500,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.PRIMARY.DEFAULT,
  },
  avatarText: {
    color: COLORS.WHITE,
    ...FONTS.H4,
  },
  degradedText: {
    color: COLORS.WHITE,
    ...FONTS.H6,
  },
  highlight: {
    borderRadius: 10,
    borderWidth: 5,
    borderColor: COLORS.PRIMARY.DEFAULT,
  },
  messageDot: {
    width: 10,
    height: 10,
    borderRadius: 20,
    position: 'absolute',
    zIndex: 100,
    backgroundColor: COLORS.PRIMARY.DEFAULT,
    right: 8,
    top: 10,
  },
  options: {
    color: COLORS.PRIMARY.DEFAULT,
  },
  optionsContainer: {
    padding: 10,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  roleChangeText: {
    padding: 12,
    fontFamily: 'Inter-Regular',
  },
  headerName: {
    color: COLORS.PRIMARY.DEFAULT,
    fontFamily: 'Inter-Bold',
  },
  headerIcon: {
    padding: 10,
  },
  headerContainer: {
    height: 50,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  page: {
    flexDirection: 'row',
    width: 414,
    flexWrap: 'wrap',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recording: {
    color: COLORS.INDICATORS.ERROR,
    padding: 10,
  },
  streaming: {
    color: COLORS.INDICATORS.ERROR,
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLORS.BLACK,
    paddingLeft: 10,
    minHeight: 32,
    color: COLORS.PRIMARY.DEFAULT,
    margin: 10,
  },
  recordingDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  checkboxContainer: {
    height: 25,
    width: 25,
    borderColor: COLORS.BLACK,
    borderWidth: 2,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkbox: {
    color: COLORS.BLACK,
  },
  closeButton: {
    zIndex: 2,
    position: 'absolute',
    left: 2,
    top: 0,
    height: 50,
    width: 50,
  },
  flex: {
    flex: 1,
  },
  renderVideo: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  brbContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY.DEFAULT,
  },
  brb: {
    color: COLORS.PRIMARY.DEFAULT,
    fontFamily: 'Inter-Bold',
  },
  brbOnContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY.DEFAULT,
    backgroundColor: COLORS.PRIMARY.DEFAULT,
  },
  brbOn: {
    color: COLORS.WHITE,
    fontFamily: 'Inter-Bold',
  },
  statsContainer: {
    position: 'absolute',
    zIndex: 1,
    backgroundColor: COLORS.OVERLAY,
    padding: 5,
    borderRadius: 10,
    margin: 1,
  },
  statsText: {
    color: COLORS.WHITE,
    fontFamily: 'Inter-Bold',
    fontSize: 16,
  },
  heroContainer: {
    width: '100%',
    height: '100%',
  },
  heroContainerLandscaspe: {
    flexDirection: 'row',
  },
  heroView: {
    height: '100%',
    width: '100%',
    marginVertical: 1,
    padding: '0.25%',
    overflow: 'hidden',
    borderRadius: 10,
  },
  heroTileContainer: {
    height: '70%',
    width: '100%',
    marginVertical: 1,
    padding: '0.25%',
    overflow: 'hidden',
    borderRadius: 10,
  },
  heroTileContainerLandscaspe: {
    height: '100%',
    width: '80%',
  },
  heroTileContainerSingle: {
    height: '100%',
    width: '100%',
    marginVertical: 1,
    padding: '0.25%',
    overflow: 'hidden',
    borderRadius: 10,
  },
  heroListContainer: {
    width: '100%',
    height: '30%',
  },
  heroListContainerLandscaspe: {
    width: '20%',
    height: '100%',
  },
  heroListView: {
    width: 150,
    height: '100%',
  },
  heroListViewLandscaspe: {
    height: 250,
    width: '100%',
  },
  mainTileContainer: {
    height: '100%',
    width: '100%',
    zIndex: 2,
  },
  miniTileContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: '40%',
    height: '40%',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: COLORS.WHITE,
    zIndex: 3,
  },
  miniTileContainerLandscape: {
    width: '20%',
    height: '80%',
  },
  heroListViewContainer: {
    marginHorizontal: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  heroListViewContainerLandscaspe: {
    marginVertical: 1,
  },
  network: {
    height: 30,
    width: 30,
    marginRight: 3,
  },
  interRegular: {
    fontFamily: 'Inter-Regular',
  },
  status: {
    alignSelf: 'center',
    position: 'absolute',
    top: '70%',
  },
  resolutionContainer: {
    padding: 16,
  },
  resolutionDetails: {
    flexDirection: 'row',
  },
  resolutionValue: {
    fontFamily: 'Inter-Regular',
    paddingLeft: 16,
  },
});

export {styles};
