/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {Pressable, Alert} from 'react-native';
import {stylesMessageInput as styles} from '../styles';
import SvgMaker from '../../../../../../../components/svgMaker';

export default function LeftInputComponent({}) {
  return (
    <>
      <Pressable
        style={styles.emojies}
        onPress={() => Alert.alert('Цього функціоналу наразі немає')}>
        <SvgMaker name="svgs_line_emoji" />
      </Pressable>
    </>
  );
}
