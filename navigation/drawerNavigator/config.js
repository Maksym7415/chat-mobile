import {PathsName} from '../navigationConfig';

export const mainMenuRouts = lang => [
  {
    id: 1,
    icon: {
      name: 'svgs_line_group',
    },
    title: 'New Group',
    navigatePathName: PathsName.newGroup,
  },
  {
    id: 2,
    icon: {
      name: 'svgs_line_user',
    },
    title: 'Contacts',
    navigatePathName: PathsName.contacts,
  },
  {
    id: 3,
    icon: {
      name: 'svgs_line_phone',
    },
    title: 'Calls',
    navigatePathName: PathsName.calls,
  },
  {
    id: 4,
    icon: {
      name: 'svgs_line_location',
    },
    title: 'People Nearby',
    navigatePathName: PathsName.peopleNearby,
  },
  {
    id: 5,
    icon: {
      name: 'svgs_line_boockmark',
    },
    title: 'Saved Message',
    navigatePathName: PathsName.saved,
  },
  {
    id: 6,
    icon: {
      name: 'svgs_line_settings',
    },
    title: 'Settings',
    navigatePathName: PathsName.profile,
  },
];

export const otherMenuRouts = lang => [
  {
    id: 1,
    icon: {
      name: 'svgs_line_add_user',
    },
    title: 'Invite Friends',
    navigatePathName: PathsName.inviteFriends,
  },
  {
    id: 2,
    icon: {
      name: 'svgs_line_faq',
    },
    title: 'Telegram Features',
    navigatePathName: PathsName.features,
  },
];
