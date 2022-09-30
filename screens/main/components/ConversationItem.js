import React from 'react';
import {useSelector} from 'react-redux';
import {View, TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme, Divider} from 'react-native-paper';
import {stylesConversationItem as makeStyles} from './styles';
import {getCurrentDay} from '../../../helpers';
import languages from '../../../config/translations';
import {REACT_APP_BASE_URL} from '../../../config/constants/url';

import {PathsName} from '../../../navigation/navigationConfig';
import DefaultAvatar from '../../../components/avatar/defaultAvatar';
import UserAvatar from '../../../components/avatar/userAvatar';
import {
  selectedСhatsActions,
  actionsTypeObjectSelected,
} from '../../../redux/app/actions';
import store from '../../../redux/store';
const ConversationdataComponent = ({
  data,
  onSelectConversation,
  usersTyping,
}) => {
  const theme = useTheme();
  const styles = makeStyles(theme);

  //HOOKS
  const navigation = useNavigation();

  // SELECTORS
  const lang = useSelector(({settingSlice}) => settingSlice.lang);
  const {selectedСhats} = useSelector(({appSlice}) => appSlice);
  const {userId} = useSelector(({authSlice}) => authSlice.tokenPayload);

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
            selectedСhatsActions(data, actionsTypeObjectSelected.remove),
          )
        : store.dispatch(
            selectedСhatsActions(data, actionsTypeObjectSelected.add),
          );
    } else {
      navigation.navigate(PathsName.chat, {
        id: data.conversationId,
        conversationData: {
          title: data.conversationName,
          avatar: data.conversationAvatar,
        },
      });
    }
  };

  const someBodyWritting = usersTyping[data.conversationId] && getString(data);

  console.log(data.Messages[0]?.User?.id, userId, 'data.Messages[0]?.User?.id');
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
        store.dispatch(
          selectedСhatsActions(data, actionsTypeObjectSelected.add),
        )
      }>
      <View style={styles.dataView}>
        <View style={styles.avatarView}>
          <UserAvatar
            source={`${REACT_APP_BASE_URL}/${data.conversationAvatar}`}
            isImage={data.conversationAvatar}
            status={'online'}
            name={data.conversationName}
          />
        </View>
        <View style={styles.wrapperBody}>
          <View style={styles.wrapperTop}>
            <View style={styles.wrapperTopLeft}>
              <Text style={styles.title}>{data.conversationName}</Text>
            </View>
            <View style={styles.wrapperTopRight}>
              <View style={styles.wrapperTopRightStatus}></View>
              <Text style={styles.time}>
                {data.Messages[0] === undefined
                  ? ''
                  : getCurrentDay(new Date(data.Messages[0].sendDate), false)}
              </Text>
            </View>
          </View>
          <View style={styles.message}>
            {someBodyWritting ? (
              <Text
                numberOfLines={1}
                style={
                  styles.messageText
                }>{`${languages[lang].generals.isTyping}... (${someBodyWritting})`}</Text>
            ) : (
              <View style={styles.innerMessage}>
                {(() => {
                  const renderTextMessage = message => {
                    return (
                      <Text style={styles.messageText} numberOfLines={1}>
                        {message}
                      </Text>
                    );
                  };
                  if (data.Messages[0] !== undefined) {
                    if (data.Messages[0]?.User?.id === userId) {
                      return (
                        <>
                          <Text
                            style={styles.whoSenderName}
                            numberOfLines={
                              1
                            }>{`${languages[lang].generals.you}`}</Text>
                          {renderTextMessage(data.Messages[0].message)}
                        </>
                      );
                    } else {
                      if (data.conversationType !== 'Dialog') {
                        return renderTextMessage(data.Messages[0].message);
                      } else {
                        return renderTextMessage(
                          `${data.Messages[0]?.User?.firstName}: ${data.Messages[0].message}`,
                        );
                      }
                    }
                  } else {
                    return renderTextMessage(
                      languages[lang].generals.noMessages,
                    );
                  }
                })()}
              </View>
            )}
          </View>
          {/* <Divider style={{...styles.divider}} /> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(ConversationdataComponent);
// src={`${process.env.REACT_APP_BASE_URL}/${data.conversationAvatar}`}
