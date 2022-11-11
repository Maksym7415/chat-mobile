import {StyleSheet} from 'react-native';

export default theme =>
  StyleSheet.create({
    container: {
      // flexDirection: 'row',
      // alignItems: 'center',
      backgroundColor: '#ffffff',
    },
    wrapperContacts: {
      paddingHorizontal: 10,
    },
    wrapperContact: {
      marginTop: 10,
      flexDirection: 'row',
    },
    wrapperInfo: {
      paddingLeft: 20,
    },
    fullName: {
      fontSize: 16,
    },
    login: {
      marginTop: 3,
      fontSize: 12,
    },
    boxCenter: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },
    noResults: {
      fontSize: 20,
      fontWeight: '600',
    },
  });
