import {PathsName} from '../../navigation/navigationConfig';

export const settingsList = lang => [
  {
    id: 1,
    title: 'Notifications and Sounds',
    path: PathsName.main,
    icon: {
      name: 'svgs_line_bell',
    },
    disabled: true,
  },
  {
    id: 2,
    title: 'Privacy and Security',
    path: PathsName.main,
    icon: {
      name: 'svgs_line_lock',
    },
    disabled: true,
  },
  {
    id: 3,
    title: 'Data and Storage',
    path: PathsName.main,
    icon: {
      name: 'svgs_line_data',
    },
    disabled: true,
  },
  {
    id: 4,
    title: 'Chat Settings',
    path: PathsName.main,
    icon: {
      name: 'svgs_line_chat',
    },
    disabled: true,
  },
  {
    id: 5,
    title: 'Folders',
    path: PathsName.main,
    icon: {
      name: 'svgs_line_folder',
    },
    disabled: true,
  },
  {
    id: 6,
    title: 'Devices',
    path: PathsName.main,
    icon: {
      name: 'svgs_line_devices',
    },
    disabled: true,
  },
  {
    id: 7,
    title: 'Language',
    path: PathsName.main,
    icon: {
      name: 'svgs_line_language',
    },
    disabled: true,
  },
];

export const helpsList = lang => [
  {
    id: 1,
    title: 'Ask a Question',
    value: 'AskAQuestion',
    icon: {
      name: 'svgs_line_chat',
    },
    disabled: true,
  },
  {
    id: 2,
    title: 'Telegram FAQ',
    value: 'telegramFAQ ',
    icon: {
      name: 'svgs_line_faq',
    },
    disabled: true,
  },
  {
    id: 3,
    title: 'Privacy Policy ',
    value: 'privacyPolicy  ',
    icon: {
      name: 'svgs_line_sheild',
    },
    disabled: true,
  },
];

export const handleInsertPhotoVideo = refBottomSheet => {
  refBottomSheet.current?.snapToIndex(0);
};
