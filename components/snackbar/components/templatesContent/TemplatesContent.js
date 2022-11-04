import * as React from 'react';
import {useTheme} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {Text, View} from 'react-native';
import {getSnackBar, initialState} from './slice';
import SvgMaker from '../../../svgMaker';
import makeStyles from './styles';

const TemplatesContent = ({type}) => {
  // HOOKS
  const theme = useTheme();

  // STYLES
  const styles = makeStyles(theme);

  return (() => {
    switch (type) {
      case 'copy':
        return (
          <View style={styles.copyWrapper}>
            <SvgMaker name={'svgs_line_copy'} />
            <Text style={styles.copyText}>Copy successfully</Text>
          </View>
        );
      default:
        break;
    }
  })();
};

export default TemplatesContent;
