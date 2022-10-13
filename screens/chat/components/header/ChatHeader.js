import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {Menu, useTheme} from 'react-native-paper';
import makeStyles from './styles';
import {headerSelectedСhatsAmount} from './config';
import {PathsName} from '../../../../navigation/navigationConfig';
import UserAvatar from '../../../../components/avatar/userAvatar';
import SvgMaker from '../../../../components/svgMaker';
import Header from '../../../../components/header';
import {
  actionsTypeObjectSelected,
  selectedMessagesActions,
} from '../../../../redux/app/actions';
import store from '../../../../redux/store';

const ChatHeader = ({conversationData}) => {
  //HOOKS
  const navigation = useNavigation();
  const theme = useTheme();

  // STYLES
  const styles = makeStyles(theme);

  // SELECTORS
  const {selectedMessages} = useSelector(({appSlice}) => appSlice);
  const lang = useSelector(({settingSlice}) => settingSlice.lang);

  // STATES
  const [visibleOptions, setVisibleOptions] = React.useState(true);

  // FUNCTIONS
  const openOptions = () => setVisibleOptions(true);
  const closeOptions = () => setVisibleOptions(false);
  const handleOptions = value => {
    console.log(value, 'value');
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
          <View
            style={styles.wrapperClose}
            onStartShouldSetResponder={() => {
              store.dispatch(
                selectedMessagesActions(null, actionsTypeObjectSelected.clear),
              );
            }}>
            <SvgMaker name="svgs_line_bot_close" />
          </View>
        ) : (
          <View
            onStartShouldSetResponder={() => {
              navigation.navigate(PathsName.main);
            }}>
            <SvgMaker name="svgs_filled_back_arrow" strokeFill={'#ffffff'} />
          </View>
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
                <View
                  key={action.id}
                  style={styles.wrapperAction}
                  onStartShouldSetResponder={() => handleOptions(action.value)}>
                  <SvgMaker name={action.icon.name} />
                </View>
              );
            })}
          </View>
        ) : (
          <>
            <View onStartShouldSetResponder={openOptions}>
              <SvgMaker name="svgs_filled_phone" strokeFill={'#ffffff'} />
            </View>
            <View style={{...styles.wrapperAction, ...styles.wrapperOptions}}>
              {/* <Menu
                visible={visibleOptions}
                onDismiss={closeOptions}
                anchor={
                  <View onStartShouldSetResponder={openOptions}>
                    <SvgMaker name="svgs_filled_dots" strokeFill={'#ffffff'} />
                  </View>
                }>
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
              </Menu> */}
            </View>
          </>
        )
      }
    />
  );
};

export default ChatHeader;
