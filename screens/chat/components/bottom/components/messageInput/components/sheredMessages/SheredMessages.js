/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {useSelector} from 'react-redux';
import {useTheme, IconButton} from 'react-native-paper';
import makeStyles from './styles';
import languages from '../../../../../../../../config/translations';
import SvgMaker from '../../../../../../../../components/svgMaker';

export default function SheredMessages({
  forwardMessages,
  handleClearSheraMessages,
}) {
  //HOOKS
  const theme = useTheme();

  // STYLES
  const styles = makeStyles(theme);

  // SELECTORS
  const lang = useSelector(({settingSlice}) => settingSlice.lang);

  return (
    <View style={styles.root}>
      <View style={styles.wrapperLeft}>
        <SvgMaker name="svgs_filled_send_arrow" strokeFill={'#517DA2'} />
      </View>
      <View style={styles.wrapperCenter}>
        <Text style={styles.title}>
          {forwardMessages.length
            ? `Forward ${forwardMessages.length} ${
                forwardMessages.length > 1 ? 'messages' : 'message'
              }`
            : languages[lang].generals.shareMessage}
        </Text>
        <Text style="conversations__edit-message-paragraph">
          {(() => {
            if (forwardMessages.length < 2) {
              return forwardMessages[0].message;
            }

            let usersSheredMessages = forwardMessages?.reduce((acc, item) => {
              if (acc.includes(item.User.firstName)) return acc;
              return [...acc, item.User.firstName];
            }, []);

            console.log(usersSheredMessages, 'usersSheredMessages');
            if (forwardMessages.length > 2) {
              return `from ${usersSheredMessages[0]} and ${
                usersSheredMessages.length - 1
              } more`;
            } else {
              return `from ${usersSheredMessages[0]}${
                usersSheredMessages?.[1] ? `, ${usersSheredMessages?.[1]}` : ''
              }`;
            }
          })()}
        </Text>
      </View>
      <Pressable style={styles.wrapperRight}>
        <IconButton
          icon="close"
          size={20}
          onPress={handleClearSheraMessages}
          style={{marginHorizontal: 0}}
        />
      </Pressable>
    </View>
  );
}
