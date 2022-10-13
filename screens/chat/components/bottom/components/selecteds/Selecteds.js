import React from 'react';
import {View, Text} from 'react-native';
import {useTheme} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import makeStyles from './styles';
import {bottomActionsSelecteds} from '../../../../config';
import SvgMaker from '../../../../../../components/svgMaker';

function Selecteds() {
  // HOOKS
  const dispatch = useDispatch();
  const theme = useTheme();

  // STYLES
  const styles = makeStyles(theme);

  // SELECTORS
  const {selectedMessages} = useSelector(({appSlice}) => appSlice);
  const lang = useSelector(({settingSlice}) => settingSlice.lang);

  // Functions
  const handleOptions = value => {
    console.log(value, 'value');
  };

  return (
    <View style={styles.wrapper}>
      {bottomActionsSelecteds(lang).map(action => {
        return (
          <View
            key={action.id}
            style={styles.wrapperAction}
            onStartShouldSetResponder={() => handleOptions(action.value)}>
            <SvgMaker name={action.icon.name} />
          </View>
        );
      })}
    </View>
  );
}

export default Selecteds;
