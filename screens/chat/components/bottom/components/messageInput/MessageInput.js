/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useRoute} from '@react-navigation/native';
import {View, Text} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {TextInput} from 'react-native-paper';
import {Button, Paragraph, Dialog, Portal} from 'react-native-paper';
import {stylesMessageInput as styles} from './styles';
import {socket} from '../../../../../../config/socket';
import {socketEmitChatsTypingState} from '../../../../../../config/socket/actions/socketEmit';
import languages from '../../../../../../config/translations';
import {fullDate} from '../../../../../../helpers';
import {
  editMessageAction,
  shareMessageAction,
} from '../../../../../../redux/app/slice';

import RightInputComponent from './components/RightInputComponent';
import LeftInputComponent from './components/LeftInputComponent';
import MessageEdit from './components/messageEdit';
import SheredMessages from './components/sheredMessages';

export default function MessageInput({
  userId,
  firstName,
  opponentId,
  refBottomSheet,
}) {
  // HOOKS
  const dispatch = useDispatch();
  const route = useRoute();

  // SELECTORS
  const lang = useSelector(({settingSlice}) => settingSlice.lang);
  const typing = useSelector(
    ({conversationsSlice}) => conversationsSlice.conversationTypeState,
  );
  const {messageEdit} = useSelector(({appSlice}) => appSlice);
  const forwardMessages = useSelector(({appSlice}) => appSlice.sheraMessages);

  // STATES
  const [sheredMessages, setSheredMessages] = React.useState([]);
  const [message, setMessage] = React.useState({0: ''});
  const [visible, setVisible] = React.useState(false);

  // VARIABLES
  const conversationId = route?.params?.id;
  const conversationData = route?.params?.conversationData;

  // FUNCTIONS
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const handleChangeMessage = text => {
    setMessage({...message, [conversationId]: text});
    const user = {
      userId,
      firstName,
      conversationId,
      isTyping: false,
    };
    if (!typing[conversationId]) {
      socketEmitChatsTypingState(user, conversationId);
    } else {
      socketEmitChatsTypingState(user);
    }
  };

  const socketSendMessageCommonFun = (id, messageSend, forwardedFromId) =>
    socket.emit(
      'chats',
      {
        conversationId: id,
        message: messageSend,
        messageId: messageEdit.messageId,
        userId,
        opponentId,
        forwardedFromId: forwardedFromId || null,
      },
      success => {
        if (success) setMessage({...message, [conversationId]: ''});
      },
    );

  const handleSendMessage = () => {
    if (!message[conversationId] && !sheredMessages.length) return;
    const messageSend = {
      message: message?.message || message[conversationId],
      fkSenderId: message?.User?.id || userId,
      messageType: 'Text',
    };
    if (!conversationId) {
      return socketSendMessageCommonFun(undefined);
    }
    if (sheredMessages.length) {
      sheredMessages.map(message => {
        const messageObj = {
          ...message,
        };
        socketSendMessageCommonFun(conversationId, messageObj, message.User.id);
        return message;
      });
      dispatch(shareMessageAction([]));
    }
    if (message[conversationId]) {
      if (messageEdit.messageId) {
        socketSendMessageCommonFun(conversationId, messageSend);
      } else {
        messageSend.sendDate = fullDate(new Date());
        socketSendMessageCommonFun(conversationId, messageSend);
      }
    }
    messageEdit.messageId && clearMessageEdit();
  };

  const handleClearSheraMessages = () => {
    dispatch(shareMessageAction([]));
    setSheredMessages([]);
    hideDialog();
  };

  const clearMessageEdit = () => {
    dispatch(
      editMessageAction({
        message: {},
        messageId: null,
      }),
    );
    setMessage(prev => ({...prev, [conversationId]: ''}));
  };

  // USEEFFECTS
  React.useEffect(() => {
    setSheredMessages(forwardMessages);
  }, [forwardMessages]);

  useFocusEffect(
    React.useCallback(() => {
      messageEdit.messageId &&
        setMessage(prev => ({
          ...prev,
          [conversationId]: messageEdit.message.message,
        }));

      return () => messageEdit.messageId && clearMessageEdit();
    }, [messageEdit.messageId]),
  );

  return (
    <>
      <View style={styles.root}>
        {messageEdit.messageId ? (
          <MessageEdit data={messageEdit} onClose={clearMessageEdit} />
        ) : null}
        {forwardMessages.length ? (
          <SheredMessages
            forwardMessages={forwardMessages}
            handleClearSheraMessages={showDialog}
          />
        ) : null}
        <View
          style={
            messageEdit.messageId || forwardMessages.length
              ? styles.wrapperInput
              : {...styles.wrapperInput, ...styles.wrapperInputShadow}
          }>
          <LeftInputComponent />
          <TextInput
            multiline={true}
            style={styles.input}
            contentStyle={{paddingTop: 0, marginVertical: -2}}
            activeUnderlineColor={'#ffffff'}
            selectionColor={'red'}
            underlineColor="transparent"
            value={message[conversationId] || ''}
            keyboardType="default"
            onChangeText={handleChangeMessage}
            placeholder={`${languages[lang].generals.typeMessage}...`}
            dense={true}
          />
          <RightInputComponent
            message={message[conversationId]}
            handleSendMessage={handleSendMessage}
            refBottomSheet={refBottomSheet}
            forwardMessages={forwardMessages}
          />
        </View>
      </View>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>
            {forwardMessages.length}{' '}
            {forwardMessages.length > 1 ? 'Messages' : 'Message'}
          </Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              What to do with {forwardMessages.length}{' '}
              {forwardMessages.length > 1 ? 'messages' : 'Message'} messages
              from your chat with {conversationData?.conversationName}?
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions
            style={{flexDirection: 'column', alignItems: 'flex-end'}}>
            <Button onPress={hideDialog}>Show forwarding options</Button>
            <Button onPress={handleClearSheraMessages} color={'red'}>
              Cancel forwarding
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
}
