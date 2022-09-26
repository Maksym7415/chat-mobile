import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {stylesConversationItem as styles} from './styles';
import {getCurrentDay} from '../../../helpers';
import DefaultAvatar from '../../../components/avatar/defaultAvatar';
import {PathsName} from '../../../navigation/navigationConfig';
import {
  selectedСhatsAction,
  selectedСhatsActionType,
} from '../../../redux/app/actions';
import store from '../../../redux/store';

const ConversationdataComponent = ({
  data,
  onSelectConversation,
  usersTyping,
}) => {
  //HOOKS
  const navigation = useNavigation();

  // SELECTORS
  const lang = useSelector(({settingSlice}) => settingSlice.lang);
  const {selectedСhats} = useSelector(({appSlice}) => appSlice);

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

  const handleOnPressChat = () => {
    if (Object.keys(selectedСhats).length) {
      selectedСhats?.[data.conversationId]
        ? store.dispatch(
            selectedСhatsAction(data, selectedСhatsActionType.remove),
          )
        : store.dispatch(
            selectedСhatsAction(data, selectedСhatsActionType.add),
          );
    } else {
      navigation.navigate(PathsName.chat, {
        id: data.conversationId,
      });
    }
  };

  const someBodyWritting = usersTyping[data.conversationId] && getString(data);

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={(() => {
        if (selectedСhats?.[data.conversationId]) {
          return {
            ...styles.container,
            ...styles.selectedChat,
          };
        }
        return styles.container;
      })()}
      onPress={handleOnPressChat}
      onLongPress={() =>
        !Object.keys(selectedСhats).length &&
        store.dispatch(selectedСhatsAction(data, selectedСhatsActionType.add))
      }>
      <View style={styles.dataView}>
        <View style={styles.avatarView}>
          {data.conversationAvatar ? (
            {
              /* <Avatar
              className={styles.avatar}
              src={`${process.env.REACT_APP_BASE_URL}/${data.conversationAvatar}`}
            /> */
            }
          ) : (
            <DefaultAvatar
              name={data.conversationName}
              styles={{
                root: {
                  width: 50,
                  height: 50,
                },
              }}
              fontSize={16}
            />
          )}
        </View>
        <View style={styles.wrapperBody}>
          <View style={styles.titleContainer}>
            <Text style={styles.bold}>{data.conversationName}</Text>
            <Text
              style={{...styles?.dateSender, ...styles?.dateSenderChatlist}}>
              {data.Messages[0] === undefined
                ? ''
                : getCurrentDay(new Date(data.Messages[0].sendDate), false)}
            </Text>
          </View>
          <View style={styles.message}>
            {someBodyWritting ? (
              <Text
                numberOfLines={1}
                style={
                  styles.messageText
                }>{`${lang[lang].generals.isTyping}... (${someBodyWritting})`}</Text>
            ) : (
              <Text style={styles.messageText} numberOfLines={1}>
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
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(ConversationdataComponent);
