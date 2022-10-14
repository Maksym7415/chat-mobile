import store from '../../../redux';
import {socket} from '../index';

import {conversationListActions} from '../../../redux/conversations/actions';
import {setAllMessagesAction} from '../../../redux/app/slice';

// User Id Chat
export const socketOnUserIdChat = chat => {
  return socket.on(`userIdChat${chat.conversationId}`, message => {
    const allMessages = store.getState().appSlice.allMessages;
    const conversationsList =
      store.getState().conversationsSlice.conversationsList;

    const conversationFindStore = conversationsList.find(
      item => item.conversationId == chat.conversationId,
    );

    const updateMessageConversation = () =>
      store.dispatch(
        conversationListActions({
          mode: 'updateMessageConversation',
          conversationId: chat.conversationId,
          messages: message?.isEdit
            ? [
                {
                  ...conversationFindStore.Messages[0],
                  message: message.message,
                  isEdit: true,
                },
              ]
            : [message],
          conversationsList,
        }),
      );

    const chatAllMessages = allMessages?.[chat.conversationId];

    if (chatAllMessages) {
      const prevMessages = chatAllMessages || null;
      let updateMessages = [...prevMessages];

      if (!message?.isEdit) {
        updateMessages.push(message);
      } else {
        updateMessages = updateMessages.map(item => {
          if (item.id == message.id) {
            return {...item, message: message.message, isEdit: true};
          }
          return item;
        });
      }

      store.dispatch(
        setAllMessagesAction({[chat.conversationId]: updateMessages}),
      );
    }

    if (chat.Messages?.[0]?.id == message?.id) {
      updateMessageConversation();
    } else {
      !message?.isEdit && updateMessageConversation();
    }
  });
};

// Typing State Id
let isEmit = false;
let newTimer = {};
export const socketOnTypingStateId = (chat, setUsersTyping) => {
  const currentUserTyping = (user, conversationId) => {
    if (!isEmit) {
      isEmit = true;
      setUsersTyping(prev => {
        const conversation = prev[conversationId];
        return {
          ...prev,
          [conversationId]: {
            ...conversation,
            [user.userId]: {...user, isTyping: true},
          },
        };
      });
      newTimer[conversationId] = {...newTimer[conversationId]};
      newTimer[conversationId][user.userId] = setTimeout(
        () =>
          setUsersTyping(prev => {
            const conversation = prev[conversationId];
            isEmit = false;
            return {
              ...prev,
              [conversationId]: {
                ...conversation,
                [user.userId]: {...user, isTyping: false},
              },
            };
          }),
        3000,
      );
    } else {
      clearTimeout(newTimer[conversationId][user.userId]);
      setUsersTyping(prev => {
        const conversation = prev[conversationId];
        return {
          ...prev,
          [conversationId]: {
            ...conversation,
            [user.userId]: {...user, isTyping: true},
          },
        };
      });
      newTimer[conversationId] = {...newTimer[conversationId]};
      newTimer[conversationId][user.userId] = setTimeout(
        () =>
          setUsersTyping(prev => {
            const conversation = prev[conversationId];
            isEmit = false;
            return {
              ...prev,
              [conversationId]: {
                ...conversation,
                [user.userId]: {...user, isTyping: false},
              },
            };
          }),
        3000,
      );
    }
  };

  const timer = (user, conversationId) => {
    if (conversationId in newTimer) {
      currentUserTyping(user, conversationId);
    } else {
      isEmit = false;
      currentUserTyping(user, conversationId);
    }
  };

  return socket.on(`typingStateId${chat.conversationId}`, conversation => {
    timer(conversation, chat.conversationId);
  });
};

// Delete Message
export const socketOnDeleteMessage = () => {
  const getRemoveMessages = (conversationId, messageId) => {
    const allMessages = store.getState().appSlice.allMessages;
    store.dispatch(
      setAllMessagesAction({
        [conversationId]: allMessages[conversationId.toString()]?.filter(
          message =>
            ![messageId?.toString()]?.includes(message?.id?.toString()),
        ),
      }),
    );
  };

  return socket.on('deleteMessage', ({conversationId, messageId}) => {
    getRemoveMessages(conversationId, messageId);
  });
};
