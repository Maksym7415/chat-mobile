/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, Text} from 'react-native';
import {useTheme} from 'react-native-paper';
import makeStyles from './styles';
import SvgMaker from '../../../../../../../../components/svgMaker';
import languages from '../../../../../../../../config/translations';

export default function MessageEdit({data, onClose}) {
  //HOOKS
  const theme = useTheme();

  // SELECTORS
  const lang = useSelector(({settingSlice}) => settingSlice.lang);

  // STYLES
  const styles = makeStyles(theme);

  return (
    <View style={styles.root}>
      <View style={styles.wrapperIconEdit}>
        <SvgMaker name={'svgs_filled_pencil'} />
      </View>
      <View style={styles.wrapperMainContent}>
        <Text>{languages[lang].generals.editMessage}</Text>
        <Text style="conversations__edit-message-paragraph">
          {data.message.message}
        </Text>
      </View>
      <View style={styles.close} onStartShouldSetResponder={onClose}>
        <SvgMaker name={'svgs_filled_cross'} />
      </View>
    </View>
  );
}
