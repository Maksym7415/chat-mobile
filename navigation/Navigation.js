/* eslint-disable react/react-in-jsx-scope */
import * as React from 'react';
import styles from './styles';
import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView, KeyboardAvoidingView, Platform} from 'react-native';
import SplashScreen from '../screens/splash';
import {PathsName} from './navigationConfig';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationNotAuthorized, navigation} from './navigationConfig';

const Stack = createNativeStackNavigator();

function MyStack() {
  const isLoading = useSelector(({appSlice}) => appSlice.isLoading);
  const tokenPayload = useSelector(({authSlice}) => authSlice.tokenPayload);

  console.log(tokenPayload, 'tokenPayload');
  return (
    <KeyboardAvoidingView
      style={styles.container}
      // behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      // enabled
    >
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={
              tokenPayload.login ? PathsName.signIn : PathsName.main
            }
            // screenOptions={{headerShown: false}}
          >
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
  );
}

export default MyStack;
