/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */
import * as React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider as PaperProvider} from 'react-native-paper';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView, KeyboardAvoidingView, Platform} from 'react-native';
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
import DrawerNavigator from './drawerNavigator';
import MainScreen from '../screens/main';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function Root() {
  return (
    <Drawer.Navigator
      drawerContent={DrawerNavigator}
      screenOptions={{
        drawerType: 'front',
      }}>
      <Drawer.Screen
        name="main"
        component={MainScreen}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
}

function MyStack() {
  // HOOKS
  const dispatch = useDispatch();

  // SELECTORS
  const tokenPayload = useSelector(({authSlice}) => authSlice.tokenPayload);

  // STATES
  const [isLoading, setIsLoading] = React.useState(true);

  // FUNCTIONS
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
    } finally {
      setIsLoading(false);
    }
  };

  // USEEFFECTS
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
        <GestureHandlerRootView style={{flex: 1}}>
          <KeyboardAvoidingView
            style={styles.keyboardAvoidingView}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            enabled>
            <CustomStatusBar />
            <SafeAreaView style={styles.container}>
              <NavigationContainer>
                <Stack.Navigator
                  initialRouteName={
                    tokenPayload.login ? PathsName.signIn : PathsName.main
                  }
                  screenOptions={{
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
                    <>
                      <Stack.Screen name="Root" component={Root} />
                      {navigation.map(item => {
                        return (
                          <Stack.Screen
                            key={item.id}
                            name={item.pathName}
                            options={item.options}
                            component={item.Component}
                          />
                        );
                      })}
                    </>
                  )}
                </Stack.Navigator>
              </NavigationContainer>
            </SafeAreaView>
          </KeyboardAvoidingView>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

export default MyStack;
