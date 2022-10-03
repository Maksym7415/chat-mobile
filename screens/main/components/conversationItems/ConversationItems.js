import React from 'react';
import {FlatList} from 'react-native';
import {Divider, useTheme} from 'react-native-paper';
import {stylesConversationItems as styles} from './styles';
import ConversationItemComponent from './ConversationItem';

const ConversationItems = ({data = [], usersTyping}) => {
  const theme = useTheme();

  // VARIABLES
  const dataSortDate =
    [...data]?.sort(
      (a, b) =>
        new Date(b?.Messages[0].sendDate) - new Date(a?.Messages[0].sendDate),
    ) || [];

  return (
    <FlatList
      ItemSeparatorComponent={() => (
        <Divider
          style={{...styles.divider, backgroundColor: theme.colors.gray_10}}
        />
      )}
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
    />
  );
};

export default ConversationItems;
