import store from '../../../redux';
import {socket} from '../index';
import {conversationListActions} from '../../../redux/conversations/actions';
import {getUserConversationsRequest} from '../../../redux/conversations/requests';
import {PathsName} from '../../../navigation/navigationConfig';
import {setAllMessagesAction} from '../../../redux/app/slice';

// User Id Chat
export const socketOnUserIdChat = chat => {
  return socket.on(`userIdChat${chat.conversationId}`, message => {
    const allMessages = store.getState().appSlice.allMessages;
    const conversationsList =
      store.getState().conversationsSlice.conversationsList.data;

    const conversationFindStore = conversationsList?.[chat.conversationId];
    const updateMessageConversation = () => {
      store.dispatch(
        conversationListActions({
          mode: 'updateMessageConversation',
          conversationId: chat.conversationId,
          messages: message?.isEdit
            ? [
                {
                  ...conversationFindStore?.Messages?.[0],
                  message: message.message,
                  isEdit: true,
                },
              ]
            : [message],
          conversationsList,
        }),
      );
    };
    //
    let findComponentDate = null;
    if (allMessages[chat.conversationId]) {
      const reverseAllMessages = [
        ...allMessages[chat.conversationId],
      ].reverse();
      for (
        let i = 0;
        !findComponentDate && i < reverseAllMessages.length;
        i++
      ) {
        if (reverseAllMessages[i].component) {
          findComponentDate = reverseAllMessages[i];
        }
      }
    }

    let componentDateNew = null;
    if (
      message.sendDate.slice(0, 10) !==
      findComponentDate?.sendDate?.slice(0, 10)
    )
      componentDateNew = {component: 'div', sendDate: message.sendDate};

    //
    const chatAllMessages = allMessages?.[chat.conversationId];
    if (chatAllMessages) {
      const prevMessages = chatAllMessages || null;
      let updateMessages = [...prevMessages];

      if (!message?.isEdit) {
        componentDateNew && updateMessages.push(componentDateNew);
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

export const socketOnDeleteMessage = () => {
  const getRemoveMessages = (conversationId, messageId) => {
    const allMessages = store.getState().appSlice.allMessages;
    const conversationsList =
      store.getState().conversationsSlice.conversationsList.data;
    const conversationFindStore = conversationsList?.[conversationId];

    console.log(messageId, 'messageId!!');
    console.log(conversationFindStore, 'conversationFindStore');
    console.log(allMessages, 'allMessages');

    store.dispatch(
      setAllMessagesAction({
        [conversationId]: allMessages[conversationId.toString()]?.filter(
          message =>
            ![messageId?.toString()]?.includes(message?.id?.toString()),
        ),
      }),
    );
    if (messageId === conversationFindStore?.Messages?.[0].id) {
      let findLastMessage = null;
      if (allMessages[conversationId]) {
        const reverseAllMessages = [...allMessages[conversationId]].reverse();
        for (
          let i = 0;
          !findLastMessage && i < reverseAllMessages.length;
          i++
        ) {
          if (reverseAllMessages[i].User) {
            findLastMessage = reverseAllMessages[i];
          }
        }
      }

      store.dispatch(
        conversationListActions({
          mode: 'updateMessageConversation',
          conversationId: conversationId,
          messages: [findLastMessage],
          conversationsList,
        }),
      );
    }
  };

  return socket.on('deleteMessage', ({conversationId, messageId}) => {
    console.log(conversationId, messageId, 'eeee');
    getRemoveMessages(conversationId, messageId);
  });
};

export const socketOnUserIdNewChat = (userId, navigation) => {
  return socket.on(`userIdNewChat${userId}`, (message, conversationId) => {
    store.dispatch(
      getUserConversationsRequest({
        cb: data => {
          navigation.navigate(PathsName.chat, {
            id: conversationId,
            conversationData: data[conversationId],
          });
        },
      }),
    );
  });
};
