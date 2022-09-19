import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as config from './config';
import {PathsName} from '../../navigation/navigationConfig';
import languages from '../../config/translations';
import PressableCustom from '../../components/pressableCustom';

const SignIn = ({navigation}) => {
  // HOOKS
  const dispatch = useDispatch();

  // SELECTORS
  const lang = useSelector(({appSlice}) => appSlice.lang);
  const response = useSelector(
    ({authorizationSlice}) => authorizationSlice.login,
  );

  // STATES
  const [login, setLogin] = React.useState('');
  const [error, setError] = React.useState('');

  // VARIABLES
  const errorBack = null;

  // FUNCTIONS
  const handleSubmit = value => {
    console.log(login, 'response');
    setLogin(value);
    // dispatch(actionLogin(value));
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

  return (
    <View style={classes.wrapperForm}>
      <View className={classes.avatar}></View>
      <Text style={classes.title}>{languages[lang].authorization.signin}</Text>
      {config.signInFields.map((el, key) => (
        <TextInput
          key={key}
          placeholder={el.placeHolder}
          onChangeText={value => setLogin(value)}
          defaultValue={login}
          style={classes[el.className]}
        />
      ))}
      {errorBack && (
        <View className={classes.error}>
          <Text>{errorBack}</Text>
        </View>
      )}
      <PressableCustom
        on={{
          onPress: () => handleSubmit(),
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

const classes = StyleSheet.create({
  login: {
    width: '100%',
    maxWidth: 300,
    marginTop: 16,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#20232a',
    color: '#20232a',
    textAlign: 'center',
    fontSize: 18,
    paddingVertical: 8,
    paddingHorizontal: 8,
    fontWeight: 'bold',
  },
  wrapperForm: {
    // height: '90%',
    marginTop: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    width: '100%',
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SignIn;
