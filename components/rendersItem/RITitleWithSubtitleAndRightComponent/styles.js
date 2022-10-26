import {StyleSheet} from 'react-native';

export default theme =>
  StyleSheet.create({
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

    wrapperItem: {
      paddingTop: 11,
      paddingBottom: 12,
      paddingHorizontal: 10,
      pointerEvent: 'none',
      flexDirection: 'row',
      alignItems: 'center',
    },
  });
