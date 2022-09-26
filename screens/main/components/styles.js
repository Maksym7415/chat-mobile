import {StyleSheet} from 'react-native';
import {theme} from '../../../config/theme';

export default StyleSheet.create({});

export const stylesConversationItem = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 12,
    paddingBottom: 12,
    borderColor: theme.color_border_main,
    borderBottomWidth: 1,
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
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  avatarView: {
    marginRight: 10,
  },
  message: {width: '100%', paddingTop: 10},
  messageText: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});
