import {StyleSheet} from 'react-native';

export default theme =>
  StyleSheet.create({
    wrapper: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
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
    hide: {
      opacity: 0,
    },
  });
