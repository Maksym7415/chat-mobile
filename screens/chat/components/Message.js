/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, {useLayoutEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {stylesMessage as styles} from './styles';
import {contextMenuConfig, contextMenuCallback} from '../config';
import languages from '../../../config/translations';
import {getCurrentDay} from '../../../helpers';
import UserAvatar from '../../../components/avatar/userAvatar';
import {conversationListActions} from '../../../redux/conversations/actions';
import {
  editMessageAction,
  deleteMessageAction,
  contextMenuAction,
  showDialogAction,
} from '../../../redux/app';
import {
  actionsTypeObjectSelected,
  selectedMessagesActions,
} from '../../../redux/app/actions';
import store from '../../../redux/store';

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
  const {
    conversationId: {type: activeConversationType},
    conversationsList,
  } = useSelector(({conversationsSlice}) => conversationsSlice);
  const {selectedMessages} = useSelector(({appSlice}) => appSlice);

  // STATES
  const [settings, setSettings] = useState({
    typeMessage: '',
    styles: {
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

    dispatch(
      conversationListActions({
        mode: 'deleteMessage',
        conversationId,
        messages: filterAllMassages.length
          ? [filterAllMassages[filterAllMassages.length - 1]]
          : [],
        conversationsList,
      }),
    );
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
        styles: {
          root: styles.containerShared,
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
        styles: {
          root: styles.containerSender,
          rootPaper: styles.paperSenderMessage,
        },
      }));
    }

    // otherUser message
    return setSettings(prev => ({
      ...prev,
      typeMessage: 'otherUser',
      styles: {
        root: styles.containerFriend,
        rootPaper: styles.paperFriendMessage,
      },
    }));
  }, []);

  const handleOnPressChat = () => {
    if (Object.keys(selectedMessages).length && messageData.message) {
      selectedMessages?.[messageData.id]
        ? store.dispatch(
            selectedMessagesActions(
              messageData,
              actionsTypeObjectSelected.remove,
            ),
          )
        : store.dispatch(
            selectedMessagesActions(messageData, actionsTypeObjectSelected.add),
          );
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={(() => {
        const initialStyles = {...settings.styles.root};
        if (selectedMessages?.[messageData.id]) {
          return {
            ...initialStyles,
            ...styles.selectedMessages,
          };
        }
        return initialStyles;
      })()}
      onPress={handleOnPressChat}
      onLongPress={() => {
        !Object.keys(selectedMessages).length &&
          messageData.message &&
          store.dispatch(
            selectedMessagesActions(messageData, actionsTypeObjectSelected.add),
          );
      }}>
      <View style={{...styles.wrapperUp}}>
        {isShowAvatar && (
          <UserAvatar
            source={messageData.User.userAvatar}
            name={`${messageData.User.firstName} ${messageData.User.lastName}`}
            sizeAvatar={38}
          />
        )}
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
          style={styles.wrapper}>
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
              style={{...settings.styles.rootPaper}}>
              {messageData.isEdit && (
                <Text className={styles.edited}>
                  {languages[lang].generals.edited}
                </Text>
              )}
              <View style={styles.wrapperNameData}>
                {activeConversationType !== 'Dialog' ? (
                  <Text style={styles.name}>
                    {messageData.forwardedUser
                      ? languages[lang].generals.forwardedMessage
                      : messageData.User.tagName}
                  </Text>
                ) : (
                  <View style={{...styles.name, height: 2}} />
                )}
                <Text style={styles.messageSendTime}>
                  {getCurrentDay(new Date(messageData.sendDate), true)}
                </Text>
              </View>
              <View
                style={{
                  ...settings.styles.wrapperMessage,
                }}>
                {messageData.forwardedUser && (
                  <Text style={styles.wrapperMessageUserName}>
                    {messageData.User.tagName}
                  </Text>
                )}
                <Text style={{...styles.messageText}}>
                  {messageData.message}
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default Message;
