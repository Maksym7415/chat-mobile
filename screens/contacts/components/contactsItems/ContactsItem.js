import React from 'react';
// import {useSelector} from 'react-redux';
import {View, TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// import {useNavigation} from '@react-navigation/native';
import {useTheme} from 'react-native-paper';
import {stylesConversationItem as makeStyles} from './styles';
import UserAvatar from '../../../../components/avatar/userAvatar';
import {createNewChat} from '../../../../actions/general/chat';

const ConversationdataComponent = ({item, usersTyping}) => {
  //HOOKS
  const theme = useTheme();
  const navigation = useNavigation();

  // STYLES
  const styles = makeStyles(theme, item);

  return (
    <TouchableOpacity
      key={item.id}
      activeOpacity={0.5}
      style={styles.wrapperContact}
      onPress={() => {
        createNewChat(navigation, item);
      }}>
      <View style={styles.avatarView}>
        <UserAvatar
          source={item.userAvatar}
          status={[1, 3].includes(item.id) ? 'online' : ''}
          name={item.fullName}
        />
      </View>
      <View style={styles.wrapperInfo}>
        <Text style={styles.fullName}>{item.fullName}</Text>
        <Text style={styles.login}>{item.login}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(ConversationdataComponent);
