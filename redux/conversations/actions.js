import {updateConversationListAction} from './slice';

export const conversationListActions = data => dispatch => {
  switch (data.mode) {
    case 'deleteMessage':
      return dispatch(
        updateConversationListAction(
          data.conversationsList.map(conversation => {
            if (conversation.conversationId === data.conversationId) {
              return {
                ...conversation,
                Messages: data.messages,
              };
            }
            return conversation;
          }),
        ),
      );
    case 'updateMessageConversation':
      return dispatch(
        updateConversationListAction(
          data.conversationsList.map(conversation => {
            if (conversation.conversationId === data.conversationId) {
              return {
                ...conversation,
                Messages: data.messages,
              };
            }
            return conversation;
          }),
        ),
      );
    default:
      return null;
  }
};
