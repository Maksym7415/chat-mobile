import {StyleSheet} from 'react-native';

export default theme =>
  StyleSheet.create({
    copyWrapper: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
    },
    copyText: {
      marginHorizontal: 0,
      marginVertical: 0,
      color: '#ffffff',
    },
  });
