/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import * as config from './config';
import {PathsName} from '../../navigation/navigationConfig';
import languages from '../../config/translations';
import {singUpThunk} from '../../redux/auth/thunks';
import AuthForm from '../../components/authForm';

const SignUp = ({navigation}) => {
  // HOOKS
  const dispatch = useDispatch();

  // SELECTORS
  const lang = useSelector(({settingSlice}) => settingSlice.lang);
  const {
    success: {email: login},
    error: errorBack,
  } = useSelector(({authSlice}) => authSlice.signUp);

  // STATES
  const [error, setError] = React.useState('');

  // FUNCTIONS
  const onSubmit = data => {
    dispatch(
      singUpThunk({
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          login: data.email,
        },
      }),
    );
    error && setError('');
  };

  // USEEFFECTS
  React.useEffect(() => {
    if (login && !errorBack) {
      navigation.navigate(PathsName.verification, {login});
    }
    if (errorBack) {
      const errorBackData = errorBack.response?.data;
      errorBackData?.message && setError(errorBackData?.message);
    }
  }, [errorBack, login]);

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
      title={languages[lang].authorization.signUp}
      submitBtnTitle={languages[lang].authorization.signUp}
      configFields={config.signUpPage}
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
            onPress={() => navigation.navigate(PathsName.signIn)}>
            {languages[lang].authorization.haveAnAccount}{' '}
            {languages[lang].authorization.signIn}?
          </Text>
        ),
      }}
    />
  );
};

export default SignUp;
