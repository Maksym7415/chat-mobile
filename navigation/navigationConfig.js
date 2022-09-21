import HomeScreen from '../screens/home';
import SignInScreen from '../screens/signIn';
import SignUpScreen from '../screens/signUp';
import verificationScreen from '../screens/verification';

export const PathsName = {
  home: 'home',
  signIn: 'signIn',
  signUp: 'signUp',
  verification: 'verification',
};

export const navigation = [
  {
    id: 4,
    Component: HomeScreen,
    pathName: PathsName.home,
    options: {
      title: 'Home',
    },
  },
];

export const navigationNotAuthorized = [
  {
    id: 1,
    Component: SignInScreen,
    pathName: PathsName.signIn,
    options: {
      title: 'Sign in',
    },
  },
  {
    id: 2,
    Component: verificationScreen,
    pathName: PathsName.verification,
    options: {
      title: 'Verification',
    },
  },
  {
    id: 3,
    Component: SignUpScreen,
    pathName: PathsName.signUp,
    options: {
      title: 'Sign Up',
    },
  },
];
