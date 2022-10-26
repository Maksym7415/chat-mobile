import {StyleSheet} from 'react-native';

export default theme =>
  StyleSheet.create({
    wrapperItemAccount: {
      paddingTop: 11,
      paddingBottom: 12,
      pointerEvent: 'none',
    },
    title: {
      fontWeight: '400',
      fontSize: 15,
      color: '#202020',
    },
    subTitle: {
      marginTop: 6,
      fontWeight: '400',
      fontSize: 12,
      color: '#83868B',
    },
  });
