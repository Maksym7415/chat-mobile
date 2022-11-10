import {StyleSheet} from 'react-native';

export default theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      // backgroundColor: 'red',
    },
    btn: {
      height: 30,
      alignItems: 'center',
      justifyContent: 'center',
    },
    divider: {
      flexDirection: 'row',
      backgroundColor: '#686868',
    },
  });
