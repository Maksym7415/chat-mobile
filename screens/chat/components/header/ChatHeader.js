import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Text, View, Pressable} from 'react-native';
import {useSelector} from 'react-redux';
import {Menu, useTheme} from 'react-native-paper';
import makeStyles from './styles';
import {headerSelectedСhatsAmount} from './config';
import {PathsName} from '../../../../navigation/navigationConfig';
import UserAvatar from '../../../../components/avatar/userAvatar';
import SvgMaker from '../../../../components/svgMaker';
import Header from '../../../../components/header';
import MenuPaper from '../../../../components/menu/menuPaper';
import {
  actionsTypeObjectSelected,
  selectedMessagesActions,
  actionsMessagesChat,
  actionsTypeActionsChat,
} from '../../../../redux/app/actions';
import store from '../../../../redux/store';
import {uuid} from '../../../../helpers';

const ChatHeader = ({conversationData, conversationId}) => {
  //HOOKS
  const navigation = useNavigation();
  const theme = useTheme();

  // STYLES
  const styles = makeStyles(theme);

  // SELECTORS
  const {selectedMessages} = useSelector(({appSlice}) => appSlice);
  const lang = useSelector(({settingSlice}) => settingSlice.lang);

  // STATES
  const [visibleOptions, setVisibleOptions] = React.useState(false);

  // FUNCTIONS
  const openOptions = () => setVisibleOptions(true);
  const closeOptions = () => setVisibleOptions(false);
  const handleOptions = typeAction => {
    store.dispatch(
      actionsMessagesChat(
        {
          conversationId: conversationId,
          selectedMessages,
        },
        typeAction,
      ),
    );
    closeOptions();
    store.dispatch(
      selectedMessagesActions(null, actionsTypeObjectSelected.clear),
    );
  };

  // VARIABLES
  const selectedMessagesAmount = Object.keys(selectedMessages).length;

  return (
    <Header
      styles={
        selectedMessagesAmount
          ? {
              container: styles.selectedMessagesAmountContainer,
            }
          : {
              container: styles.container,
              top: styles.containerTop,
            }
      }
      renderTopLeftComponent={() =>
        selectedMessagesAmount ? (
          <Pressable
            style={styles.wrapperClose}
            onPress={() => {
              store.dispatch(
                selectedMessagesActions(null, actionsTypeObjectSelected.clear),
              );
            }}>
            <SvgMaker name="svgs_line_bot_close" />
          </Pressable>
        ) : (
          <Pressable
            onPress={() => {
              navigation.navigate(PathsName.main);
            }}>
            <SvgMaker name="svgs_filled_back_arrow" strokeFill={'#ffffff'} />
          </Pressable>
        )
      }
      renderTopCenterComponent={() =>
        selectedMessagesAmount ? (
          <View style={styles.wrpperSelectedAmount}>
            <Text>{selectedMessagesAmount}</Text>
          </View>
        ) : (
          <View style={styles.wrapperConversationData}>
            <View style={styles.wrapperAvatar}>
              <UserAvatar
                source={conversationData.avatar}
                name={conversationData.title}
                sizeAvatar={38}
              />
            </View>
            <View style={styles.wrapperAvatar}>
              <Text style={styles.title}>{conversationData.title}</Text>
              <Text style={styles.subtitle}>{'Online'}</Text>
            </View>
          </View>
        )
      }
      renderTopRightComponent={() =>
        selectedMessagesAmount ? (
          <View style={styles.wrapperActions}>
            {headerSelectedСhatsAmount(lang).map(action => {
              return selectedMessagesAmount > 1 &&
                ['edit'].includes(action.value) ? null : (
                <Pressable
                  key={uuid()}
                  style={styles.wrapperAction}
                  onPress={() => handleOptions(action.value)}>
                  <SvgMaker name={action.icon.name} />
                </Pressable>
              );
            })}
          </View>
        ) : (
          <>
            <Pressable onPress={openOptions}>
              <SvgMaker name="svgs_filled_phone" strokeFill={'#ffffff'} />
            </Pressable>
            <View style={{...styles.wrapperAction, ...styles.wrapperOptions}}>
              <MenuPaper
                anchor={{strokeFill: '#ffffff'}}
                setShowMenu={setVisibleOptions}
                showMenu={visibleOptions}>
                <Menu.Item icon="redo" onPress={() => {}} title="Redo" />
                <Menu.Item icon="undo" onPress={() => {}} title="Undo" />
                <Menu.Item
                  icon="content-cut"
                  onPress={() => {}}
                  title="Cut"
                  disabled
                />
                <Menu.Item
                  icon="content-copy"
                  onPress={() => {}}
                  title="Copy"
                  disabled
                />
                <Menu.Item
                  icon="content-paste"
                  onPress={() => {}}
                  title="Paste"
                />
              </MenuPaper>
            </View>
          </>
        )
      }
    />
  );
};

export default ChatHeader;
