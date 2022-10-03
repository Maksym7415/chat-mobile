import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('screen');

export const stylesConversationItem = (theme, data) =>
  StyleSheet.create({
    container: {
      height: 80,
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      paddingVertical: 9,
      paddingHorizontal: 10,
    },
    wrapperTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    wrapperTopRight: {
      flexDirection: 'row',
    },
    wrapperTopRightStatus: {
      marginRight: 1,
    },
    time: {
      fontWeight: '400',
      fontSize: 13,
      // color
      color: '#95999A',
    },
    selectedChat: {
      backgroundColor: 'red',
    },
    dataView: {
      flexDirection: 'row',
    },
    wrapperBody: {
      flex: 1,
    },
    title: {
      fontWeight: '500',
      fontSize: 16,
      // color
      color: '#222222',
    },
    avatarView: {
      marginRight: 10,
    },
    whoSenderName: {
      fontWeight: '500',
      fontSize: 14.7778,
      // color
      color: '#434449',
    },

    message: {
      // flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    innerMessage: {
      flex: 1,
    },
    messageText: {
      fontWeight: '400',
      fontSize: 15,
      // color
      color: '#8D8E90',
    },
    numberOfUnreadMessages: {
      marginLeft: 5,
      // color
      backgroundColor:
        data.conversationType !== 'Dialog'
          ? theme.colors.steel_gray_6
          : '#00C73E',
      color: '#ffffff',
    },
  });

export const stylesConversationItems = StyleSheet.create({
  divider: {
    width: width - 75,
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
});
