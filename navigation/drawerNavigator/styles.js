import {StyleSheet} from 'react-native';

export default theme => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    containerTop: {
      flex: 1,
      backgroundColor: theme.colors.main,
      paddingHorizontal: 15,
      paddingTop: 45,
      paddingBottom: 8,
    },
    wrapperAvatarAndTheme: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    wrapperNameNumberArrow: {
      marginTop: 19,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    topName: {
      fontWeight: '500',
      fontSize: 15,
      // color
      color: '#ffffff',
    },
    topNumber: {
      marginTop: 4,
      fontWeight: '400',
      fontSize: 12,
      // color
      color: '#ffffff',
    },
    wrapperMenuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 18,
      paddingTop: 9,
      paddingBottom: 10,
    },
    menuItemTitle: {
      marginLeft: 28,
      fontWeight: '500',
      fontSize: 15,
      // color
      color: '#444444',
    },
    wrapperMainMenuRouts: {marginTop: 9},
    wrapperAccountsItems: {
      flexDirection: 'row',
    },
  });
};
