/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, {useLayoutEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useTheme} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import makeStyles from './styles';
import MessageInput from './components/messageInput/MessageInput';
import Selecteds from './components/selecteds';

function Message({
  firstName,
  conversationId,
  allMessages,
  userId,
  openFileDialog,
  setAllMessages,
  opponentId,
}) {
  // HOOKS
  const dispatch = useDispatch();
  const theme = useTheme();

  // STYLES
  const styles = makeStyles(theme);

  // SELECTORS
  const lang = useSelector(({settingSlice}) => settingSlice.lang);

  const {selectedMessages} = useSelector(({appSlice}) => appSlice);

  const renderBottom = () => {
    if (Object.keys(selectedMessages).length) {
      return <Selecteds />;
    } else {
      if (!!conversationId || !!opponentId) {
        return (
          <MessageInput
            allMessages={allMessages}
            setAllMessages={setAllMessages}
            conversationId={conversationId}
            userId={userId}
            firstName={firstName}
            opponentId={opponentId}
            openFileDialog={openFileDialog}
          />
        );
      }
    }
  };

  return <>{renderBottom()}</>;
}

export default Message;
