/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {stylesMessageInput as styles} from './styles';
import {socket} from '../../../../../../config/socket';
import languages from '../../../../../../config/translations';
import {fullDate} from '../../../../../../helpers';
import {
  editMessageAction,
  deleteMessageAction,
  shareMessageAction,
} from '../../../../../../redux/app';
import RightInputComponent from './components/RightInputComponent';
import LeftInputComponent from './components/LeftInputComponent';
import MessageEdit from './components/messageEdit';
import SheredMessages from './components/sheredMessages';
import BottomSheet from '../../../../../../components/customBottomSheet';

export default function MessageInput({
  conversationId,
  allMessages,
  setAllMessages,
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
  const messageEdit = useSelector(({appSlice}) => appSlice.messageEdit);
  const sheraMessages = useSelector(({appSlice}) => appSlice.sheraMessages);

  // STATES
  const [sheredMessages, setSheredMessages] = React.useState([]);
  const [editedMessage, setEditedMessage] = React.useState('');
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
    // if (!conversationId) {
    //   return socketSendMessageCommonFun(undefined);
    // }
    if (sheredMessages.length) {
      sheredMessages.map(message => {
        // message.sendDate  = fullDate(new Date());
        const messageObj = {
          ...message,
          sendDate: fullDate(new Date()),
        };
        socketSendMessageCommonFun(conversationId, messageObj, message.User.id);
        return message;
      });
      dispatch(shareMessageAction([]));
    }
    if (message[conversationId]) {
      if (messageEdit.isEdit) {
        socketSendMessageCommonFun(conversationId, messageSend);
      } else {
        messageSend.sendDate = fullDate(new Date());
        socketSendMessageCommonFun(conversationId, messageSend);
      }
    }
    if (messageEdit.isEdit) dispatch(editMessageAction(false, null));
  };

  const sendMessageByKey = event => {
    if (event.key === 'Enter') {
      if (!message[conversationId] && !sheredMessages.length) return;
      if (!conversationId) {
        return socketSendMessageCommonFun(undefined);
      }
      socketSendMessageCommonFun(conversationId);
      dispatch(editMessageAction(false, null));
    }
  };

  const handleClearSheraMessages = () => {
    dispatch(shareMessageAction([]));
    setSheredMessages([]);
  };

  const handleClearEditMessage = () => {
    // dispatch(editMessageAction(false, null));
    setMessage({...message, [conversationId]: ''});
    setEditedMessage('');
  };

  // USEEFFECTS
  React.useEffect(() => {
    if (messageEdit.isEdit) {
      const resultMessage = allMessages[conversationId].find(
        message => message.id === messageEdit.messageId,
      );
      setEditedMessage(resultMessage ? resultMessage.message : '');
      setMessage(() => ({
        ...message,
        [conversationId]: resultMessage ? resultMessage.message : '',
      }));
    }
    if (messageEdit.isDelete) {
      socket.emit(
        'chats',
        {
          conversationId,
          isDeleteMessage: true,
          messageId: messageEdit.messageId,
        },
        success => {
          if (success) console.log('deleted');
        },
      );
      dispatch(deleteMessageAction(false, null));
    }
  }, [messageEdit]);

  React.useEffect(() => {
    socket.on('deleteMessage', ({conversationId, messageId}) => {
      setAllMessages(messages => ({
        ...messages,
        [conversationId]: messages[conversationId].filter(
          message => message.id !== messageId,
        ),
      }));
    });
  }, []);

  React.useEffect(() => {
    handleClearEditMessage();
  }, [conversationId]);

  React.useEffect(() => {
    setSheredMessages(sheraMessages);
  }, [sheraMessages]);

  return (
    <>
      {messageEdit.isEdit ? <MessageEdit /> : null}
      {sheredMessages.length ? <SheredMessages /> : null}
      <View
        style={
          messageEdit.isEdit || sheredMessages.length
            ? styles.wrapperInput
            : {...styles.wrapperInput, ...styles.wrapperInputShadow}
        }>
        <LeftInputComponent />
        <TextInput
          multiline={true}
          style={styles.input}
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
    </>
  );
}
