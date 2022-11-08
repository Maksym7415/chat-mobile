import {StyleSheet} from 'react-native';

export default theme =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    wrapperTabs: {
      flexDirection: 'row',
      backgroundColor: '#ffffff',
      borderBottomWidth: 1,
      borderBottomColor: '#D9D9D9',
    },
    wrapper: {
      backgroundColor: '#ffffff',
    },
    tab: {
      paddingHorizontal: 18,
      paddingTop: 8,
      paddingBottom: 14,
      alignItems: 'center',
    },
    tabTitle: {
      fontWeight: '500',
      fontSize: 15,
    },
    wrapperTabIcon: {
      borderRadius: 25,
      width: 44,
      height: 44,
      alignItems: 'center',
      justifyContent: 'center',
      // paddingHorizontal: 10,
      // paddingVertical: 10,
      marginBottom: 5,
    },
    innerTabIcon: {
      paddingHorizontal: 4,
      paddingVertical: 4,
      borderColor: '#ffffff',
      borderWidth: 2,
    },
  });
