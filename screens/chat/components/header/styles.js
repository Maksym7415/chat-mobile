import {StyleSheet} from 'react-native';

export default theme =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    containerTop: {
      alignItems: 'center',
    },
    back: {
      marginRight: 30,
    },
    wrapperConversationData: {
      flex: 1,
      flexDirection: 'row',

      marginLeft: 30,
    },
    wrapperAvatar: {
      marginRight: 10,
    },
    title: {
      fontWeight: '700',
      fontSize: 17,
      // color
      color: '#ffffff',
    },
    subtitle: {
      fontWeight: '400',
      fontSize: 14,
      // color
      color: '#D2E9FB',
    },
    selectedMessagesAmountContainer: {
      backgroundColor: '#ffffff',
    },
    wrapperClose: {
      marginRight: 20,
    },
    wrpperSelectedAmount: {flex: 1},
    wrapperActions: {
      flexDirection: 'row',
    },
    wrapperAction: {
      marginLeft: 20,
    },
    wrapperOptions: {
      marginRight: 0,
    },
  });
