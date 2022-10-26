import {actionsTypeActionsChat} from '../../../../redux/app/actions';

// show:
// 1 - general actionsж
// 2 - when a photo is open
// 3 - when no photo is open

export const headerOptions = lang => [
  {
    id: 1,
    title: 'Edit',
    value: 'edit',
    show: 1,
    icon: {
      name: 'svgs_line_pencil',
    },
  },
  {
    id: 2,
    title: 'Insert photo/video',
    value: 'insertPhotoVideo',
    show: 1,
    icon: {
      name: 'svgs_line_camera_add',
    },
  },
  {
    id: 3,
    title: 'Save to gallery',
    value: 'saveToGallery',
    show: 2,
    icon: {
      name: 'svgs_line_download',
    },
  },
  {
    id: 4,
    title: 'Remove',
    value: 'remove',
    show: 2,
    icon: {
      name: 'svgs_line_trash_bin_alt',
    },
  },
  {
    id: 5,
    title: 'Logout',
    value: 'logout',
    show: 3,
    icon: {
      name: 'svgs_line_logOut',
    },
  },
];
