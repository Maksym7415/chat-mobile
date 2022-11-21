import {StyleSheet} from 'react-native';

export default theme => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.colors.main,
      paddingTop: 17,
      paddingBottom: 16,
      paddingHorizontal: 16,
      elevation: 0,
    },
    top: {
      flexDirection: 'row',
    },
  });
};
