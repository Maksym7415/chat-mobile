/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {ScrollView, Text, View, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from 'react-native-paper';
import makeStyles from './styles';
import UserAvatar from '../../../../components/avatar/userAvatar';
import RenderConditionsList from '../../../../components/renderConditionsList';
import {actionCreateNewChat} from '../../../../actions/general/chat';

const SearchMain = () => {
  // HOOKS
  const theme = useTheme();
  const navigation = useNavigation();

  // STYLES
  const styles = makeStyles(theme);

  // SELECTORS
  const {searchContacts, isLoading} = useSelector(
    ({searchSlice}) => searchSlice,
  );

  // RENDERS
  const renderSearchContacts = React.useMemo(() => {
    if (!searchContacts?.response?.length) {
      return <></>;
    }

    // чомусь рендередься два рази
    console.log('render - searchContacts');

    return searchContacts?.response?.map((item, index) => {
      return (
        <TouchableOpacity
          key={item.id}
          activeOpacity={0.5}
          style={styles.wrapperContact}
          onPress={() => {
            actionCreateNewChat(navigation, item);
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
    });
  }, [searchContacts?.response]);

  // RENDER CONDITIONAL
  if (!searchContacts?.response.length || isLoading) {
    return (
      <RenderConditionsList
        list={searchContacts?.response}
        isLoading={isLoading}
      />
    );
  }

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.wrapperContacts}>{renderSearchContacts}</View>
      </ScrollView>
    </>
  );
};

export default SearchMain;
