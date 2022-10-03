import {
  setSelectedСhatsAction,
  setSelectedMessagesAction,
  setSettingStatusBarAction,
  settingStatusBarInitial,
} from './slice';
import {
  actionsForTypeWithObjKey,
  actionsTypeObject,
} from '../../helpers/actionsForType';
import {deepEqual} from '../../helpers';

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
