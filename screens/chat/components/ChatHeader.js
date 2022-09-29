import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {chatHeader as styles} from './styles';
import {PathsName} from '../../../navigation/navigationConfig';
import Header from '../../../components/header';
import DefaultAvatar from '../../../components/avatar/defaultAvatar';
import {
  actionsTypeObjectSelected,
  selectedMessagesActions,
} from '../../../redux/app/actions';
import store from '../../../redux/store';

const ChatHeader = ({conversationData}) => {
  //HOOKS
  const navigation = useNavigation();

  // SELECTORS
  const {selectedMessages} = useSelector(({appSlice}) => appSlice);

  // VARIABLES
  const titleSplit = conversationData.title.split(' ');
  const firstName = titleSplit[0];
  const lastName = titleSplit.slice(1, titleSplit.length).join(' ');
  const selectedMessagesAmount = Object.keys(selectedMessages).length;

  return (
    <Header
      styles={
        selectedMessagesAmount
          ? {
              container: styles.selectedMessagesAmountContainer,
            }
          : null
      }>
      <View style={styles.container}>
        {selectedMessagesAmount ? (
          <>
            <View style={styles.wrapperClose}>
              <Text
                onPress={() =>
                  store.dispatch(
                    selectedMessagesActions(
                      null,
                      actionsTypeObjectSelected.clear,
                    ),
                  )
                }>
                Close
              </Text>
            </View>
            <View style={styles.wrpperSelectedAmount}>
              <Text>{selectedMessagesAmount}</Text>
            </View>
            <View style={styles.wrapperActions}>
              {selectedMessagesAmount === 1 ? (
                <View style={styles.wrapperAction}>
                  <Text>Edit</Text>
                </View>
              ) : null}
              <View style={styles.wrapperAction}>
                <Text>Copy</Text>
              </View>
              <View style={styles.wrapperAction}>
                <Text>Forwd</Text>
              </View>
              <View style={{...styles.wrapperAction, ...styles.wrapperOptions}}>
                <Text>Del</Text>
              </View>
            </View>
          </>
        ) : (
          <>
            <Text
              onPress={() => navigation.navigate(PathsName.main)}
              style={styles.back}>
              Back
            </Text>
            <View style={styles.wrapperConversationData}>
              <View style={styles.wrapperAvatar}>
                {conversationData.Avatar ? null : (
                  <DefaultAvatar
                    name={`${firstName} ${lastName}`}
                    styles={{
                      root: {
                        width: 30,
                        height: 30,
                      },
                    }}
                    fontSize={10}
                  />
                )}
              </View>
              <Text>{conversationData.title}</Text>
            </View>
            <View style={styles.wrapperOptions}>
              <Text>Options</Text>
            </View>
          </>
        )}
      </View>
    </Header>
  );
};

export default ChatHeader;
