/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {View, Pressable, Alert} from 'react-native';
import {stylesMessageInput as styles} from '../styles';
import SvgMaker from '../../../../../../../components/svgMaker';

export default function RightInputComponent({
  message,
  handleSendMessage,
  refBottomSheet,
  forwardMessages,
}) {
  // STATES
  const [toggleTypeMessage, setToggleTypeMessage] = React.useState('voice');

  // FUNCTIONS
  const stylesRightIcons = () => {
    return message || forwardMessages.length
      ? {
          justifyContent: 'flex-end',
          width: 40,
        }
      : {
          justifyContent: 'space-between',
          width: 80,
        };
  };

  return (
    <>
      <View
        style={{
          ...styles.attachAndTypeMessage,
          ...stylesRightIcons(),
        }}>
        {message || forwardMessages.length ? (
          <Pressable onPress={handleSendMessage}>
            <SvgMaker name="svgs_filled_send" strokeFill={'#5EA7DE'} />
          </Pressable>
        ) : (
          <>
            <Pressable
              onPress={() => {
                console.log(refBottomSheet, 'refBottomSheet');
                refBottomSheet.current?.snapToIndex(0);
              }}>
              <SvgMaker name="svgs_line_attach" />
            </Pressable>
            <Pressable
              onPress={() => {
                setToggleTypeMessage(prev =>
                  prev === 'voice' ? 'video' : 'voice',
                );
                Alert.alert('Цього функціоналу наразі немає');
              }}>
              {toggleTypeMessage === 'voice' ? (
                <SvgMaker name="svgs_line_voice" />
              ) : (
                <SvgMaker name="svgs_line_video_message" />
              )}
            </Pressable>
          </>
        )}
      </View>
    </>
  );
}
