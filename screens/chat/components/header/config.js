import {actionsTypeActionsChat} from '../../../../redux/app/actions';

export const headerSelectedСhatsAmount = lang => [
  {
    id: 1,
    title: 'Edit',
    value: actionsTypeActionsChat.editMessage,
    icon: {
      name: 'svgs_line_pencil',
    },
  },
  {
    id: 2,
    title: 'Copy',
    value: 'copy',
    icon: {
      name: 'svgs_line_copy',
    },
  },
  {
    id: 3,
    title: 'Forward',
    value: 'forward',
    icon: {
      name: 'svgs_line_forward',
    },
  },
  {
    id: 4,
    title: 'Del',
    value: actionsTypeActionsChat.deleteMessages,
    icon: {
      name: 'svgs_line_trash_bin_alt',
    },
  },
];
