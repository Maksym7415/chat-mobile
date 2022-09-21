import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useForm, Controller} from 'react-hook-form';
import * as config from './config';
import classes from './styles';
import {PathsName} from '../../navigation/navigationConfig';
import languages from '../../config/translations';
import PressableCustom from '../../components/pressableCustom';
import TextInputCustom from '../../components/hookFormsComponents/TextInput';
// import {loginThunk} from '../../redux/authorization/thunks';

const SignUp = ({navigation}) => {
  // HOOKS
  const dispatch = useDispatch();

  // SELECTORS
  const lang = useSelector(({appSlice}) => appSlice.lang);
  const {
    success: {email: login},
    error: errorBack,
  } = useSelector(({authorizationSlice}) => authorizationSlice.signUp);

  // STATES
  const [error, setError] = React.useState('');
  const [verificationCode, setVerificationCode] = React.useState('');

  // FUNCTIONS
  const onSubmit = value => {
    navigation.navigate(PathsName.signIn);
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
  React.useEffect(() => {
    if (login && !errorBack)
      navigation.navigate(PathsName.verification, {login});
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
    <View style={classes.wrapperForm}>
      <Text style={classes.title}>{languages[lang].authorization.signUp}</Text>
      {config.signUpPage.map((el, key) => (
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
            label: languages[lang].authorization.signUp,
            styles: null,
          },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default SignUp;
