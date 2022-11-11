import ChatScreen from '../screens/chat';
import NewGroupScreen from '../screens/newGroup';
import ContactsScreen from '../screens/contacts';
import ProfileScreen from '../screens/profile';
import CallsScreen from '../screens/calls';
import PeopleNearbyScreen from '../screens/peopleNearby';
import SavedScreen from '../screens/saved';
import SettingsScreen from '../screens/settings';
import InviteFriendsScreen from '../screens/inviteFriends';
import FeaturesScreen from '../screens/features';
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
  newGroup: 'newGroup',
  contacts: 'contacts',
  calls: 'calls',
  peopleNearby: 'peopleNearby',
  saved: 'saved',
  settings: 'settings',
  inviteFriends: 'inviteFriends',
  features: 'features',
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
    id: 4,
    Component: NewGroupScreen,
    pathName: PathsName.newGroup,
  },
  {
    id: 5,
    Component: ContactsScreen,
    pathName: PathsName.contacts,
  },
  {
    id: 6,
    Component: CallsScreen,
    pathName: PathsName.calls,
  },
  {
    id: 7,
    Component: PeopleNearbyScreen,
    pathName: PathsName.peopleNearby,
  },
  {
    id: 8,
    Component: SavedScreen,
    pathName: PathsName.saved,
  },
  {
    id: 9,
    Component: SettingsScreen,
    pathName: PathsName.settings,
  },
  {
    id: 10,
    Component: InviteFriendsScreen,
    pathName: PathsName.inviteFriends,
  },
  {
    id: 11,
    Component: FeaturesScreen,
    pathName: PathsName.features,
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
