/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {SafeAreaView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';
import ConversationItems from './components/ConversationItems';
import {getUserConversationsRequest} from '../../redux/conversations/requests';

const Main = ({navigation}) => {
  // HOOKS
  const dispatch = useDispatch();

  // SELECTORS
  const {data: conversationsList} = useSelector(
    ({conversationsSlice}) => conversationsSlice.conversationsList,
  );

  // STATES
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

  React.useEffect(() => {
    if (navigation.isFocused()) {
      dispatch(getUserConversationsRequest());
    }
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <ConversationItems data={conversationsList} usersTyping={usersTyping} />
    </SafeAreaView>
  );
};

export default Main;
