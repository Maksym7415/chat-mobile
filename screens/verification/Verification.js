/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {Text, View} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import * as config from './config';
import classes from './styles';
import {PathsName} from '../../navigation/navigationConfig';
import languages from '../../config/translations';
import PressableCustom from '../../components/pressableCustom';
import {verificationThunk} from '../../redux/authorization/thunks';
import {authTokenAction} from '../../redux/authorization';
import TextInputCustom from '../../components/hookFormsComponents/TextInput';

const Verification = ({navigation, route}) => {
  // HOOKS
  const dispatch = useDispatch();

  // SELECTORS
  const lang = useSelector(({appSlice}) => appSlice.lang);
  const response = useSelector(
    ({authorizationSlice}) => authorizationSlice.verification,
  );
  const isRedirectToSignIn = useSelector(
    ({authorizationSlice}) => authorizationSlice.login.success?.status,
  );

  // this provided to prevent redirect in case we signing up, making automatically login and redirecting user straight to verification page
  const isSignUp = useSelector(
    ({authorizationSlice}) => authorizationSlice.signUp.success?.email,
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
    <View style={classes.wrapperForm}>
      <Text style={classes.title}>
        {languages[lang].authorization.verificate}
      </Text>
      {config.verificationFields.map((el, key) => (
        <Controller
          key={key}
          control={control}
          rules={el.validate}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInputCustom
              style={el.style}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              errors={errors}
              error={errors[el.fieldName]}
              keyboardType={el.keyboardType}
              secureTextEntry={false}
              placeholder={el.placeholder}
              styles={el.styles}
            />
          )}
          name={el.fieldName}
        />
      ))}
      {errorBack && (
        <View className={classes.error}>
          <Text>{errorBack}</Text>
        </View>
      )}
      <PressableCustom
        on={{
          onPress: handleSubmit(onSubmit),
        }}
        options={{
          text: {
            label: languages[lang].authorization.verificate,
            styles: null,
          },
        }}
      />
    </View>
  );
};

export default Verification;
