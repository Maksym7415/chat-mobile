import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {useTheme} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import makeStyles from './styles';
import {bottomActionsSelecteds} from '../../../../config';
import SvgMaker from '../../../../../../components/svgMaker';
import {uuid} from '../../../../../../helpers';

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
          <Pressable
            key={uuid()}
            style={styles.wrapperAction}
            onPress={() => handleOptions(action.value)}>
            <SvgMaker name={action.icon.name} />
          </Pressable>
        );
      })}
    </View>
  );
}

export default Selecteds;
