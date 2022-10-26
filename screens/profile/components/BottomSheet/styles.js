import {StyleSheet, Platform, Dimensions} from 'react-native';

const {width: screenWidth} = Dimensions.get('window');

export default theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      // paddingHorizontal: 10,
      paddingTop: 10,
    },
    title: {
      fontSize: 24,
      marginTop: 10,
    },
    wrapper: {
      backgroundColor: '#517DA2',
      // height: 300,
      // flex: 1,
      marginTop: 10,
    },
    wrapperFile: {
      flex: 1 / 3,
      aspectRatio: 1,
      paddingHorizontal: 3,
      paddingVertical: 3,
    },
    image: {
      width: '100%',
      height: '100%',
    },
  });
