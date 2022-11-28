import store from '../../redux';
import {PathsName} from '../../navigation/navigationConfig';

export const actionCreateNewChat = (navigation, item) => {
  const conversationsList =
    store.getState().conversationsSlice.conversationsList.data;

  const chat = Object.values(conversationsList).find(
    el => el.conversationName === item.fullName,
  );

  if (chat) {
    return navigation.navigate(PathsName.chat, {
      id: chat.conversationId,
      conversationData: chat,
    });
  }

  return navigation.navigate(PathsName.chat, {
    conversationData: {
      conversationAvatar: item.userAvatar,
      conversationName: item.fullName,
      conversationType: 'dialog',
    },
    opponentId: item.id,
  });
};
