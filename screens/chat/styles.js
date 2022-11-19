import {StyleSheet} from 'react-native';
export default (theme, data) => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    wrapperSendData: {
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 15,
    },
    sendDataText: {
      maxWidth: 125,
      display: 'flex',
      width: '100%',
      textAlign: 'center',
      paddingVertical: 7,
      paddingHorizontal: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      color: '#fffefeb5',
      borderRadius: 10,
      overflow: 'hidden',
    },
    imageBackground: {
      flex: 1,
    },
    wrapperLoader: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    wrapperInfoCenter: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    infoCenterText: {
      fontSize: 20,
      paddingHorizontal: '15%',
      textAlign: 'center',
      fontWeight: '600',
    },
  });
};
