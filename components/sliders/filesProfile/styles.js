import {StyleSheet} from 'react-native';

export default theme => {
  return StyleSheet.create({
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
      height: 400,
      backgroundColor: '#ffffff',
      // display: 'flex',
      // justifyContent: 'center',
      // alignItems: 'center',
    },
    tab: {
      paddingHorizontal: 18,
      paddingTop: 8,
      paddingBottom: 14,
    },
    tabTitle: {
      fontWeight: '500',
      fontSize: 15,
    },
  });
};
