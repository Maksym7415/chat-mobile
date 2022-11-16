/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {SafeAreaView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from 'react-native-paper';
import Config from 'react-native-config';
import makeStyles from './styles';
import {socket} from '../../config/socket';
import {
  socketOnUserIdChat,
  socketOnTypingStateId,
  // socketOnDeleteMessage,
} from '../../config/socket/actions/socketOn';
import ConversationItems from './components/conversationItems';
import Header from './components/header';
import {getUserConversationsRequest} from '../../redux/conversations/requests';

navigator.__defineGetter__('userAgent', function () {
  // you have to import rect native first !!
  return 'react-native';
});

const MainScreen = ({route}) => {
  // HOOKS
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigation = useNavigation();

  // STYLES
  const styles = makeStyles(theme);

  // SELECTORS
  const {conversationsList, conversationTypeState: typing} = useSelector(
    ({conversationsSlice}) => conversationsSlice,
  );
  const {userId} = useSelector(({authSlice}) => authSlice.tokenPayload);

  // VARIABLES
  const routeParams = route.params;

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
    if (navigation?.isFocused()) {
      dispatch(getUserConversationsRequest());
    }
  }, [navigation]);

  React.useEffect(() => {
    socket.removeAllListeners();

    if (conversationsList?.length) {
      conversationsList.forEach(chat => {
        socketOnUserIdChat(chat);
        socketOnTypingStateId(chat, setUsersTyping);
      });
    }

    socket.on(`userIdNewChat${userId}`, (message, conversationId) => {
      // dispatch(getConversationIdAction(conversationId, 'Chat'));
      // history.push(`${Paths.chat}/${conversationId}`);
    });
  }, [conversationsList, typing]);

  // not working socketOnDeleteMessage
  // React.useEffect(() => {
  //   socketOnDeleteMessage();
  // }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header routeParams={routeParams} />
      <ConversationItems data={conversationsList} usersTyping={usersTyping} />
    </SafeAreaView>
  );
};

export default MainScreen;
