import {actionsTypeActionsChat} from '../../../../redux/app/actions';

// show:
// 1 - general actionsж
// 2 - when a photo is open
// 3 - when no photo is open

const valuesOptions = {
  edit: 'edit',
  insertPhotoVideo: 'insertPhotoVideo',
  saveToGallery: 'saveToGallery',
  remove: 'remove',
  logout: 'logout',
  searchForParticipants: 'searchForParticipants',
  deleteLeaveGroup: 'deleteLeaveGroup',
  addToHomeScreen: 'addToHomeScreen',
};

const saveToGallery = lang => ({
  title: 'Save to gallery',
  value: valuesOptions.saveToGallery,
  show: 2,
  icon: {
    name: 'svgs_line_download',
  },
});

const addToHomeScreen = lang => ({
  title: 'Add to home screen',
  value: valuesOptions.addToHomeScreen,
  show: 1,
  icon: {
    name: 'svgs_line_create_shortcut',
  },
});

const deleteLeaveGroup = lang => ({
  title: 'Delete and leave the group',
  value: valuesOptions.deleteLeaveGroup,
  show: 1,
  icon: {
    name: 'svgs_line_logOut',
  },
});

export const headerOptions = lang => [
  {
    id: 1,
    title: 'Edit',
    value: valuesOptions.edit,
    show: 1,
    icon: {
      name: 'svgs_line_pencil',
    },
  },
  {
    id: 2,
    title: 'Insert photo/video',
    value: valuesOptions.insertPhotoVideo,
    show: 1,
    icon: {
      name: 'svgs_line_camera_add',
    },
  },
  {
    ...saveToGallery(lang),
    id: 3,
  },
  {
    id: 4,
    title: 'Remove',
    value: valuesOptions.remove,
    show: 2,
    icon: {
      name: 'svgs_line_trash_bin_alt',
    },
  },
  {
    id: 5,
    title: 'Logout',
    value: valuesOptions.logout,
    show: 3,
    icon: {
      name: 'svgs_line_logOut',
    },
  },
];

export const headerOptionsChat = lang => [
  {
    id: 1,
    title: 'Search for participants',
    value: valuesOptions.searchForParticipants,
    show: 1,
    icon: {
      name: 'svgs_line_search',
    },
  },
  {
    ...deleteLeaveGroup(lang),
    id: 2,
  },
  {
    ...addToHomeScreen(lang),
    id: 3,
  },
  {
    ...saveToGallery(lang),
    id: 4,
  },
];

export const headerOptionsGroup = lang => [
  {
    ...deleteLeaveGroup(lang),
    id: 1,
  },
  {
    ...addToHomeScreen(lang),
    id: 3,
  },
  {
    ...saveToGallery(lang),
    id: 4,
  },
];
