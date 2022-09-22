/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import * as config from './config';
import {PathsName} from '../../navigation/navigationConfig';
import languages from '../../config/translations';
import {postSingUpRequest} from '../../redux/auth/requests';
import AuthForm from '../../components/authForm';

const SignUp = ({navigation}) => {
  // HOOKS
  const dispatch = useDispatch();

  // SELECTORS
  const lang = useSelector(({settingSlice}) => settingSlice.lang);

  // STATES
  const [errorBack, setErrorBack] = React.useState('');

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      login: '',
    },
  });

  // FUNCTIONS
  const onSubmit = data => {
    dispatch(
      postSingUpRequest({
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          login: data.email,
        },
        cb: () => {
          navigation.navigate(PathsName.verification, {
            login: data.email,
          });
        },
        errorCb: dataError => {
          dataError?.message && setErrorBack(dataError?.message);
        },
      }),
    );
    errorBack && setErrorBack('');
  };

  return (
    <AuthForm
      title={languages[lang].authorization.signUp}
      submitBtnTitle={languages[lang].authorization.signUp}
      configFields={config.signUpPage}
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
