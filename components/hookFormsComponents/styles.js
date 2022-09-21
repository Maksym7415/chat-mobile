import {StyleSheet} from 'react-native';

import {theme} from '../../config/theme';

export default StyleSheet.create({
  container: {
    width: '100%',
  },
  textViewError: {
    borderWidth: 1,
    borderColor: theme['color-danger-900'],
    borderRadius: 4,
    marginTop: 8,
  },
  label: {
    color: theme['text-basic-color'],
    paddingBottom: 6,
    fontSize: theme['text-primary-size'],
    fontWeight: theme['font-medium'],
  },
  errorLabel: {
    color: theme['color-danger-900'],
    textAlign: 'left',
    paddingTop: 2,
    paddingBottom: 2,
    fontSize: theme['text-primary-size'],
  },
  inputStyle: {
    fontSize: theme['input-font-size'],
    color: theme['text-basic-color'],
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: theme['color-basic-focus-border'],
    height: 48,
  },
  errorInputStyle: {
    fontSize: theme['input-font-size'],
    color: theme['text-basic-color'],
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: theme['color-danger-900'],
    height: 48,
  },
});
