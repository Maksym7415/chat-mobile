import {StyleSheet} from 'react-native';
import {theme} from '../../../config/theme';

export default StyleSheet.create({});

export const stylesMessageInput = StyleSheet.create({
  wrapperInput: {
    flex: 1,
    height: 40,
    width: '100%',
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#ffffff',
    borderColor: theme.color_border_main,
    borderBottomWidth: 1,
  },
  wrapperInputShadow: {
    shadowColor: '#d1d1d1',
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 14,
  },
});
