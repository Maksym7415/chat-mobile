import React from 'react';
import {Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useForm, Controller} from 'react-hook-form';
import * as config from './config';
import classes from './styles';
import {PathsName} from '../../navigation/navigationConfig';
import languages from '../../config/translations';
import PressableCustom from '../../components/pressableCustom';
import TextInputCustom from '../../components/hookFormsComponents/TextInput';
import {verificationThunk} from '../../redux/authorization/thunks';

const SignIn = ({navigation}) => {
  // HOOKS
  const dispatch = useDispatch();

  // SELECTORS
  const lang = useSelector(({appSlice}) => appSlice.lang);
  const response = useSelector(
    ({authorizationSlice}) => authorizationSlice.login,
  );

  // STATES
  const [error, setError] = React.useState('');

  // VARIABLES
  const errorBack = null;

  // FUNCTIONS
  const onSubmit = data => {
    // axios.post('http://localhost:3000/api/signIn');
    navigation.navigate(PathsName.verification, {
      login: data.login,
    });
    // const {login} = data;
    // dispatch(
    //   loginThunk({
    //     data: {
    //       login,
    //     },
    //   }),
    // );
    error && setError('');
  };

  //USEEFFECTS
  React.useEffect(() => {
    const errorBack = response.error;
    if (response.success?.status && !errorBack)
      if (errorBack) {
        navigation.navigate(PathsName.verification, login);
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
      <Text style={classes.title}>{languages[lang].authorization.signin}</Text>
      {config.signInFields.map((el, key) => (
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
              placeholder={el.placeholder}
              secureTextEntry={false}
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
            label: languages[lang].authorization.signin,
            styles: null,
          },
        }}
      />
    </View>
  );
};

export default SignIn;
