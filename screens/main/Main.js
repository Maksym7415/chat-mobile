/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {SafeAreaView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {useTheme, Portal} from 'react-native-paper';
import makeStyles from './styles';
import FabComponent from './components/fab';
import socket from '../../config/socket';
import ConversationItems from './components/conversationItems';
import Header from './components/header';

import {getUserConversationsRequest} from '../../redux/conversations/requests';

navigator.__defineGetter__('userAgent', function () {
  // you have to import rect native first !!
  return 'react-native';
});

let isEmit = false;
let newTimer = {};

const MainScreen = ({}) => {
  // HOOKS
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigation = useNavigation();

  // STYLES
  const styles = makeStyles(theme);

  // SELECTORS
  const {
    conversationsList: {data: conversationsList},
    conversationTypeState: typing,
  } = useSelector(({conversationsSlice}) => conversationsSlice);

  // STATES
  // rework
  const [usersTyping, setUsersTyping] = React.useState({
    0: {
      0: {
        firtsName: '',
        isTyping: false,
        userId: 0,
        conversationId: 0,
      },
    },
  });

  // FUNCTIONS
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

  // USEEFFECTS
  React.useEffect(() => {
    if (navigation?.isFocused()) {
      dispatch(getUserConversationsRequest());
    }
  }, [navigation]);
  socket.on('connection', () => console.log('Connection'));
  React.useEffect(() => {
    if (conversationsList?.length) {
      conversationsList.forEach(chat => {
        // socket.on(`userIdChat${chat.conversationId}`, message => {
        //   dispatch(conversationAddNewMessage(message, chat.conversationId));
        // });
        // socket.on(`typingStateId${chat.conversationId}`, conversation => {
        //   timer(conversation, chat.conversationId);
        // });
      });
    }
  }, [conversationsList, typing]);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ConversationItems data={conversationsList} usersTyping={usersTyping} />
      <Portal>{/* <FabComponent /> */}</Portal>
    </SafeAreaView>
  );
};

export default MainScreen;
