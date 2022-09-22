import {StyleSheet} from 'react-native';

import {theme} from '../../config/theme';
import {errorText} from '../../config/globalStyles';

export default StyleSheet.create({
  container: {
    width: '100%',
  },
  textViewError: {
    borderWidth: 1,
    borderColor: theme.color_danger_900,
    borderRadius: 4,
    marginTop: 8,
  },
  label: {
    color: theme.text_basic_color,
    paddingBottom: 6,
    fontSize: theme.text_primary_size,
    fontWeight: theme.font_medium,
  },
  errorLabel: {
    ...errorText,
    textAlign: 'center',
    paddingTop: 2,
  },
  inputStyle: {
    fontSize: theme.input_font_size,
    color: theme.text_basic_color,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: theme.color_basic_border,
    height: 48,
  },
  errorInputStyle: {
    fontSize: theme.input_font_size,
    color: theme.text_basic_color,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: theme.color_danger_900,
    height: 48,
  },
});
