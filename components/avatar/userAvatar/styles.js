import {StyleSheet, Dimensions} from 'react-native';

export default theme =>
  StyleSheet.create({
    container: {
      position: 'relative',
    },
    badge: {
      position: 'absolute',
      bottom: 0,
      rigth: 0,
      borderWidth: 3,
      borderColor: theme.colors.white1,
      backgroundColor: theme.colors.green_bright1,
    },
  });
