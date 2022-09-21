/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import * as config from './config';
import {PathsName} from '../../navigation/navigationConfig';
import languages from '../../config/translations';
import {authTokenAction} from '../../redux/auth';
import AuthForm from '../../components/authForm';

const Verification = ({navigation, route}) => {
  // HOOKS
  const dispatch = useDispatch();

  // SELECTORS
  const lang = useSelector(({settingSlice}) => settingSlice.lang);
  const response = useSelector(({authSlice}) => authSlice.verification);
  const isRedirectToSignIn = useSelector(
    ({authSlice}) => authSlice.login.success?.status,
  );

  // this provided to prevent redirect in case we signing up, making automatically login and redirecting user straight to verification page
  const isSignUp = useSelector(
    ({authSlice}) => authSlice.signUp.success?.email,
  );

  // STATES
  const [error, setError] = React.useState('');
  const [verificationCode, setVerificationCode] = React.useState('');

  console.log(route.params, 'Verification page');

  // FUNCTIONS
  const onSubmit = value => {
    navigation.navigate(PathsName.signUp);
    // dispatch(
    //   verificationThunk({
    //     data: {
    //       verificationCode: value,
    //       login: route.params?.login,
    //     },
    //   }),
    // );
    // error && setError('');
  };

  // USEEFFECTS
  // React.useEffect(() => {
  //   if (!isRedirectToSignIn && !isSignUp) {
  //     navigation.navigate(PathsName.signIn);
  //   }
  // }, []);

  // VARIABLES
  let errorBack = null;

  React.useEffect(() => {
    errorBack = response.error;
    if (!!response.success.accessToken && !errorBack) {
      // localStorage.setItem('accessToken', response.success.accessToken);
      dispatch(authTokenAction(response.success.accessToken));
      navigation.navigate(PathsName.home);
    }
    if (errorBack) {
      const errorBackData = errorBack.response?.data;
      errorBackData?.message && setError(errorBackData?.message);
    }
  }, [response]);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      login: '',
    },
  });

  return (
    <AuthForm
      title={languages[lang].authorization.verificate}
      submitBtnTitle={languages[lang].authorization.verificate}
      configFields={config.verificationFields}
      onSubmit={onSubmit}
      errorBack={error}
      optionsForm={{
        control,
        handleSubmit,
        errors,
      }}
    />
  );
};

export default Verification;
