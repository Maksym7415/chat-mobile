import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Text, View, Pressable, Alert} from 'react-native';
import {useSelector} from 'react-redux';
import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import makeStyles from './styles';
import {
  headerSelectedСhatsAmount,
  // headerСhatDotsOptionsChat,
  // headerСhatDotsOptionsDialog,
} from './config';
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
import {uuid, findValueKeyInNestedArr} from '../../../../helpers';
// import {TYPES_CONVERSATIONS} from '../../../../config/constants/general';

const ChatHeader = ({conversationData, conversationId, typeConversation}) => {
  //HOOKS
  const navigation = useNavigation();
  const theme = useTheme();

  // STYLES
  const styles = makeStyles(theme);

  // SELECTORS
  const {selectedMessages} = useSelector(({appSlice}) => appSlice);
  const lang = useSelector(({settingSlice}) => settingSlice.lang);
  const {userInfo} = useSelector(({userSlice}) => userSlice);

  // STATES
  const [visibleOptions, setVisibleOptions] = React.useState(false);
  const [levelNameChatDotsOptions, setLevelNameChatDotsOptions] =
    React.useState('');

  // FUNCTIONS
  const openOptions = () => setVisibleOptions(true);
  const closeOptions = () => {
    setVisibleOptions(false);
    setTimeout(() => {
      setLevelNameChatDotsOptions('');
    }, 500);
  };
  const handleOptions = (typeAction, levelNames, noFunctional) => {
    if (levelNames) {
      return setLevelNameChatDotsOptions(levelNames);
    }

    noFunctional && Alert.alert('Цього функціоналу наразі немає');

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
    closeOptions();
    store.dispatch(
      selectedMessagesActions(null, actionsTypeObjectSelected.clear),
    );
  };

  // VARIABLES
  const selectedMessagesAmount = Object.keys(selectedMessages).length;

  const headerСhatDotsOptions = React.useMemo(() => {
    switch (typeConversation) {
      // case TYPES_CONVERSATIONS.dialog:
      //   return levelNameChatDotsOptions
      //     ? findValueKeyInNestedArr(
      //         headerСhatDotsOptionsDialog(lang),
      //         'levelNames',
      //         levelNameChatDotsOptions,
      //         'subMenu',
      //         'subMenu',
      //       )
      //     : headerСhatDotsOptionsDialog(lang);
      // case TYPES_CONVERSATIONS.chat:
      //   return levelNameChatDotsOptions
      //     ? findValueKeyInNestedArr(
      //         headerСhatDotsOptionsChat(lang),
      //         'levelNames',
      //         levelNameChatDotsOptions,
      //         'subMenu',
      //         'subMenu',
      //       )
      //     : headerСhatDotsOptionsChat(lang);
      default:
        return [];
    }
  }, [typeConversation, levelNameChatDotsOptions]);

  // RENDERS
  const renderTopRightComponent = () => {
    return selectedMessagesAmount ? (
      <View style={styles.wrapperActions}>
        {headerSelectedСhatsAmount(lang).map(action => {
          //check for edit action
          if ([actionsTypeActionsChat.editMessage].includes(action.value)) {
            if (
              selectedMessagesAmount > 1 ||
              Object.values(selectedMessages)?.[0]?.User?.id !== userInfo.id
            ) {
              return;
            }
          }
          return (
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
        <Pressable
          onPress={() => {
            Alert.alert('Цього функціоналу наразі немає');
          }}
          disabled={true}>
          <SvgMaker name="svgs_filled_phone" strokeFill={'#ffffff'} />
        </Pressable>
        <View style={{...styles.wrapperAction, ...styles.wrapperOptions}}>
          <MenuPaper
            anchor={{strokeFill: '#ffffff'}}
            setShowMenu={bool => {
              bool ? openOptions() : closeOptions();
            }}
            showMenu={visibleOptions}>
            <View style={styles.options}>
              {levelNameChatDotsOptions ? (
                <Pressable
                  style={styles.dotsOption}
                  onPress={() => {
                    setLevelNameChatDotsOptions(prev =>
                      prev.split('_').slice(0, -1).join('_'),
                    );
                  }}>
                  <View style={styles.wrapperIconOption}>
                    <Icon
                      name="arrowleft"
                      size={20}
                      color="#868686"
                      style={{paddingHorizontal: 3.5}}
                    />
                  </View>
                  <Text>Back</Text>
                </Pressable>
              ) : null}
              {headerСhatDotsOptions.map(action => {
                const isSubMenu = action?.subMenu?.length && action.levelNames;
                return (
                  <Pressable
                    key={action.id}
                    style={{
                      ...styles.dotsOption,
                      marginRight: isSubMenu ? 26 : 0,
                    }}
                    onPress={() =>
                      handleOptions(
                        action.value,
                        action.levelNames,
                        action.noFunctional,
                      )
                    }>
                    {action.icon.name && (
                      <View style={styles.wrapperIconOption}>
                        <SvgMaker name={action.icon.name} />
                      </View>
                    )}
                    <Text>{action.title}</Text>
                    {isSubMenu ? (
                      <View style={styles.wrapperArrowRight}>
                        <Icon
                          name="right"
                          size={14}
                          color="#868686"
                          style={styles.arrowRight}
                        />
                      </View>
                    ) : null}
                  </Pressable>
                );
              })}
            </View>
          </MenuPaper>
        </View>
      </>
    );
  };

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
          <Pressable
            onPress={() =>
              navigation.navigate(PathsName.profile, {
                typeProfile: conversationData.conversationType,
                conversationData,
              })
            }
            style={styles.wrapperConversationData}>
            <View style={styles.wrapperAvatar}>
              <UserAvatar
                source={conversationData.conversationAvatar}
                name={conversationData.conversationName}
                sizeAvatar={38}
              />
            </View>
            <View style={styles.wrapperAvatar}>
              <Text style={styles.title}>
                {conversationData?.conversationName}
              </Text>
              <Text style={styles.subtitle}>{'Online*'}</Text>
            </View>
          </Pressable>
        )
      }
      renderTopRightComponent={renderTopRightComponent}
    />
  );
};

export default React.memo(ChatHeader);
