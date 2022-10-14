import {StyleSheet} from 'react-native';

export default theme =>
  StyleSheet.create({
    container: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    containerTop: {
      alignItems: 'center',
    },
    wrapperTopCenterComponent: {
      flex: 1,
    },
    wrapperAction: {
      marginLeft: 15,
    },
    content: {
      // backgroundColor: 'red',
      // height: 100,
      // width: '100%',
    },
  });
