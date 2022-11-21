import {StyleSheet, Platform, Dimensions} from 'react-native';

const {width: screenWidth} = Dimensions.get('window');

export default theme =>
  StyleSheet.create({
    container: {
      position: 'relative',
      zIndex: 2,
    },
    wrapper: {
      flexDirection: 'column',
      paddingHorizontal: 0,
      paddingBottom: 0,
    },
    containerTop: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingBottom: 10,
      backgroundColor: theme.colors.main,
    },
    wrapperTopCenterComponent: {
      flex: 1,
    },
    wrapperAction: {
      marginLeft: 15,
    },
    wrapperOptions: {},
    imageBackground: {
      zIndex: 101,
      height: '100%',
    },
    content: {
      position: 'relative',
    },
    wrapperAvatarAndInfo: {
      marginTop: 22,
      display: 'flex',
      flexDirection: 'row',
      alignSelf: 'flex-start',
      alignItems: 'center',
    },
    avatar: {},
    info: {
      marginLeft: 20,
    },
    userName: {
      fontWeight: '500',
      fontSize: 20,
      color: '#FFFFFF',
    },
    status: {
      fontWeight: '400',
      fontSize: 16,
      color: '#FFFFFF',
    },
    wrapperSetPhoto: {
      backgroundColor: '#FFFFFF',
      height: 60,
      width: 60,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      bottom: -30,
      right: 20,
      shadowOffset: {width: 0, height: 1.07547},
      shadowColor: '#171717',
      shadowOpacity: 0.1,
      shadowRadius: 3.22641,
    },
    imageContainer: {
      ...StyleSheet.absoluteFillObject,
      padding: 10,
      justifyContent: 'flex-end',
      resizeMode: 'contain',
    },
    paginationContainerStyle: {
      paddingVertical: 0,
      paddingHorizontal: 0,
      position: 'absolute',
      top: 20,
      alignSelf: 'center',
    },
    dotsOption: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 7,
    },
    wrapperIconOption: {
      marginRight: 10,
    },
  });
