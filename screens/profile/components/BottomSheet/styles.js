import {StyleSheet} from 'react-native';

export default theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 10,
    },
    title: {
      fontSize: 24,
      marginTop: 10,
    },
    wrapper: {
      backgroundColor: '#517DA2',
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
