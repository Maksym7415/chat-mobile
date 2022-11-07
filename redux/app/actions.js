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
import Clipboard from '@react-native-community/clipboard';
import {
  actionsForTypeWithObjKey,
  actionsTypeObject,
} from '../../helpers/actionsForType';
import {deepEqual} from '../../helpers';
import {getSnackBar} from '../../components/snackbar/slice';
import {socket} from '../../config/socket';
import TemplatesContent from '../../components/snackbar/components/templatesContent/TemplatesContent';
import {PathsName} from '../../navigation/navigationConfig';

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

export const actionsTypeActionsChat = {
  deleteMessages: 'deleteMessages',
  editMessage: 'editMessage',
  copyMessage: 'copyMessage',
  forwardMessage: 'forwardMessage',
};

export const actionsMessagesChat =
  (data, typeAction, navigation, additionalData) => (dispatch, getState) => {
    let messagesMass = [];

    switch (typeAction) {
      case actionsTypeActionsChat.deleteMessages:
        const getRemoveMessages = (conversationId, messageId) => {
          const allMessages = getState().appSlice.allMessages;

          dispatch(
            setAllMessagesAction({
              [conversationId]: allMessages[conversationId.toString()]?.filter(
                message =>
                  ![messageId?.toString()]?.includes(message?.id?.toString()),
              ),
            }),
          );
        };

        Object.keys(data.selectedMessages).map(messageId => {
          console.log(data.conversationId, 'data.conversationId');
          console.log(messageId, 'messageId');
          socket.emit(
            'chats',
            {
              conversationId: data.conversationId,
              isDeleteMessage: true,
              messageId: +messageId,
            },
            success => {
              // why success is false?

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
