import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('screen');

export default StyleSheet.create({});

export const stylesConversationItem = theme =>
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
    wrapperTopRightStatus: {
      marginRight: 1,
    },
    time: {
      fontWeight: '400',
      fontSize: 13,
      // color
      color: '#95999A',
    },
    divider: {
      color: theme.colors.yellow,
      backgroundColor: theme.colors.yellow,
      borderRightWidth: width - 74,
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
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
      flex: 1,
      justifyContent: 'center',
    },
    innerMessage: {},
    messageText: {
      fontWeight: '400',
      fontSize: 15,
      // color
      color: '#8D8E90',
    },
  });

export const mainHeader = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  selectedСhatsAmountContainer: {
    backgroundColor: '#ffffff',
  },

  wrapperBurger: {
    marginRight: 30,
  },
  wrapperTitle: {
    flex: 1,
    flexDirection: 'row',
  },
  wrapperSearch: {},
  wrapperClose: {
    marginRight: 40,
  },
  wrpperSelectedAmount: {flex: 1},
  wrapperActions: {
    flexDirection: 'row',
  },
  wrapperAction: {
    marginRight: 10,
  },
  wrapperOptions: {
    marginRight: 0,
  },
});
