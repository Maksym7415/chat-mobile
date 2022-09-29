/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {SafeAreaView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';
import ConversationItems from './components/ConversationItems';
import MainHeader from './components/MainHeader';

import {getUserConversationsRequest} from '../../redux/conversations/requests';

navigator.__defineGetter__('userAgent', function () {
  // you have to import rect native first !!
  return 'react-native';
});
import SocketIOClient from 'socket.io-client/dist/socket.io.js';

const Main = ({navigation}) => {
  // HOOKS
  const dispatch = useDispatch();

  // SELECTORS
  const {data: conversationsList} = useSelector(
    ({conversationsSlice}) => conversationsSlice.conversationsList,
  );

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

  // USEEFFECTS
  React.useEffect(() => {
    if (navigation.isFocused()) {
      dispatch(getUserConversationsRequest());
    }
  }, [navigation]);

  // React.useEffect(() => {
  //   const socket = SocketIOClient('wss://localhost:5050/', {
  //     jsonp: false,
  //   });
  //   socket.on('connect', () => {
  //     console.log('connected');
  //     socket.emit('hello', 'world');
  //   });

  //   socket.on('connect_error', err => {
  //     console.log(err instanceof Error);
  //     console.log(err.message);
  //   });
  // }, []);

  return (
    <SafeAreaView style={styles.container}>
      <MainHeader />
      <ConversationItems data={conversationsList} usersTyping={usersTyping} />
    </SafeAreaView>
  );
};

export default Main;
