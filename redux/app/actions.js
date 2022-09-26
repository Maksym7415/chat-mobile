import {setSelectedСhatsAction} from './slice';

export const selectedСhatsActionType = {
  add: 'add',
  remove: 'remove',
  clear: 'clear',
};

export const selectedСhatsAction =
  (data, typeAction) => async (dispatch, getState) => {
    const {selectedСhats} = getState().appSlice;

    let updateSelectedСhats = {...selectedСhats};

    switch (typeAction) {
      case selectedСhatsActionType.add:
        updateSelectedСhats[data.conversationId] = data;
        dispatch(setSelectedСhatsAction(updateSelectedСhats));
        return;
      case selectedСhatsActionType.remove:
        delete updateSelectedСhats[data.conversationId];
        dispatch(setSelectedСhatsAction(updateSelectedСhats));
        return;
      case selectedСhatsActionType.clear:
        dispatch(setSelectedСhatsAction({}));
        return;
      default:
        return;
    }
  };
