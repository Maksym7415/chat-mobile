/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */
import * as React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider as PaperProvider} from 'react-native-paper';
import {
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  View,
} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import styles from './styles';
import {
  PathsName,
  navigationNotAuthorized,
  navigation,
} from './navigationConfig';
import {getTokenStorage} from '../config/asyncStorageActions';
import SplashScreen from '../screens/splash';
import {authTokenAction, setAuthHedersAction} from '../redux/auth/slice';
import {getUserProfileDataRequest} from '../redux/user/requests';
import {themeLight} from '../config/theme';
import CustomStatusBar from '../components/customBar';

const Stack = createNativeStackNavigator();

function MyStack() {
  // HOOKS
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = React.useState(true);
  const tokenPayload = useSelector(({authSlice}) => authSlice.tokenPayload);

  const checkIsToken = async () => {
    setIsLoading(true);
    const token = await getTokenStorage();
    try {
      if (token) {
        await dispatch(
          setAuthHedersAction({
            accessToken: token,
          }),
        );
        await dispatch(
          authTokenAction({
            token,
          }),
        );
      }
    } catch (error) {
      console.log(error, 'checkIsToken');
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    checkIsToken();
  }, []);

  React.useEffect(() => {
    if (tokenPayload.userId) {
      dispatch(getUserProfileDataRequest());
    }
  }, [tokenPayload]);

  return (
    <PaperProvider theme={themeLight}>
      <SafeAreaProvider>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          enabled>
          <CustomStatusBar />
          <SafeAreaView style={styles.container}>
            <StatusBar
              barStyle="light-content"
              animated={true}
              backgroundColor="#ea392f"
              translucent={false}
            />
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName={
                  tokenPayload.login ? PathsName.signIn : PathsName.main
                }
                screenOptions={{
                  // header: props => <Header {...props} />,
                  headerShown: false,
                }}>
                {isLoading ? (
                  <Stack.Screen name="Splash" component={SplashScreen} />
                ) : !tokenPayload.login ? (
                  navigationNotAuthorized.map(item => {
                    return (
                      <Stack.Screen
                        key={item.id}
                        name={item.pathName}
                        options={item.options}
                        component={item.Component}
                      />
                    );
                  })
                ) : (
                  navigation.map(item => {
                    return (
                      <Stack.Screen
                        key={item.id}
                        name={item.pathName}
                        options={item.options}
                        component={item.Component}
                      />
                    );
                  })
                )}
              </Stack.Navigator>
            </NavigationContainer>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

export default MyStack;
