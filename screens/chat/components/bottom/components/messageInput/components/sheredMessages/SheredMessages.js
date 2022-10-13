/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {View} from 'react-native';
import {useTheme} from 'react-native-paper';
import makeStyles from './styles';
import SvgMaker from '../../../../../../../../components/svgMaker';

export default function SheredMessages({}) {
  //HOOKS
  const theme = useTheme();

  // STYLES
  const styles = makeStyles(theme);

  return (
    <View style="conversations__send-message-text conversations__send-message-shadow">
      {/* <ShareIcon color="primary" style="mr-10" />
      <View style="flex-col conversations__send-message-text-title-wrapper">
        <Typography color="primary">
          {languages[lang].generals.shareMessage}
        </Typography>
        <p style="conversations__edit-message-paragraph">
          {sheredMessages[0].message}
        </p>
      </View>
      <View style="ml-auto pd-right-30">
        <IconButton
          style={{width: '20px', height: '20px'}}
          onClick={handleClearSheraMessages}>
          <CloseIcon style={{width: '20px', height: '20px'}} />
        </IconButton>
      </View> */}
    </View>
  );
}
