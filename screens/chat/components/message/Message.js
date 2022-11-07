/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, {useLayoutEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useTheme, Divider} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import makeStyles from './styles';
import {contextMenuConfig, contextMenuCallback} from '../../config';
import languages from '../../../../config/translations';
import {getCurrentDay} from '../../../../helpers';
import UserAvatar from '../../../../components/avatar/userAvatar';
import {conversationListActions} from '../../../../redux/conversations/actions';
import {
  editMessageAction,
  deleteMessageAction,
  contextMenuAction,
  showDialogAction,
} from '../../../../redux/app';
import {
  actionsTypeObjectSelected,
  selectedMessagesActions,
} from '../../../../redux/app/actions';
import store from '../../../../redux/store';
import {TYPES_CONVERSATIONS} from '../../../../config/constants/general';

function Message({messageData, isShowAvatar, userId, typeConversation}) {
  // HOOKS
  const dispatch = useDispatch();
  const theme = useTheme();

  // STYLES
  const styles = makeStyles(theme);

  // SELECTORS
  const lang = useSelector(({settingSlice}) => settingSlice.lang);
  const {
    conversationId: {type: activeConversationType},
  } = useSelector(({conversationsSlice}) => conversationsSlice);
  const {selectedMessages} = useSelector(({appSlice}) => appSlice);
  const {userInfo} = useSelector(({userSlice}) => userSlice);

  // STATES
  const [settings, setSettings] = useState({
    typeMessage: '',
    styles: {
      root: '',
      rootPaper: '',
    },
  });

  // FUNCTIONS
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

  useLayoutEffect(() => {
    // shared message
    if (messageData.forwardedUser) {
      return setSettings(prev => ({
        ...prev,
        typeMessage: 'shared',
        styles: {
          root: styles.containerShared,
          rootPaper: {
            ...styles.paperSharedMessage,
            alignSelf:
              userInfo.id === messageData.User.id ? 'flex-end' : 'flex-start',
          },
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

  return (
    <TouchableOpacity
      activeOpacity={1}
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
        {activeConversationType === 'Chat' && isShowAvatar && (
          <UserAvatar
            source={messageData.User.userAvatar}
            name={`${messageData.User.firstName} ${messageData.User.lastName}`}
            sizeAvatar={38}
          />
        )}
        <View style={styles.wrapper}>
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
            <View style={{...settings.styles.rootPaper}}>
              {messageData.isEdit && (
                <Text className={styles.edited}>
                  {languages[lang].generals.edited}
                </Text>
              )}
              {[TYPES_CONVERSATIONS.chat, TYPES_CONVERSATIONS.dialog].includes(
                typeConversation,
              ) &&
                messageData.forwardedUser && (
                  <View style={styles.wrapperName}>
                    <Text style={styles.name}>
                      {messageData.forwardedUser
                        ? languages[lang].generals.forwardedMessage
                        : messageData.User.tagName ||
                          `${messageData.User.firstName} ${messageData.User.lastName}`}
                    </Text>
                  </View>
                )}
              <View
                style={{
                  ...settings.styles.wrapperMessage,
                }}>
                {messageData.forwardedUser && (
                  <Divider style={styles.divider} />
                )}
                <View>
                  {messageData.forwardedUser && (
                    <Text style={styles.wrapperMessageUserName}>
                      {messageData.User.tagName ||
                        `${messageData.User.firstName} ${messageData.User.lastName}`}
                    </Text>
                  )}
                  <Text style={{...styles.messageText}}>
                    {messageData.message}
                  </Text>
                </View>
              </View>
              <View style={styles.wrapperDate}>
                <Text style={styles.messageSendTime}>
                  {getCurrentDay(new Date(messageData.sendDate), true)}
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
