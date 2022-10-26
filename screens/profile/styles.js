import {StyleSheet} from 'react-native';

export default theme =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollView: {
      flex: 1,
    },
    wrapperSetPhoto: {
      backgroundColor: '#ffffff',
      paddingLeft: 21,
      paddingTop: 11,
      paddingBottom: 12,
      flexDirection: 'row',
      alignItems: 'center',
    },
    setPhotoTitle: {
      marginLeft: 15,
      fontWeight: '400',
      fontSize: 14,
      color: '#4094D0',
    },
    bottomText: {
      textAlign: 'center',
      marginVertical: 14,
      fontWeight: '400',
      fontSize: 12,
      color: '#9C9A9D',
    },
  });
