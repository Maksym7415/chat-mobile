import {PathsName} from '../navigationConfig';

export const mainMenuRouts = lang => [
  {
    id: 1,
    icon: {
      name: 'svgs_line_group',
    },
    title: 'New Group',
    navigatePathName: PathsName.newGroup,
    disabled: true,
  },
  {
    id: 2,
    icon: {
      name: 'svgs_line_user',
    },
    title: 'Contacts',
    navigatePathName: PathsName.contacts,
    disabled: true,
  },
  {
    id: 3,
    icon: {
      name: 'svgs_line_phone',
    },
    title: 'Calls',
    navigatePathName: PathsName.calls,
    disabled: true,
  },
  {
    id: 4,
    icon: {
      name: 'svgs_line_location',
    },
    title: 'People Nearby',
    navigatePathName: PathsName.peopleNearby,
    disabled: true,
  },
  {
    id: 5,
    icon: {
      name: 'svgs_line_boockmark',
    },
    title: 'Saved Message',
    navigatePathName: PathsName.saved,
    disabled: true,
  },
  {
    id: 6,
    icon: {
      name: 'svgs_line_settings',
    },
    title: 'Settings',
    navigatePathName: PathsName.profile,
    disabled: true,
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
    disabled: true,
  },
  {
    id: 2,
    icon: {
      name: 'svgs_line_faq',
    },
    title: 'Telegram Features',
    navigatePathName: PathsName.features,
    disabled: true,
  },
];
