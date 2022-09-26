/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {stylesMessageInput as styles} from './styles';
import {View, TextInput} from 'react-native';
import socket from '../../../config/socket';
import {fullDate} from '../../../helpers';
import {
  editMessageAction,
  deleteMessageAction,
  shareMessageAction,
} from '../../../redux/app';
import languages from '../../../config/translations';

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
        console.log(message, 'message');
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
  useEffect(() => {
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
          // if (success) console.log('deleted');
        },
      );
      dispatch(deleteMessageAction(false, null));
    }
  }, [messageEdit]);

  useEffect(() => {
    socket.on('deleteMessage', ({conversationId, messageId}) => {
      setAllMessages(messages => ({
        ...messages,
        [conversationId]: messages[conversationId].filter(
          message => message.id !== messageId,
        ),
      }));
    });
  }, []);

  useEffect(() => {
    handleClearEditMessage();
  }, [conversationId]);

  useEffect(() => {
    setSheredMessages(sheraMessages);
  }, [sheraMessages]);

  console.log(message, 'message');
  return (
    <>
      {/* {messageEdit.isEdit && (
        <div className="conversations__send-message-text conversations__send-message-shadow">
          <EditIcon color="primary" className="mr-10" />
          <div className="flex-col conversations__send-message-text-title-wrapper">
            <Typography color="primary">
              {languages[lang].generals.editMessage}
            </Typography>
            <p className="conversations__edit-message-paragraph">
              {editedMessage}
            </p>
          </div>
          <div className="ml-auto pd-right-30">
            <IconButton
              style={{width: '20px', height: '20px'}}
              onClick={handleClearEditMessage}>
              <CloseIcon style={{width: '20px', height: '20px'}} />
            </IconButton>
          </div>
        </div>
      )} */}
      {/* {sheredMessages.length ? (
        <div className="conversations__send-message-text conversations__send-message-shadow">
          <ShareIcon color="primary" className="mr-10" />
          <div className="flex-col conversations__send-message-text-title-wrapper">
            <Typography color="primary">
              {languages[lang].generals.shareMessage}
            </Typography>
            <p className="conversations__edit-message-paragraph">
              {sheredMessages[0].message}
            </p>
          </div>
          <div className="ml-auto pd-right-30">
            <IconButton
              style={{width: '20px', height: '20px'}}
              onClick={handleClearSheraMessages}>
              <CloseIcon style={{width: '20px', height: '20px'}} />
            </IconButton>
          </div>
        </div>
      ) : null} */}
      <View
        style={
          messageEdit.isEdit || sheredMessages.length
            ? styles.wrapperInput
            : {...styles.wrapperInput, ...styles.wrapperInputShadow}
        }>
        <TextInput
          // onKeyDown={sendMessageByKey}
          value={message[conversationId] || ''}
          onChangeText={handleChangeMessage}
          placeholder={`${languages[lang].generals.typeMessage}...`}
          // endAdornment={
          //   (message[conversationId] || '') === '' && !sheredMessages.length ? (
          //     <InputAdornment position="end">
          //       <IconButton
          //         classes={{root: styles.iconButton}}
          //         onClick={openFileDialog}
          //         color="primary"
          //         aria-label="upload picture"
          //         component="span">
          //         <CloudUploadIcon />
          //       </IconButton>
          //     </InputAdornment>
          //   ) : (
          //     <InputAdornment position="end">
          //       <IconButton
          //         classes={{root: styles.iconButton}}
          //         onClick={handleSendMessage}>
          //         <SendIcon />
          //       </IconButton>
          //     </InputAdornment>
          //   )
          // }
        />
      </View>
    </>
  );
}
