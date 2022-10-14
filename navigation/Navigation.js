/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */
import * as React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider as PaperProvider} from 'react-native-paper';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
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
import DrawerNavigator from './drawerNavigator';
import MainScreen from '../screens/main';

import SignInScreen from '../screens/signIn';
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
                    <>
                      <Stack.Screen options={{}} name="Root" component={Root} />
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
                {/* <Drawer.Navigator
                drawerContent={DrawerNavigator}
                drawerContentOptions={{
                  activeBackgroundColor: 'transparent',
                  inactiveBackgroundColor: 'transparent',
                  labelStyle: {
                    fontSize: 15,
                    marginLeft: 0,
                  },
                }}
                drawerStyle={
                  {
                    // backgroundColor: theme?.colors?.grey4,
                  }
                }>
                {navigation.map(item => {
                  return (
                    <Drawer.Screen
                      key={item.id}
                      name={item.pathName}
                      options={item.options}
                      component={item.Component}
                    />
                  );
                })}
                <Drawer.Screen name="Avatars" component={Avatars} />
              </Drawer.Navigator> */}
              </NavigationContainer>
            </SafeAreaView>
          </KeyboardAvoidingView>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

export default MyStack;
