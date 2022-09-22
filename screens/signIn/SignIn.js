/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import * as config from './config';
import {PathsName} from '../../navigation/navigationConfig';
import languages from '../../config/translations';
import AuthForm from '../../components/authForm';
import {postLoginRequest} from '../../redux/auth/requests';

const SignIn = ({navigation}) => {
  // HOOKS
  const dispatch = useDispatch();

  // SELECTORS
  const lang = useSelector(({settingSlice}) => settingSlice.lang);
  const loginSingIn = useSelector(({authSlice}) => authSlice.loginSingIn);

  // STATES
  const [errorBack, setErrorBack] = React.useState('');

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      login: loginSingIn || '',
    },
  });

  // FUNCTIONS
  const onSubmit = data => {
    const {login} = data;
    dispatch(
      postLoginRequest({
        data: {
          login,
        },
        cb: () => {
          navigation.navigate(PathsName.verification);
        },
        errorCb: dataError => {
          dataError?.message && setErrorBack(dataError?.message);
        },
      }),
    );
    errorBack && setErrorBack('');
  };
  console.log(errorBack, 'errorBack');
  return (
    <AuthForm
      title={languages[lang].authorization.signin}
      submitBtnTitle={languages[lang].authorization.signin}
      configFields={config.signInFields}
      onSubmit={onSubmit}
      errorBack={errorBack}
      optionsForm={{
        control,
        handleSubmit,
        errors,
      }}
      render={{
        text: styles => (
          <Text
            style={styles.text}
            onPress={() => navigation.navigate(PathsName.signUp)}>
            {languages[lang].authorization.haveNoAccount}{' '}
            {languages[lang].authorization.signUp} ?
          </Text>
        ),
      }}
    />
  );
};

export default SignIn;
