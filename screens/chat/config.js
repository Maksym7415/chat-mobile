import {actionsTypeActionsChat} from '../../redux/app/actions';

const forwardAction = lang => ({
  id: 10,
  title: 'Forward',
  value: actionsTypeActionsChat.forwardMessage,
  icon: {
    name: 'svgs_line_forward',
  },
});

const replyAction = lang => ({
  id: 10,
  title: 'Reply',
  value: actionsTypeActionsChat.replyMessage,
  icon: {
    name: 'svgs_line_reply',
  },
  disable: true,
});

export const bottomActionsSelecteds = lang => [
  replyAction(lang),
  forwardAction(lang),
];
