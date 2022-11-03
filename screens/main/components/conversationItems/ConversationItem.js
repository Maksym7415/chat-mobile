import React from 'react';
import {useSelector} from 'react-redux';
import {View, TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme, Badge} from 'react-native-paper';
import {stylesConversationItem as makeStyles} from './styles';
import {getCurrentDay} from '../../../../helpers';
import languages from '../../../../config/translations';

import SvgMaker from '../../../../components/svgMaker';
import {PathsName} from '../../../../navigation/navigationConfig';
import UserAvatar from '../../../../components/avatar/userAvatar';
import {
  selectedСhatsActions,
  actionsTypeObjectSelected,
} from '../../../../redux/app/actions';
import store from '../../../../redux/store';

const ConversationdataComponent = ({data, usersTyping}) => {
  const theme = useTheme();
  const styles = makeStyles(theme, data);

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
        conversationData: data,
      });
    }
  };

  // VARIABLES
  const someBodyWritting = usersTyping[data.conversationId] && getString(data);
  const isConversationDialog = data.conversationType === 'Dialog';

  // test
  const numberOfUnreadMessages = [1, 7].includes(data.conversationId)
    ? data.conversationId
    : null;
  const isMessageUserAuth = data.Messages[0]?.User?.id === userId;
  const isReadMessageUserAuth = [1, 7].includes(data.conversationId)
    ? true
    : false;

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={(() => {
        if (selectedСhats?.[data.conversationId]) {
          return {
            ...styles.container,
            // ...styles.selectedChat,
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
            source={data.conversationAvatar}
            status={
              !isConversationDialog
                ? 'online'
                : selectedСhats?.[data.conversationId]
                ? 'selected'
                : ''
            }
            name={data.conversationName}
            isSelected={selectedСhats?.[data.conversationId]}
          />
        </View>
        <View style={styles.wrapperBody}>
          <View style={styles.wrapperTop}>
            <View style={styles.wrapperTopLeft}>
              <Text style={styles.title}>{data.conversationName}</Text>
            </View>
            <View style={styles.wrapperTopRight}>
              <View style={styles.wrapperTopRightStatus}>
                {isMessageUserAuth ? (
                  <>
                    {isReadMessageUserAuth ? (
                      <SvgMaker
                        name="svgs_line_read"
                        width={20}
                        height={19}
                        strokeFill={'#48A938'}
                      />
                    ) : (
                      <SvgMaker
                        name="svgs_line_check"
                        width={20}
                        height={19}
                        strokeFill={'#48A938'}
                      />
                    )}
                  </>
                ) : null}
              </View>
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
                    if (isMessageUserAuth) {
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
                      if (!isConversationDialog) {
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
            <Badge
              visible={numberOfUnreadMessages}
              style={styles.numberOfUnreadMessages}
              size={24}>
              {numberOfUnreadMessages}
            </Badge>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(ConversationdataComponent);
