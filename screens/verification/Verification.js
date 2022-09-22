/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import * as config from './config';
import languages from '../../config/translations';
import AuthForm from '../../components/authForm';
import {postVerificationRequest} from '../../redux/auth/requests';

const Verification = () => {
  // HOOKS
  const dispatch = useDispatch();

  // SELECTORS
  const lang = useSelector(({settingSlice}) => settingSlice.lang);
  // this provided to prevent redirect in case we signing up, making automatically login and redirecting user straight to verification page
  const {loginSingIn, verificationCode} = useSelector(
    ({authSlice}) => authSlice,
  );

  // STATES
  const [errorBack, setErrorBack] = React.useState('');

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: {errors},
  } = useForm({
    defaultValues: {
      verificationCode: '',
    },
  });

  // FUNCTIONS
  const onSubmit = data => {
    dispatch(
      postVerificationRequest({
        data: {
          verificationCode: data.verificationCode,
          login: loginSingIn,
        },
        errorCb: dataError => {
          dataError?.message && setErrorBack(dataError?.message);
        },
      }),
    );
    errorBack && setErrorBack('');
  };

  useEffect(() => {
    // set defaultValues form from back
    if (!getValues('verificationCode') && verificationCode) {
      setValue('verificationCode', `${verificationCode}`);
    }
  }, [verificationCode]);

  return (
    <AuthForm
      title={languages[lang].authorization.verificate}
      submitBtnTitle={languages[lang].authorization.verificate}
      configFields={config.verificationFields}
      onSubmit={onSubmit}
      errorBack={errorBack}
      optionsForm={{
        control,
        handleSubmit,
        errors,
      }}
    />
  );
};

export default Verification;
