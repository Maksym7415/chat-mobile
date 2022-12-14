import {StyleSheet} from 'react-native';
import {theme} from '../../config/theme';
import {errorText} from '../../config/globalStyles';

export default StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapperForm: {
    marginTop: 16,
    maxWidth: 300,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    width: '100%',
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    marginTop: 16,
    width: '100%',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorText: {
    ...errorText,
    marginTop: 10,
    fontSize: theme.font_size_medium,
  },
});
