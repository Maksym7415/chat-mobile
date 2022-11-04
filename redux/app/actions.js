/* eslint-disable react/react-in-jsx-scope */
import {
  setSelectedСhatsAction,
  setSelectedMessagesAction,
  setSettingStatusBarAction,
  settingStatusBarInitial,
  setAllMessagesAction,
  editMessageAction,
} from './slice';
import {Text} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import {
  actionsForTypeWithObjKey,
  actionsTypeObject,
} from '../../helpers/actionsForType';
import {deepEqual} from '../../helpers';
import {getSnackBar} from '../../components/snackbar/slice';
import {socket} from '../../config/socket';
import TemplatesContent from '../../components/snackbar/components/templatesContent/TemplatesContent';

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
  (data, typeAction) => (dispatch, getState) => {
    const {allMessages} = getState().appSlice;

    switch (typeAction) {
      case actionsTypeActionsChat.deleteMessages:
        Object.keys(data.selectedMessages).map(messageId =>
          socket.emit('chats', {
            conversationId: data.conversationId,
            isDeleteMessage: true,
            messageId,
          }),
        );
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
        const messagesMass = Object.keys(data.selectedMessages).reduce(
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
        console.log(data.selectedMessages, 'forwardMessage');

        return;
      default:
        break;
    }
  };
