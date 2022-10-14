import {StyleSheet} from 'react-native';

export default theme =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    wrapperList: {
      backgroundColor: '#ffffff',
      marginTop: 12,
      paddingTop: 19,
      paddingLeft: 21,
    },
    listTitle: {
      fontWeight: '500',
      fontSize: 15,
      color: '#4094D0',
    },
    list: {
      marginTop: 9,
    },
    wrapperListItem: {
      flexDirection: 'row',
      paddingTop: 11,
      paddingBottom: 12,
      alignSelf: 'flex-start',
    },
    listItemTitle: {
      marginLeft: 22,
      fontWeight: '400',
      fontSize: 15,
      color: '#202020',
    },
    divider: {
      flexDirection: 'row',
      backgroundColor: theme.colors.gray_10,
    },
    wrapperItemAccount: {paddingTop: 11, paddingBottom: 12},
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
    wrapperSetPhoto: {
      backgroundColor: '#ffffff',
      paddingLeft: 21,
      paddingTop: 11,
      paddingBottom: 12,
      flexDirection: 'row',
      alignItems: 'center',
    },
    setPhotoTitle: {
      marginLeft: 15,
      fontWeight: '400',
      fontSize: 14,
      color: '#4094D0',
    },
    bottomText: {
      textAlign: 'center',
      marginVertical: 14,
      fontWeight: '400',
      fontSize: 12,
      color: '#9C9A9D',
    },
  });
