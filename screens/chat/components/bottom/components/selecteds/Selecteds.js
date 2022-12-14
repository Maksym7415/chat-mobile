import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useTheme} from 'react-native-paper';
import {useSelector} from 'react-redux';
import makeStyles from './styles';
import {bottomActionsSelecteds} from '../../../../config';
import SvgMaker from '../../../../../../components/svgMaker';
import {uuid} from '../../../../../../helpers';
import {
  actionsTypeObjectSelected,
  selectedMessagesActions,
  actionsMessagesChat,
  actionsTypeActionsChat,
} from '../../../../../../redux/app/actions';
import store from '../../../../../../redux/store';

function Selecteds() {
  // HOOKS
  const navigation = useNavigation();
  const route = useRoute();
  const theme = useTheme();

  // STYLES
  const styles = makeStyles(theme);

  // SELECTORS
  const {selectedMessages} = useSelector(({appSlice}) => appSlice);
  const lang = useSelector(({settingSlice}) => settingSlice.lang);

  // VARIABLES
  const selectedMessagesAmount = Object.keys(selectedMessages).length;
  const conversationId = route?.params?.id;
  const conversationData = route?.params?.conversationData;

  // FUNCTIONS
  const handleOptions = typeAction => {
    store.dispatch(
      actionsMessagesChat(
        {
          conversationId: conversationId,
          selectedMessages,
        },
        typeAction,
        navigation,
        {
          id: conversationId,
          conversationData,
        },
      ),
    );
    store.dispatch(
      selectedMessagesActions(null, actionsTypeObjectSelected.clear),
    );
  };

  return (
    <View style={styles.wrapper}>
      {bottomActionsSelecteds(lang).map(action => {
        let hide = false;
        if ([actionsTypeActionsChat.replyMessage].includes(action.value)) {
          if (selectedMessagesAmount > 1) {
            hide = true;
          }
        }
        return (
          <Pressable
            key={uuid()}
            style={[styles.wrapperAction, hide ? styles.hide : {}]}
            onPress={() => !hide && handleOptions(action.value)}
            disabled={hide || action.disable}>
            <Text style={styles.title}>{action.title}</Text>
            <SvgMaker name={action.icon.name} />
          </Pressable>
        );
      })}
    </View>
  );
}

export default Selecteds;
