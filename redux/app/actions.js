import {setSelectedСhatsAction, setSelectedMessagesAction} from './slice';
import {
  actionsForTypeWithObjKey,
  actionsTypeObject,
} from '../../helpers/actionsForType';

export const actionsTypeObjectSelected = actionsTypeObject;

export const selectedСhatsActions =
  (data, typeAction) => async (dispatch, getState) => {
    const {selectedСhats} = getState().appSlice;

    actionsForTypeWithObjKey({
      prevData: {...selectedСhats},
      key: data?.conversationId || null,
      data,
      typeAction,
      dispatch,
      setAction: setSelectedСhatsAction,
    });
    return;
  };

export const selectedMessagesActions =
  (data, typeAction) => async (dispatch, getState) => {
    const {selectedMessages} = getState().appSlice;

    actionsForTypeWithObjKey({
      prevData: {...selectedMessages},
      key: data?.id || null,
      data,
      typeAction,
      dispatch: dispatch,
      setAction: setSelectedMessagesAction,
    });
  };
