import {StyleSheet} from 'react-native';

export default theme =>
  StyleSheet.create({
    wrapper: {
      paddingVertical: 0,
      paddingHorizontal: 0,
      marginHorizontal: 0,
    },
    wrapperUp: {
      display: 'flex',
      position: 'relative',
      paddingRight: 10,
      paddingVertical: 5,
      paddingHorizontal: 10,
    },
    containerShared: {
      // paddingLeft: 25,
      justifyContent: 'flex-end',
    },
    containerSender: {
      // paddingLeft: 25,
      justifyContent: 'flex-end',
    },
    containerFriend: {
      // paddingRight: 25,
      justifyContent: 'flex-end',
    },

    paperSharedMessage: {
      backgroundColor: theme.colors.gray_2,
      paddingHorizontal: 10,
      paddingVertical: 10,
      maxWidth: 600,
      borderRadius: 10,
      alignSelf: 'flex-start',
      overflow: 'hidden',
    },
    wrapperTextMessageShared: {
      position: 'relative',
      paddingHorizontal: 10,
      marginVertical: 10,
      flexDirection: 'row',
    },
    paperSenderMessage: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      maxWidth: 500,
      backgroundColor: theme.colors.green_light1,
      paddingHorizontal: 15,
      paddingVertical: 15,
      marginLeft: 40,
      borderRadius: 10,
      overflow: 'hidden',
      alignSelf: 'flex-end',
    },
    edited: {
      textAlign: 'right',
      // padding: 0,
      // margin: 0,
      fontSize: 9,
    },
    paperFriendMessage: {
      position: 'relative',
      paddingHorizontal: 15,
      paddingVertical: 15,
      display: 'flex',
      flexDirection: 'column',
      maxWidth: 500,
      alignSelf: 'flex-start',
      backgroundColor: theme.colors.white1,
      borderRadius: 10,
      overflow: 'hidden',
    },
    wrapperName: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    wrapperDate: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    name: {
      color: '#000000',
    },
    messageSendTime: {
      color: '#000000',
    },
    messageText: {
      marginTop: 5,
      color: '#000000',
      overflow: 'hidden',
      wordBreak: 'keep-all',
    },
    wrapperMessageUserName: {
      color: '#000000',
      fontWeight: '600',
    },
    selectedMessages: {
      backgroundColor: 'rgba(132, 202, 254, 0.2)',
    },
    divider: {
      position: 'absolute',
      left: 0,
      top: 0,
      backgroundColor: 'green',
      width: 3,
      height: '100%',
    },
  });
