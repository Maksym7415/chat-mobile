import React from 'react';
import styles from './styles';
import {FlatList, Platform, View} from 'react-native';
import ConversationItemComponent from './ConversationItem';

const ConversationItems = ({data, usersTyping}) => {
  const [selectedId, setSelectedId] = React.useState(null);

  return (
    <FlatList
      ItemSeparatorComponent={
        Platform.OS !== 'android' &&
        (({highlighted}) => (
          <View style={[styles.separator, highlighted && {marginLeft: 0}]} />
        ))
      }
      data={data}
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
