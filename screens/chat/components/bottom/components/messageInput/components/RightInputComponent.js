/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {View, Pressable} from 'react-native';
import {stylesMessageInput as styles} from '../styles';
import SvgMaker from '../../../../../../../components/svgMaker';

export default function RightInputComponent({
  message,
  handleSendMessage,
  refBottomSheet,
}) {
  // STATES
  const [toggleTypeMessage, setToggleTypeMessage] = React.useState('voice');

  // FUNCTIONS
  const onPress = React.useCallback(() => {
    const isActive = refBottomSheet?.current?.isActive();
    if (isActive) {
      refBottomSheet?.current?.scrollTo(0);
    } else {
      refBottomSheet?.current?.scrollTo(-200);
    }
  }, []);

  const stylesRightIcons = () => {
    return message
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
        {message ? (
          <Pressable onPress={handleSendMessage}>
            <SvgMaker name="svgs_filled_send" strokeFill={'#5EA7DE'} />
          </Pressable>
        ) : (
          <>
            <Pressable onPress={onPress}>
              <SvgMaker name="svgs_line_attach" />
            </Pressable>
            <Pressable
              onPress={() =>
                setToggleTypeMessage(prev =>
                  prev === 'voice' ? 'video' : 'voice',
                )
              }>
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
