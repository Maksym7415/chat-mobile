import React from 'react';
import {FlatList, Platform, View} from 'react-native';
import styles from './styles';
import ConversationItemComponent from './ConversationItem';

const ConversationItems = ({data = [], usersTyping}) => {
  const [selectedId, setSelectedId] = React.useState(null);
  const dataSortDate =
    [...data]?.sort(
      (a, b) =>
        new Date(b?.Messages[0].sendDate) - new Date(a?.Messages[0].sendDate),
    ) || [];

  return (
    <FlatList
      ItemSeparatorComponent={
        Platform.OS !== 'android' &&
        (({highlighted}) => (
          <View style={[styles.separator, highlighted && {marginLeft: 0}]} />
        ))
      }
      data={dataSortDate}
      renderItem={({item, _, separators}) => {
        return (
          <ConversationItemComponent
            data={item}
            separators={separators}
            usersTyping={usersTyping}
          />
        );
      }}
      keyExtractor={item => item.conversationId}
      extraData={selectedId}
    />
  );
};

export default ConversationItems;
