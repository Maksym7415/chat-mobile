import {StyleSheet} from 'react-native';
import {theme} from '../../config/theme';

export default StyleSheet.create({
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
});
