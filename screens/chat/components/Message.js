/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, {useLayoutEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {stylesMessageInput as styles} from './styles';
import {
  editMessageAction,
  deleteMessageAction,
  contextMenuAction,
  showDialogAction,
} from '../../../redux/app';
import {getCurrentDay} from '../../../helpers';
import DefaultAvatar from '../../../components/avatar/defaultAvatar';
import {contextMenuConfig, contextMenuCallback} from '../config';
// import {updateConversationData} from '../../../../../redux/conversations/consta';
import languages from '../../../config/translations';

function Message({
  messageData,
  isShowAvatar,
  userId,
  conversationId,
  allMassages,
}) {
  // HOOKS
  const dispatch = useDispatch();

  // SELECTORS
  const lang = useSelector(({settingSlice}) => settingSlice.lang);
  // const activeConversationType = useSelector(
  //   ({userConversationReducer}) => userConversationReducer.conversationId.type,
  // );
  const conversationsList = useSelector(
    ({conversationsSlice}) => conversationsSlice.conversationsList.data,
  );

  // STATES
  const [settings, setSettings] = useState({
    typeMessage: '',
    classNames: {
      root: '',
      rootPaper: '',
    },
  });
  // FUNCTIONS

  const closeContextMenuAction = () =>
    dispatch(
      contextMenuAction({
        yPos: '',
        xPos: '',
        isShowMenu: false,
        messageId: 0,
        config: [],
      }),
    );

  const handleEditMessage = () => {
    dispatch(editMessageAction(true, messageData.id));
    closeContextMenuAction();
  };

  const handleDeleteMessage = () => {
    const filterAllMassages = allMassages.filter(
      message => message.id !== messageData.id && !message.component,
    );

    // updateConversationData(
    //   {
    //     mode: 'deleteMessage',
    //     conversationId,
    //     messages: filterAllMassages.length
    //       ? [filterAllMassages[filterAllMassages.length - 1]]
    //       : [],
    //     conversationsList,
    //   },
    //   dispatch,
    // );
    dispatch(deleteMessageAction(true, messageData.id));
    closeContextMenuAction();
  };

  const handleShareMessage = () => {
    dispatch(
      showDialogAction('Share Message', [
        {
          Files: messageData.Files,
          User: messageData.User,
          fkSenderId: messageData.fkSenderId,
          id: messageData.id,
          isEditing: messageData.isEditing,
          message: messageData.message,
          sendDate: messageData.sendDate,
        },
      ]),
    );
    closeContextMenuAction();
  };

  useLayoutEffect(() => {
    // shared message
    if (messageData.forwardedUser) {
      return setSettings(prev => ({
        ...prev,
        typeMessage: 'shared',
        classNames: {
          root: 'conversations__message-container-margin-shared',
          rootPaper: styles.paperSharedMessage,
          wrapperMessage: styles.wrapperTextMessageShared,
        },
      }));
    }

    // myMessage message
    if (messageData.fkSenderId === userId) {
      return setSettings(prev => ({
        ...prev,
        typeMessage: 'myMessage',
        classNames: {
          root: 'conversations__message-container-margin-sender',
          rootPaper: styles.paperSenderMessage,
        },
      }));
    }

    // otherUser message
    return setSettings(prev => ({
      ...prev,
      typeMessage: 'otherUser',
      classNames: {
        root: 'conversations__message-container-margin-friend',
        rootPaper: styles.paperFriendMessage,
      },
    }));
  }, []);

  console.log(messageData.message, 'messageData.message');
  return (
    <View
      style={`conversations__message-container flex ${settings.classNames.root}`}>
      {isShowAvatar &&
        (messageData.User.userAvatar ? null : (
          <DefaultAvatar
            name={`${messageData.User.firstName} ${messageData.User.lastName}`}
            styles={{
              root: {
                width: 30,
                height: 30,
              },
            }}
            fontSize={10}
          />
        ))}
      <View
        onContextMenu={event =>
          contextMenuCallback(
            event,
            messageData.id,
            contextMenuConfig(
              lang,
              messageData.fkSenderId === userId,
              handleDeleteMessage,
              handleEditMessage,
              handleShareMessage,
            ),
            dispatch,
          )
        }
        onClick={event =>
          contextMenuCallback(event, messageData.id, [], dispatch)
        }
        className="conversations__message-file-container">
        {messageData.Files && !!messageData.Files.length && (
          <View className="conversations__message-image-container">
            {messageData.Files.map(file =>
              ['png', 'jpg', 'jpeg'].includes(file.extension) ? (
                <img
                  key={file.fileStorageName}
                  className="conversations__message-image-item"
                  src={`${process.env.REACT_APP_BASE_URL}/${file.fileStorageName}.${file.extension}`}
                  alt={file.fileStorageName}
                />
              ) : null,
            )}
          </View>
        )}
        {messageData.message && (
          <View
          // className={clsx(settings.classNames.rootPaper, {
          //   [classes.fullWidth]:
          //     messageData.Files && messageData.Files.length,
          // })}
          >
            {messageData.isEdit && (
              <Text className={styles.edited}>
                {languages[lang].generals.edited}
              </Text>
            )}
            <View className="conversations__user-name-date-container relative">
              {/* {activeConversationType !== 'Dialog' ? (
                <p className="conversations__message-info-text">
                  {messageData.forwardedUser
                    ? languages[lang].generals.forwardedMessage
                    : messageData.User.tagName}
                </p>
              ) : (
                <div
                  className="conversations__message-info-text"
                  style={{height: '2px'}}></div>
              )} */}
              <Text className="conversations__message-info-time">
                {getCurrentDay(new Date(messageData.sendDate), true)}
              </Text>
            </View>
            <View
              className={`conversations__message-text ${settings.classNames.wrapperMessage}`}>
              {messageData.forwardedUser && (
                <Text className={styles.wrapperMessageUserName}>
                  {messageData.User.tagName}
                </Text>
              )}
              <Text>{messageData.message}</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

export default Message;
