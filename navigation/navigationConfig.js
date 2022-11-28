import ChatScreen from '../screens/chat';
import ContactsScreen from '../screens/contacts';
import ProfileScreen from '../screens/profile';
import SignInScreen from '../screens/signIn';
import SignUpScreen from '../screens/signUp';
import verificationScreen from '../screens/verification';
import SearchScreen from '../screens/search';

// subs ProfileScreen
import EditNameInSubProfileScreen from '../screens/profile/subScreens/editName';

export const PathsName = {
  main: 'main',
  chat: 'chat',
  signIn: 'signIn',
  signUp: 'signUp',
  verification: 'verification',
  contacts: 'contacts',
  profile: 'profile',
  editNameInSubProfile: 'editNameInSubProfile',
  search: 'search',
};

export const navigation = [
  {
    id: 3,
    Component: ChatScreen,
    pathName: PathsName.chat,
  },
  {
    id: 5,
    Component: ContactsScreen,
    pathName: PathsName.contacts,
  },
  {
    id: 12,
    Component: ProfileScreen,
    pathName: PathsName.profile,
  },
  {
    id: 13,
    Component: EditNameInSubProfileScreen,
    pathName: PathsName.editNameInSubProfile,
  },
  {
    id: 14,
    Component: SearchScreen,
    pathName: PathsName.search,
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
