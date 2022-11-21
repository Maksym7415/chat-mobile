import {StyleSheet} from 'react-native';

export default theme =>
  StyleSheet.create({
    root: {
      backgroundColor: '#ffffff',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderBottomWidth: 1,
      borderBottomColor: '#d1d1d1',
    },
    wrapperLeft: {
      paddingRight: 10,
    },
    wrapperCenter: {
      flex: 1,
    },
    wrapperRight: {
      paddingLeft: 10,
    },
    title: {
      color: theme.colors.main,
      fontWeight: '500',
      fontSize: 16,
    },
  });
