import {StyleSheet} from 'react-native';

export default theme =>
  StyleSheet.create({
    root: {
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: '#ffffff',
      width: '100%',
      paddingHorizontal: 13,
      paddingVertical: 7,
    },
    wrapperMainContent: {
      paddingLeft: 15,
      flex: 1,
    },
  });
