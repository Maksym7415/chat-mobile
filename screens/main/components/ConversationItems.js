import React from 'react';
import styles from './styles';
import {FlatList, Platform, View, TouchableHighlight, Text} from 'react-native';
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
      renderItem={({item, _, separators}) => (
        <ConversationItemComponent
          key={item.id}
          data={item}
          separators={separators}
          usersTyping={usersTyping}
        />
      )}
      keyExtractor={item => item.id}
      extraData={selectedId}
    />
  );
};

export default ConversationItems;
