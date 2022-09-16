import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/home';

const screens = {
  Home: {
    screen: Home,
  },
};

const HomeStack = createStackNavigator(screens);

export default NavigationContainer(HomeStack);
