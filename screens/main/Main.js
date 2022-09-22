import React from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import ConversationItems from './components/ConversationItems';

const Main = () => {
  console.log('hello');

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

  return (
    <SafeAreaView>
      <ScrollView>
        <Text>home</Text>
        {/* <ConversationItems data={[]} usersTyping={usersTyping} /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Main;
