import {withStyles} from '@ui-kitten/components';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, TouchableOpacity, Text} from 'react-native';
import PropTypes from 'prop-types';
import {stylesConversationdata as styles} from './styles';
import {getCurrentDay} from '../../../helpers';
// import InboxName from 'src/screens/ChatScreen/components/InboxName';

const propTypes = {
  eva: PropTypes.shape({
    style: PropTypes.object,
    theme: PropTypes.object,
  }).isRequired,
  name: PropTypes.string,
  onSelectConversation: PropTypes.func,
  inboxes: PropTypes.array.isRequired,
  conversationTypingUsers: PropTypes.shape({}),
  data: PropTypes.shape({
    id: PropTypes.number,
    meta: PropTypes.shape({
      sender: PropTypes.shape({
        name: PropTypes.string,
        thumbnail: PropTypes.string,
        availability_status: PropTypes.string,
      }),
      channel: PropTypes.string,
    }),
    messages: PropTypes.array.isRequired,
    inbox_id: PropTypes.number,
  }).isRequired,
};

const ConversationdataComponent = ({
  data,
  onSelectConversation,
  usersTyping,
}) => {
  // SELECTORS
  const lang = useSelector(({commonReducer}) => commonReducer.lang);

  const userId = 0;

  // FUNCTIONS
  const getString = element => {
    const arr = Object.values(usersTyping[element.conversationId]).filter(
      el => el.isTyping && el.userId !== userId,
    );
    let str = '';
    arr.forEach(el => (str += el.firstName));
    return str;
  };

  const someBodyWritting = usersTyping[data.conversationId] && getString(data);

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.container}
      onPress={() => onSelectConversation(data)}>
      <View style={styles.dataView}>
        <View style={styles.avatarView}>
          {/* <UserAvatar
            thumbnail={thumbnail}
            userName={name}
            size={40}
            fontSize={16}
            defaultBGColor={theme['color-primary-default']}
            channel={channel}
            isActive={isActive}
            availabilityStatus={availabilityStatus}
          /> */}
        </View>
        <View style="flex chat__chats-data-message-container relative">
          <View style="chat__title-container">
            <Text style={styles.bold} variant="subtitle1">
              {data.conversationName}
            </Text>
            <Text
              style={{...styles?.dateSender, ...styles?.dateSenderChatlist}}
              variant="subtitle1">
              {data.Messages[0] === undefined
                ? ''
                : getCurrentDay(new Date(data.Messages[0].sendDate), false)}
            </Text>
          </View>
          {someBodyWritting ? (
            <Text
              variant="caption"
              style={
                styles.messageText
              }>{`${lang[lang].generals.isTyping}... (${someBodyWritting})`}</Text>
          ) : (
            <Text variant="caption" style={styles.messageText}>
              {data.Messages[0] === undefined
                ? lang[lang].generals.noMessages
                : data.Messages[0]?.User?.id === userId
                ? `${lang[lang].generals.you}: ${data.Messages[0].message}`
                : data.conversationType !== 'Dialog'
                ? data.Messages[0].message
                : `${data.Messages[0]?.User?.firstName}: ${data.Messages[0].message}`}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(ConversationdataComponent);
