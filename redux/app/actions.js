/* eslint-disable react/react-in-jsx-scope */
import {
  setSelectedСhatsAction,
  setSelectedMessagesAction,
  setSettingStatusBarAction,
  settingStatusBarInitial,
  setAllMessagesAction,
  editMessageAction,
  shareMessageAction,
} from './slice';
import {setConversationListAction} from '../conversations/slice';
import Clipboard from '@react-native-community/clipboard';
import {
  actionsForTypeWithObjKey,
  actionsTypeObject,
} from '../../helpers/actionsForType';
import {deepEqual} from '../../helpers';
import {getSnackBar} from '../../components/snackbar/slice';
import {
  socketEmitChatsDeleteMessage,
  socketEmitDeleteConversation,
  socketEmitClearConversation,
} from '../../config/socket/actions/socketEmit';
import TemplatesContent from '../../components/snackbar/components/templatesContent/TemplatesContent';
import {PathsName} from '../../navigation/navigationConfig';
import {conversationListActions} from '../conversations/actions';

export const actionsTypeObjectSelected = actionsTypeObject;

const changeStatusBar =
  (conditional, data1, data2, notConditionalData, isConditionalData) =>
  dispatch => {
    if (conditional) {
      deepEqual(data1, data2) &&
        dispatch(setSettingStatusBarAction(isConditionalData));
    } else {
      !deepEqual(data1, data2) &&
        dispatch(setSettingStatusBarAction(notConditionalData));
    }
  };

export const selectedСhatsActions =
  (data, typeAction) => async (dispatch, getState) => {
    const {selectedСhats, settingStatusBar} = getState().appSlice;

    const changeData = actionsForTypeWithObjKey({
      prevData: {...selectedСhats},
      key: data?.conversationId || null,
      data,
      typeAction,
      dispatch,
      setAction: setSelectedСhatsAction,
    });

    dispatch(
      changeStatusBar(
        Object.keys(changeData).length,
        settingStatusBarInitial,
        settingStatusBar,
        settingStatusBarInitial,
        {
          backgroundColor: '#ffffff',
          barStyle: 'dark-content',
        },
      ),
    );

    return;
  };

export const selectedMessagesActions =
  (data, typeAction) => async (dispatch, getState) => {
    const {selectedMessages, settingStatusBar} = getState().appSlice;

    const changeData = actionsForTypeWithObjKey({
      prevData: {...selectedMessages},
      key: data?.id || null,
      data,
      typeAction,
      dispatch: dispatch,
      setAction: setSelectedMessagesAction,
    });

    dispatch(
      changeStatusBar(
        Object.keys(changeData).length,
        settingStatusBarInitial,
        settingStatusBar,
        settingStatusBarInitial,
        {
          backgroundColor: '#ffffff',
          barStyle: 'dark-content',
        },
      ),
    );
  };

export const actionsTypeActionsConversation = {
  deleteChat: 'deleteChat',
  clearChat: 'clearChat',
};

export const actionsSelectedConversation =
  (data, typeAction, navigation, additionalData) => (dispatch, getState) => {
    const selectedСhats = getState().appSlice.selectedСhats;
    // for id
    const allMessages = getState().appSlice.allMessages;
    const conversationsList =
      getState().conversationsSlice.conversationsList.data;

    let copyConversationsList = {...conversationsList};
    const copyAllMessages = {...allMessages};
    //
    console.log(selectedСhats, 'selectedСhats');

    switch (typeAction) {
      case actionsTypeActionsConversation.deleteChat:
        // for ids
        // socketEmitDeleteConversation(
        //   {
        //     ids: Object.keys(selectedСhats),
        //   },
        //   res => {
        //     console.log(res, 'res');
        //   },
        // );
        // for id
        Object.keys(selectedСhats).map(id => {
          delete copyConversationsList[id];
          socketEmitDeleteConversation(
            {
              id,
            },
            res => {
              console.log(res, 'res');
            },
          );
        });
        dispatch(setConversationListAction(copyConversationsList));
        return;
      case actionsTypeActionsConversation.clearChat:
        // for ids
        // socketEmitClearConversation(
        //   {
        //     ids: Object.keys(selectedСhats),
        //   },
        //   res => {
        //     console.log(res, 'res');
        //   },
        // );
        // for id
        Object.keys(selectedСhats).map(id => {
          copyAllMessages[id] = [];
          console.log(
            copyConversationsList[id].Messages,
            'copyConversationsList[id].Messages',
          );

          // глянути чи є якийсь кращий метор зміни ключа в обекті
          copyConversationsList = {
            ...copyConversationsList,
            [id]: {
              ...copyConversationsList[id],
              Messages: [],
            },
          };

          socketEmitClearConversation(
            {
              id,
            },
            res => {
              console.log(res, 'res socketEmitClearConversation');
            },
          );
        });

        dispatch(
          setAllMessagesAction({
            ...copyAllMessages,
          }),
        );
        dispatch(setConversationListAction(copyConversationsList));
        //
        return;
      default:
        return;
    }
  };

export const actionsTypeActionsChat = {
  deleteMessages: 'deleteMessages',
  editMessage: 'editMessage',
  copyMessage: 'copyMessage',
  forwardMessage: 'forwardMessage',
  replyMessage: 'replyMessage',
};

export const actionsMessagesChat =
  (data, typeAction, navigation, additionalData) => (dispatch, getState) => {
    let messagesMass = [];

    switch (typeAction) {
      case actionsTypeActionsChat.deleteMessages:
        const getRemoveMessages = (conversationId, messageId) => {
          const allMessages = getState().appSlice.allMessages;
          const conversationsList =
            getState().conversationsSlice.conversationsList.data;

          // deleting a message from the message array
          let allMessagesWithoutDeleteMessage = allMessages[
            conversationId.toString()
          ]?.filter(
            message =>
              ![messageId?.toString()]?.includes(message?.id?.toString()),
          );

          // check for the last element in the message array, if it is a date object, then delete it as well
          const updateAllMessages = allMessagesWithoutDeleteMessage[
            allMessagesWithoutDeleteMessage?.length - 1
          ]?.component
            ? allMessagesWithoutDeleteMessage.slice(0, -1)
            : allMessagesWithoutDeleteMessage;

          console.log(
            conversationsList[conversationId],
            'conversationsList[conversationId]',
          );
          if (conversationsList[conversationId].Messages[0]?.id == messageId) {
            dispatch(
              conversationListActions({
                mode: 'updateMessageConversation',
                conversationId,
                messages: [updateAllMessages[updateAllMessages.length - 1]],
                conversationsList,
              }),
            );
          }

          dispatch(
            setAllMessagesAction({
              [conversationId]: updateAllMessages,
            }),
          );
        };

        // sorting through the selected messages and sending them through the socket and, if successful, delete them locally through the function - getRemoveMessages
        Object.keys(data.selectedMessages).map(messageId => {
          socketEmitChatsDeleteMessage(
            {
              conversationId: data.conversationId,
              isDeleteMessage: true,
              messageId: +messageId,
            },
            () => {
              getRemoveMessages(data.conversationId, messageId);
            },
          );
        });
        return;
      case actionsTypeActionsChat.editMessage:
        Object.keys(data.selectedMessages).map(messageId =>
          dispatch(
            editMessageAction({
              message: data.selectedMessages[messageId],
              messageId,
            }),
          ),
        );
        return;
      case actionsTypeActionsChat.copyMessage:
        messagesMass = Object.keys(data.selectedMessages).reduce(
          (acc, messageId) => {
            return [...acc, data.selectedMessages[messageId].message];
          },
          [],
        );

        const CopyMessages = messagesMass.join('\n\n');
        CopyMessages && Clipboard.setString(CopyMessages);

        dispatch(
          getSnackBar({
            message: '',
            open: true,
            timeout: 6000,
            severity: 'success',
            wrapperStyle: {bottom: '8%'},
            style: {alignItems: 'center'},
            content: <TemplatesContent type={'copy'} />,
          }),
        );
        return;
      case actionsTypeActionsChat.forwardMessage:
        messagesMass = Object.keys(data.selectedMessages).reduce(
          (acc, messageId) => {
            const messageData = data.selectedMessages[messageId];
            return [
              ...acc,
              {
                Files: messageData.Files,
                User: messageData.User,
                fkSenderId: messageData.fkSenderId,
                id: messageData.id,
                isEditing: messageData.isEditing,
                message: messageData.message,
                sendDate: messageData.sendDate,
              },
            ];
          },
          [],
        );

        dispatch(shareMessageAction(messagesMass));

        navigation.navigate(PathsName.main, {
          typeAction: 'forwardMessage',
          additionalData,
        });

        return;
      default:
        return;
    }
  };
