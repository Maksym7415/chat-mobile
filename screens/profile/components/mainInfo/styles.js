import {StyleSheet} from 'react-native';

export default theme =>
  StyleSheet.create({
    wrapperItemAccount: {
      // paddingTop: 11,
      // paddingBottom: 12,
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

    wrapperItem: {
      paddingTop: 11,
      paddingBottom: 12,
      pointerEvent: 'none',
      flexDirection: 'row',
    },
    wrapperNotification: {
      // backgroundColor: 'red',
      height: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-end',
      // flex: 1,
    },
    switchNotification: {},
    dividerNotification: {
      // flexDirection: 'row',
      backgroundColor: theme.colors.gray_10,
      width: 1,
      height: '100%',
      marginRight: 15,
      // flex: 1,
    },
    divider: {
      flexDirection: 'row',
      backgroundColor: theme.colors.gray_10,
    },
  });
