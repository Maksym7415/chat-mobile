import {StyleSheet, Dimensions} from 'react-native';
const {width} = Dimensions.get('screen');

export const stylesConversationItem = (theme, data) =>
  StyleSheet.create({
    container: {
      backgroundColor: '#ffffff',
    },
    wrapperContacts: {
      paddingHorizontal: 10,
    },
    wrapperContact: {
      marginTop: 10,
      flexDirection: 'row',
    },
    wrapperInfo: {
      paddingLeft: 20,
    },
    fullName: {
      fontSize: 16,
    },
    login: {
      marginTop: 3,
      fontSize: 12,
    },
  });

export const stylesConversationItems = StyleSheet.create({
  divider: {
    width: width - 75,
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
});
