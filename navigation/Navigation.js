/* eslint-disable react/react-in-jsx-scope */
import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import SplashScreen from '../screens/splash';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationNotAuthorized, navigation} from './navigationConfig';

const Stack = createNativeStackNavigator();

function MyStack() {
  const isLoading = useSelector(({appSlice}) => appSlice.isLoading);
  const [signIn, setSignIn] = React.useState(null);

  return (
    <Stack.Navigator>
      {isLoading ? (
        <Stack.Screen name="Splash" component={SplashScreen} />
      ) : signIn == null ? (
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
  );
}

export default MyStack;
