import {StyleSheet} from 'react-native';
import {theme} from '../../../config/theme';

export default StyleSheet.create({});

export const stylesConversationItem = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: theme.background_basic_color_1,
    borderColor: theme.item_border_color,
    borderBottomWidth: 1,
  },
  listWrap: {
    flex: 1,
  },
  itemView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  conversationUserActive: {
    textTransform: 'capitalize',
    fontSize: theme.font_size_small,
    fontWeight: theme.font_medium,
  },
  conversationUserNotActive: {
    textTransform: 'capitalize',
    fontSize: theme.font_size_small,
    fontWeight: theme.font_medium,
    color: theme.text_basic_color,
  },
  avatarView: {
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  userActive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'green',
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: 2,
    right: 2,
  },
  timeStamp: {
    color: theme.text_hint_color,
    fontSize: theme.font_size_extra_extra_small,
    fontWeight: theme.font_regular,
  },
  badgeView: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingTop: 4,
  },
  badge: {
    width: 16,
    height: 16,
    borderRadius: 16,
    backgroundColor: theme.color_success_default,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeCount: {
    color: theme.text_control_color,
    fontSize: theme.font_size_extra_extra_small,
    fontWeight: theme.font_medium,
  },
  typingText: {
    color: theme.color_success_default,
    fontSize: theme.font_size_small,
    paddingTop: 4,
  },
  nameView: {
    paddingBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  conversationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  labelView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  conversationId: {
    color: theme.color_secondary_500,
    fontSize: theme.font_size_extra_small,
    fontWeight: theme.font_medium,
    paddingRight: 4,
  },
  timestampContainer: {
    marginTop: 2,
    justifyContent: 'flex-end',
    flexDirection: 'column',
    position: 'absolute',
    right: 0,
  },
});
