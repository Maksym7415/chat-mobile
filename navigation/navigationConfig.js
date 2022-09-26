import MainScreen from '../screens/main';
import ChatScreen from '../screens/chat';

import SignInScreen from '../screens/signIn';
import SignUpScreen from '../screens/signUp';
import verificationScreen from '../screens/verification';

export const PathsName = {
  main: 'main',
  chat: 'chat',
  signIn: 'signIn',
  signUp: 'signUp',
  verification: 'verification',
};

export const navigation = [
  {
    id: 1,
    Component: MainScreen,
    pathName: PathsName.main,
    options: {
      title: 'Main',
    },
  },
  {
    id: 2,
    Component: ChatScreen,
    pathName: PathsName.chat,
    options: {
      title: 'Chat',
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
