/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {View} from 'react-native';
import {stylesMessageInput as styles} from '../styles';
import SvgMaker from '../../../../../components/svgMaker';

export default function LeftInputComponent({}) {
  // FUNCTIONS

  return (
    <>
      <View style={styles.emojies}>
        <SvgMaker name="svgs_line_emoji" />
      </View>
    </>
  );
}
