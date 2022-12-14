/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  ImageBackground,
  SectionList,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useTheme} from 'react-native-paper';
import makeStyles from './styles';
import Message from './components/message';
import ChatHeader from './components/header';
import ChatBottom from './components/bottom';
import Loader from '../../components/loader';
import ScrollToBottomButton from '../../components/scrolles/scrollToBottomButton';
import languages from '../../config/translations';
import {
  checkIsShowAvatar,
  setMessageDate,
  scrollTop,
  uuid,
} from '../../helpers';
import {getConversationMessagesRequest} from '../../redux/conversations/requests';
import {setAllMessagesAction} from '../../redux/app/slice';
import IMAGE from '../../assets/img';
import SnackbarComponent from '../../components/snackbar';

const loadMessageOffset = 15;

const Chat = ({route}) => {
  // HOOKS
  const dispatch = useDispatch();
  const theme = useTheme();

  // REFS
  const ref = React.useRef(null);
  const onEndReachedCalledDuringMomentum = React.useRef(false);

  // SELECTORS
  const lang = useSelector(({settingSlice}) => settingSlice.lang);
  const {
    conversationMessages: {data: messageHistory},
    userHistoryConversations,
  } = useSelector(({conversationsSlice}) => conversationsSlice);
  const {userId, firstName} = useSelector(
    ({authSlice}) => authSlice.tokenPayload,
  );
  const {sheraMessages, messageEdit, allMessages, selectedMessages} =
    useSelector(({appSlice}) => appSlice);

  // STYLES
  const styles = makeStyles(theme, {
    selectedMessages,
    messageEdit,
    sheraMessages,
  });

  // STATES
  const [isFetching, setIsFetching] = React.useState(false);
  const [showScrollToButton, setShowScrollToButton] = React.useState(false);

  // VARIABLES
  const conversationId = route?.params?.id;
  const opponentId = route?.params?.opponentId;
  const conversationData = route?.params?.conversationData;
  const typeConversation =
    conversationData?.conversationType.toLowerCase() || '';
  let SectionListReference = null;
  const pagination =
    userHistoryConversations?.[conversationId]?.pagination || {};

  // FUNCTIONS
  const scrollToBottom = () => {
    SectionListReference.scrollToLocation({
      animated: true,
      itemIndex: 0,
      viewPosition: 0,
    });
  };

  const loadMoreMessages = () => {
    if (
      pagination.allItems > pagination.currentPage &&
      allMessages[conversationId].length >= loadMessageOffset
    ) {
      console.log(pagination, 'pagination');
      dispatch(
        getConversationMessagesRequest({
          data: {
            id: conversationId,
            offset: pagination.currentPage + loadMessageOffset,
          },
          cb: response => {
            dispatch(
              setAllMessagesAction({
                [conversationId]: [
                  ...response.data,
                  ...allMessages[conversationId],
                ],
              }),
            );
          },
        }),
      );
    }
  };

  const onEndReached = ({distanceFromEnd}) => {
    if (!onEndReachedCalledDuringMomentum.current) {
      loadMoreMessages();
      onEndReachedCalledDuringMomentum.current = true;
    }
  };

  const setCurrentReadOffset = event => {
    const scrollHight = Math.floor(event.nativeEvent.contentOffset.y);

    if (scrollHight > 100) {
      !showScrollToButton && setShowScrollToButton(true);
    } else {
      showScrollToButton && setShowScrollToButton(false);
    }
  };

  // USEEFFECTS
  React.useEffect(() => {
    if (!allMessages[conversationId] && conversationId) {
      console.log('!render!');
      setIsFetching(true);
      dispatch(
        getConversationMessagesRequest({
          data: {
            id: conversationId,
            offset: 0,
          },
          cb: response => {
            let currentDay = 0;
            let newArr = [];
            response.data.map(el => {
              if (new Date(el.sendDate).getDate() !== currentDay) {
                currentDay = new Date(el.sendDate).getDate();
                newArr = [
                  ...newArr,
                  {component: 'div', sendDate: el.sendDate},
                  el,
                ];
              } else {
                currentDay = new Date(el.sendDate).getDate();
                newArr = [...newArr, el];
              }
              return el;
            });
            dispatch(
              setAllMessagesAction({
                [conversationId]: newArr,
              }),
            );
            setIsFetching(false);
          },
        }),
      );
    }
  }, [conversationId]);

  React.useEffect(() => {
    ref && scrollTop(ref);
  }, [messageHistory]);

  const getStyleSectionList = React.useMemo(() => {
    if (messageEdit.messageId || sheraMessages.length) {
      return {
        marginBottom: 95,
      };
    }
    return {
      marginBottom: 40,
    };
  }, [sheraMessages, messageEdit]);

  // RENDERS
  const renderMainContent = React.useMemo(() => {
    const renderInfoCenterScreen = text => {
      return (
        <View style={styles.wrapperInfoCenter}>
          <Text style={[styles.infoCenterText]}>{text}</Text>
        </View>
      );
    };

    return (
      <>
        {(() => {
          if (Number.isNaN(conversationId) && !opponentId) {
            return renderInfoCenterScreen(
              languages[lang].mainScreen.chooseAChat,
            );
          } else {
            if (!conversationId) {
              return renderInfoCenterScreen(
                languages[lang].mainScreen.sendANewMessageToStartAChat,
              );
            } else {
              if (
                allMessages[conversationId] &&
                allMessages[conversationId].length === 0
              ) {
                return renderInfoCenterScreen(
                  languages[lang].mainScreen.thereAreNoMessagesInChatYet,
                );
              } else {
                return (
                  allMessages[conversationId] && (
                    <SectionList
                      keyboardShouldPersistTaps="never"
                      scrollEventThrottle={16}
                      onScroll={event => setCurrentReadOffset(event)}
                      ref={ref => {
                        SectionListReference = ref;
                      }}
                      inverted
                      onEndReached={onEndReached}
                      onEndReachedThreshold={0.5}
                      onMomentumScrollBegin={() => {
                        onEndReachedCalledDuringMomentum.current = false;
                      }}
                      style={getStyleSectionList}
                      sections={
                        [{data: [...allMessages[conversationId]].reverse()}] ||
                        []
                      }
                      renderItem={({item: messageData, index}) => {
                        let isShowAvatar = false;
                        if (
                          messageData.fkSenderId !== userId &&
                          checkIsShowAvatar(
                            allMessages[conversationId],
                            userId,
                            index,
                          )
                        ) {
                          isShowAvatar = true;
                        }
                        if (messageData.component) {
                          return (
                            <View style={styles.wrapperSendData} key={uuid()}>
                              <Text style={styles.sendDataText}>
                                {setMessageDate(new Date(messageData.sendDate))}
                              </Text>
                            </View>
                          );
                        }
                        return (
                          <Message
                            key={uuid()}
                            isShowAvatar={isShowAvatar}
                            messageData={messageData}
                            userId={userId}
                            typeConversation={typeConversation}
                          />
                        );
                      }}
                    />
                  )
                );
              }
            }
          }
        })()}
      </>
    );
  }, [
    allMessages[conversationId],
    sheraMessages,
    messageEdit,
    pagination,
    showScrollToButton,
  ]);

  return (
    <>
      <SafeAreaView style={styles.container}>
        {/* <Pressable onPress={Keyboard.dismiss} style={{flex: 1}}> */}
        <ChatHeader
          conversationData={conversationData}
          conversationId={conversationId}
          typeConversation={typeConversation}
        />
        <ImageBackground
          source={IMAGE.wallPaper}
          resizeMode="cover"
          style={styles.imageBackground}>
          {isFetching ? (
            <View style={styles.wrapperLoader}>
              <Loader
                styles={{
                  text: {
                    color: 'red',
                  },
                }}
                color={theme.colors.main}
                size={50}
              />
            </View>
          ) : (
            renderMainContent
          )}
          {showScrollToButton && (
            <ScrollToBottomButton
              scrollToBottom={scrollToBottom}
              styles={{
                button: {
                  bottom: messageEdit.isEdit || sheraMessages.length ? 100 : 50,
                },
              }}
            />
          )}
        </ImageBackground>
        <ChatBottom
          opponentId={opponentId}
          firstName={firstName}
          userId={userId}
          conversationId={conversationId}
          conversationData={conversationData}
        />
        {/* </Pressable> */}
        <SnackbarComponent />
      </SafeAreaView>
    </>
  );
};

export default Chat;

{
  /* <ScrollView
                      keyboardShouldPersistTaps="never"
                      scrollEventThrottle={16}
                      onScroll={event => setCurrentReadOffset(event)}
                      ref={ref => {
                        SectionListReference = ref;
                      }}
                      inverted
                      onEndReached={onEndReached}
                      onEndReachedThreshold={0.1}
                      onMomentumScrollBegin={() => {
                        onEndReachedCalledDuringMomentum.current = false;
                      }}
                      style={{
                        marginBottom:
                          messageEdit.isEdit || sheraMessages.length ? 95 : 40,
                      }}>
                      {[...allMessages[conversationId]].map(
                        (messageData, index) => {
                          let isShowAvatar = false;
                          if (
                            messageData.fkSenderId !== userId &&
                            checkIsShowAvatar(
                              allMessages[conversationId],
                              userId,
                              index,
                            )
                          ) {
                            isShowAvatar = true;
                          }
                          if (messageData.component) {
                            return (
                              <View
                                style={styles.wrapperSendData}
                                key={uuidv4()}>
                                <Text style={styles.sendDataText}>
                                  {setMessageDate(
                                    new Date(messageData.sendDate),
                                  )}
                                </Text>
                              </View>
                            );
                          }
                          return (
                            <Message
                              key={uuidv4()}
                              isShowAvatar={isShowAvatar}
                              messageData={messageData}
                              userId={userId}
                              typeConversation={typeConversation}
                            />
                          );
                        },
                      )}
                    </ScrollView> */
}
