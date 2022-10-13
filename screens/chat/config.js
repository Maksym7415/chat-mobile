import languages from '../../config/translations';

const forwardAction = lang => ({
  id: 10,
  title: 'Forward',
  value: 'forward',
  icon: {
    name: 'svgs_line_forward',
  },
});

const replyAction = lang => ({
  id: 10,
  title: 'Reply',
  value: 'reply',
  icon: {
    name: 'svgs_line_reply',
  },
});

export const headerSelectedСhatsAmount = lang => [
  {
    id: 1,
    title: 'Edit',
    value: 'edit',
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
  forwardAction(lang),
  {
    id: 4,
    title: 'Del',
    value: 'Del',
    icon: {
      name: 'svgs_line_trash_bin_alt',
    },
  },
];

export const bottomActionsSelecteds = lang => [
  replyAction(lang),
  forwardAction(lang),
];
