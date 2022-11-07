import {StyleSheet} from 'react-native';

export default theme =>
  StyleSheet.create({
    wrapper: {
      paddingHorizontal: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: 40,
      backgroundColor: '#ffffff',
    },
    wrapperAction: {
      flexDirection: 'row-reverse',
      alignItems: 'center',
    },
    title: {
      paddingLeft: 5,
    },
  });
