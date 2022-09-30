import {StyleSheet} from 'react-native';
import {theme} from '../../config/theme';

export default theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      // width: '100%',
      backgroundColor: theme.colors.white1,
    },
  });
