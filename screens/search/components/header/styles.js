import {StyleSheet} from 'react-native';

export default theme =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#ffffff',
    },
    containerTop: {
      alignItems: 'center',
    },
    wrpperSelectedAmount: {
      paddingLeft: 20,
      paddingRight: 20,
      flex: 1,
    },
    input: {
      width: '100%',
      backgroundColor: 'transparent',
    },
  });
