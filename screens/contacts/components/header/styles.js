import {StyleSheet} from 'react-native';

export default theme =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 8,
    },
    containerTop: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    wrapperTitle: {
      flex: 1,
      marginLeft: 25,
    },
    title: {
      fontWeight: '500',
      fontSize: 18,
      color: '#ffffff',
    },
    input: {
      width: '100%',
      backgroundColor: 'transparent',
    },
  });
