import {
  StyleSheet,
  Platform,
} from 'react-native'

export default StyleSheet.create({
  layoutWrap: {
    flex: 1,
  },

  toolbarWrapper: {
    paddingTop: Platform.Version < 21 ? 0 : 10,
    marginLeft: -10,
  },

  toolbar: {
    height: 55,
  },

  layout: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },

  layoutInner: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#f5f5f5',
  },

  layoutInnerSmallHeader: {
    paddingTop: Platform.OS === 'ios' ? 98 : 120,
  },

  layoutNotPages: {
    paddingTop: 60,
  },

  layoutInnerContent: {
    paddingTop: 165,
  },

  headerImage: {
    width: null,
    height: null,
  },

  header: {
    padding: 5,
    height: Platform.OS === 'ios' ? 120 : 100,
  },

  headerSmallHeader: {
    height: Platform.OS === 'ios' ? 50 : 70,
  },

  headerSmallNotPages: {
    height: 60,
  },

  tabs: {
    flexDirection: 'row',
  },

  tab: {
    flex: 1,
    paddingVertical: 15,
  },

  tabSelected: {
  },

  tabLabelIOS: {
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    letterSpacing: 1.3,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowRadius: 1,
    textShadowOffset: { width: 1, height: 1 },
    overflow: 'visible',
  },

  tabLabelAndroid: {
    fontSize: 13,
    fontFamily: 'sans-serif-light',
    fontWeight: '500',
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  },

  separator: {
    position: 'absolute',
    top: 7,
    width: 1,
    height: 30,
    borderRightWidth: 1,
    borderRightColor: 'rgba(0,0,0,0.15)',
  },

  underline: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    height: 3,
    backgroundColor: '#7af53e',
  },

  tabLabelSelected: {
    color: '#fff',
  },

  titleSmallIOS: {
    position: 'absolute',
    top: 28,
    left: 0,
    right: 0,
    letterSpacing: 1.3,
    color: 'rgba(255,255,255,1)',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowRadius: 1,
    textShadowOffset: { width: 1, height: 1 },
  },

  titleSmallAndroid: {
    position: 'absolute',
    paddingTop: 20,
    top: 0,
    left: 0,
    right: 0,
    color: 'rgba(255,255,255,1)',
    fontSize: 15,
    lineHeight: 25,
    textAlign: 'center',
    fontFamily: 'sans-serif-light',
    fontWeight: '500',
  },

  titleNotPages: {
    top: Platform.OS === 'ios' ? 33 : 23,
  },

  titleSmallShow: {
    opacity: 1,
  },

  titleIOS: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    letterSpacing: 1.3,
    color: 'rgba(255,255,255,.85)',
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    opacity: 1,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowRadius: 1,
    textShadowOffset: { width: 1, height: 1 },
  },

  titleAndroid: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    color: 'rgba(255,255,255,.85)',
    fontSize: 22,
    fontWeight: '400',
    textAlign: 'center',
    opacity: 1,
  },

  navigationBarWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },

  closeWrap: {
    position: 'absolute',
    right: 0,
    top: Platform.OS === 'ios' ? 15 : 20,
    padding: 5,
    width: 40,
    height: 40,
    alignItems: 'center',
  },

  closeWrapNotPages: {
    top: Platform.OS === 'ios' ? 20 : 12,
  },

  close: {
    backgroundColor: 'transparent',
  },

  menu: {
    position: 'absolute',
    top: 20,
    left: 0,
    width: 60,
    height: 36,

    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  menuIconWrap: {
    width: 40,
    height: 40,
  },

  menuIcon: {
    paddingTop: 8,
    textAlign: 'center',
  },

  menuIconSmall: {
    paddingTop: 6,
  },
})
