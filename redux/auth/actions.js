import {setLangAction} from '../setting';
import {setIsLogoutAction, authTokenAction} from '../auth';
import {removeTokenStorage} from '../../config/asyncStorageActions';

export const onLogOut = () => async (dispatch, getState) => {
  dispatch(setLangAction('en'));
  dispatch(setIsLogoutAction(true));
  dispatch(authTokenAction(null));
  removeTokenStorage();
};
