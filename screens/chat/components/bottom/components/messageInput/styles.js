import {StyleSheet} from 'react-native';
import {theme} from '../../../../../../config/theme';

export default StyleSheet.create({});

export const stylesMessageInput = StyleSheet.create({
  wrapperInput: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 0,
    paddingHorizontal: 0,
    // borderBottomColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    // backgroundColor: '#ffffff',
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
  },
  emojies: {
    paddingLeft: 13,
    backgroundColor: '#ffffff',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    backgroundColor: '#ffffff',
    flex: 1,
    borderRadius: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomEndRadius: 0,
    // paddingVertical: 0,
    // marginVertical: 0,
    // minHeight: 40,
  },
  attachAndTypeMessage: {
    height: '100%',
    backgroundColor: '#ffffff',
    paddingRight: 13,
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrapperInputShadow: {
    shadowColor: '#d1d1d1',
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 14,
  },
});

export const stylesMessage = StyleSheet.create({
  wrapperUp: {
    display: 'flex',
    position: 'relative',
    paddingRight: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  containerShared: {
    paddingLeft: 25,
    justifyContent: 'flex-end',
  },
  containerSender: {
    paddingLeft: 25,
    justifyContent: 'flex-end',
  },
  containerFriend: {
    paddingRight: 25,
    justifyContent: 'flex-end',
  },

  paperSharedMessage: {
    backgroundColor: theme.background_basic_color_dark,
    paddingHorizontal: 10,
    paddingVertical: 10,
    maxWidth: 600,
    borderRadius: 10,
    overflow: 'hidden',
  },
  wrapperTextMessageShared: {
    position: 'relative',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  paperSenderMessage: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 500,
    backgroundColor: theme.background_basic_color_main,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginLeft: 40,
    borderRadius: 10,
    overflow: 'hidden',
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
    backgroundColor:
      'linear-gradient(90deg, rgba(246,120,18,1) 35%, rgba(252,61,23,1) 69%)',
    marginLeft: 40,
    borderRadius: 10,
    overflow: 'hidden',
  },
  wrapperNameData: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    color: '#e8e8e8',
  },
  messageSendTime: {
    color: '#e8e8e8',
  },
  messageText: {
    marginTop: 5,
    color: '#e8e8e8',
    overflow: 'hidden',
    wordBreak: 'keep-all',
  },
  wrapperMessageUserName: {
    color: '#e8e8e8',
    fontWeight: '600',
  },
  selectedMessages: {
    backgroundColor: 'red',
  },
});
