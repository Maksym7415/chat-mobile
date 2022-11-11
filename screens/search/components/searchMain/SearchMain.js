import React from 'react';
import {ScrollView, Text, View, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from 'react-native-paper';
import makeStyles from './styles';
import UserAvatar from '../../../../components/avatar/userAvatar';
import Loader from '../../../../components/loader';
import {PathsName} from '../../../../navigation/navigationConfig';
import {getOpponentsIdWhereConversTypeDialogRequest} from '../../../../redux/search/requests';

const SearchMain = () => {
  // HOOKS
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // STYLES
  const styles = makeStyles(theme);

  // SELECTORS
  const {searchContacts, isLoading} = useSelector(
    ({searchSlice}) => searchSlice,
  );
  const {conversationsList} = useSelector(
    ({conversationsSlice}) => conversationsSlice,
  );
  const {userId} = useSelector(({authSlice}) => authSlice.tokenPayload);

  // FUNCTIONS
  const createNewChat = (id, fullName) => {
    dispatch(
      getOpponentsIdWhereConversTypeDialogRequest({
        params: {userId, opponentId: id},
      }),
    );
    const chat = conversationsList.find(el => el.conversationName === fullName);
    if (chat) {
      return navigation.navigate(PathsName.chat, {
        id: chat.conversationId,
        conversationData: chat,
      });
    }
    console.log('не знайдено');
    // props.history.push(Paths.newchat);
  };

  // RENDER CONDITIONS
  if (isLoading) {
    return (
      <View style={styles.boxCenter}>
        <Loader color={'#517DA2'} size={50} />
      </View>
    );
  }

  if (!searchContacts?.response.length) {
    return (
      <View style={styles.boxCenter}>
        <Text style={styles.noResults}>No results</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.wrapperContacts}>
        {searchContacts?.response?.map((item, index) => {
          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.5}
              style={styles.wrapperContact}
              onPress={() => {
                createNewChat(item.id, item.fullName);
              }}>
              <View style={styles.avatarView}>
                <UserAvatar
                  source={item.userAvatar}
                  status={[1, 3].includes(index) ? 'online' : ''}
                  name={item.fullName}
                />
              </View>
              <View style={styles.wrapperInfo}>
                <Text style={styles.fullName}>{item.fullName}</Text>
                <Text style={styles.login}>{item.login}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default SearchMain;
