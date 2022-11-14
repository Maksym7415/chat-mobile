import {StyleSheet} from 'react-native';

export default theme =>
  StyleSheet.create({
    boxCenter: {
      alignItems: 'center',
      justifyContent: 'center',
      // flex: 1,
      height: '100%',
    },
    noResults: {
      fontSize: 20,
      fontWeight: '600',
    },
  });
