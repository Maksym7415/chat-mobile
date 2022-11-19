import {setLangAction} from '../setting/slice';
import {
  setIsLogoutAction,
  authTokenAction,
  setAuthHedersAction,
} from '../auth/slice';
import {removeTokenStorage} from '../../config/asyncStorageActions';

export const onLogOut = () => dispatch => {
  dispatch(setLangAction('en'));
  dispatch(setIsLogoutAction(true));
  dispatch(authTokenAction(null));
  dispatch(setAuthHedersAction({accessToken: ''}));
  removeTokenStorage();
};
