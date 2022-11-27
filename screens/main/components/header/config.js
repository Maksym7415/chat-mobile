import {actionsTypeActionsConversation} from '../../../../redux/app/actions';

export const headerActionIcons = lang => [
  // {
  //   id: 1,
  //   value: 'mute',
  //   icon: {
  //     name: 'svgs_line_mute',
  //   },
  // },
  // {
  //   id: 2,
  //   title: 'Add to folder',
  //   value: 'arhiveConversations',
  //   icon: {
  //     name: 'svgs_line_archive',
  //   },
  // },
  {
    id: 3,
    value: actionsTypeActionsConversation.deleteChat,
    icon: {
      name: 'svgs_line_trash_bin_alt',
    },
  },
];

export const headerSelectedСhatsAmountDotsOptions = lang => [
  {
    id: 1,
    title: 'Attach',
    value: 'attach',
    icon: {
      name: 'svgs_line_pin',
    },
  },
  {
    id: 2,
    title: 'Add to folder',
    value: 'addToFolder',
    icon: {
      name: 'svgs_line_add_to_folder',
    },
  },
  {
    id: 3,
    title: 'Read',
    value: 'read',
    icon: {
      name: 'svgs_line_clear',
    },
  },
  {
    id: 4,
    title: 'Remove from cache',
    value: actionsTypeActionsConversation.clearChat,
    icon: {
      name: 'svgs_line_clear',
    },
  },
];
