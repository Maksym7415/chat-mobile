import {StyleSheet} from 'react-native';

export default theme =>
  StyleSheet.create({
    button: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      alignItems: 'center',
      justifyContent: 'center',
      width: 40,
      position: 'absolute',
      bottom: 10,
      right: 10,
      height: 40,
      backgroundColor: '#ffffff',
      borderRadius: 100,
    },
  });
