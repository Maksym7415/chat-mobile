/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import * as config from './config';
import {PathsName} from '../../navigation/navigationConfig';
import languages from '../../config/translations';
import AuthForm from '../../components/authForm';
import {loginThunk} from '../../redux/auth/thunks';

const SignIn = ({navigation}) => {
  // HOOKS
  const dispatch = useDispatch();

  // SELECTORS
  const lang = useSelector(({settingSlice}) => settingSlice.lang);
  const {error: errorBack, success} = useSelector(
    ({authSlice}) => authSlice.login,
  );

  // STATES
  const [error, setError] = React.useState('');

  // FUNCTIONS
  const onSubmit = data => {
    const {login} = data;
    dispatch(
      loginThunk({
        data: {
          login,
        },
      }),
    );
    error && setError('');
  };

  //USEEFFECTS
  React.useEffect(() => {
    if (success?.status && !errorBack) {
      if (errorBack) {
        navigation.navigate(PathsName.verification, success.email);
        const errorBackData = errorBack.response?.data;
        errorBackData?.message && setError(errorBackData?.message);
      }
    }
  }, [errorBack, success]);

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
      title={languages[lang].authorization.signin}
      submitBtnTitle={languages[lang].authorization.signin}
      configFields={config.signInFields}
      onSubmit={onSubmit}
      errorBack={error}
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
