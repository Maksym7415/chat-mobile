/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {TextInput} from 'react-native-paper';
import {stylesMessageInput as styles} from './styles';
import {socket} from '../../../../../../config/socket';
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
import BottomSheet from '../../../../../../components/customBottomSheet';

export default function MessageInput({
  conversationId,
  userId,
  firstName,
  opponentId,
  openFileDialog,
}) {
  // HOOKS
  const dispatch = useDispatch();

  // REFS
  const refBottomSheet = React.useRef(null);

  // SELECTORS
  const lang = useSelector(({settingSlice}) => settingSlice.lang);
  const typing = useSelector(
    ({conversationsSlice}) => conversationsSlice.conversationTypeState,
  );
  const {messageEdit} = useSelector(({appSlice}) => appSlice);
  const sheraMessages = useSelector(({appSlice}) => appSlice.sheraMessages);

  // STATES
  const [sheredMessages, setSheredMessages] = React.useState([]);
  const [message, setMessage] = React.useState({0: ''});

  // FUNCTIONS
  const handleChangeMessage = text => {
    setMessage({...message, [conversationId]: text});
    const user = {
      userId,
      firstName,
      conversationId,
      isTyping: false,
    };
    if (!typing[conversationId]) {
      socket.emit('typingState', user, conversationId);
    } else {
      socket.emit('typingState', user);
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
          // sendDate: fullDate(new Date()),
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
    setSheredMessages(sheraMessages);
  }, [sheraMessages]);

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
    <View style={styles.root}>
      {messageEdit.messageId ? (
        <MessageEdit data={messageEdit} onClose={clearMessageEdit} />
      ) : null}
      {sheredMessages.length ? <SheredMessages /> : null}
      <View
        style={
          messageEdit.messageId || sheredMessages.length
            ? styles.wrapperInput
            : {...styles.wrapperInput, ...styles.wrapperInputShadow}
        }>
        <LeftInputComponent />
        <TextInput
          multiline={true}
          style={styles.input}
          // contentStyle={{marginHorizontal: -10, marginVertical: -2}}
          activeUnderlineColor={'#ffffff'}
          selectionColor={'red'}
          underlineColor="transparent"
          value={message[conversationId] || ''}
          keyboardType="default"
          onChangeText={handleChangeMessage}
          placeholder={`${languages[lang].generals.typeMessage}...`}
          keyboardkey={res => console.log(res, 'res')}
        />
        <RightInputComponent
          message={message[conversationId]}
          handleSendMessage={handleSendMessage}
          refBottomSheet={refBottomSheet}
        />
      </View>
      <BottomSheet ref={refBottomSheet}>
        <View style={{flex: 1, backgroundColor: 'orange'}} />
      </BottomSheet>
    </View>
  );
}
