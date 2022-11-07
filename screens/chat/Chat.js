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
import styles from './styles';
import Message from './components/message';
import ChatHeader from './components/header';
import ChatBottom from './components/bottom';
import Loader from '../../components/loader';
import ScrollToBottomButton from '../../components/scrolles/scrollToBottomButton';
import languages from '../../config/translations';
import {checkIsShowAvatar, setMessageDate, scrollTop} from '../../helpers';
import {getConversationUserHistoryRequest} from '../../redux/conversations/requests';
import {setConversationIdAction} from '../../redux/conversations';
import {setAllMessagesAction} from '../../redux/app/slice';
import IMAGE from '../../assets/img';
import SnackbarComponent from '../../components/snackbar';

const Chat = ({navigation, route}) => {
  // HOOKS
  const dispatch = useDispatch();

  // REFS
  const inputRef = React.useRef(null);
  const ref = React.useRef(null);
  const onEndReachedCalledDuringMomentum = React.useRef(false);

  // SELECTORS
  const lang = useSelector(({settingSlice}) => settingSlice.lang);
  const {
    userHistoryConversation: {data: messageHistory, pagination},
    opponentId: {id: opponentId},
    createConversation: isCreateChat,
  } = useSelector(({conversationsSlice}) => conversationsSlice);
  const {userId, firstName} = useSelector(
    ({authSlice}) => authSlice.tokenPayload,
  );
  const {sheraMessages, messageEdit, allMessages} = useSelector(
    ({appSlice}) => appSlice,
  );

  // STATES
  const [localPagination, setLocalPagination] = React.useState({});
  const [timeDivCounter, setTimeDivCounter] = React.useState(0);
  const [isFetching, setIsFetching] = React.useState(false);
  const [showScrollToButton, setShowScrollToButton] = React.useState(false);

  // VARIABLES
  const conversationId = route?.params?.id;
  const conversationData = route?.params?.conversationData;
  const typeConversation =
    conversationData?.conversationType.toLowerCase() || '';
  let SectionListReference = null;

  // FUNCTIONS
  const openFileDialog = () => {
    const element = inputRef.current;
    if (element) {
      element.click();
    }
  };

  const scrollToBottom = () => {
    SectionListReference.scrollToLocation({
      animated: true,
      itemIndex: 0,
      viewPosition: 0,
    });
  };

  const loadMoreMessages = () => {
    dispatch(
      getConversationUserHistoryRequest({
        data: {
          id: conversationId,
          offset: pagination.currentPage + 1,
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
        getConversationUserHistoryRequest({
          data: {
            id: conversationId,
            offset: 0,
          },
          cb: () => {
            setIsFetching(false);
          },
        }),
      );
    }
  }, [conversationId]);

  React.useEffect(() => {
    ref && scrollTop(ref);
    if (messageHistory.length && !allMessages[conversationId]) {
      let currentDay = 0;
      let newArr = [];
      messageHistory.map(el => {
        if (new Date(el.sendDate).getDate() !== currentDay) {
          currentDay = new Date(el.sendDate).getDate();
          newArr = [...newArr, {component: 'div', sendDate: el.sendDate}, el];
        } else {
          currentDay = new Date(el.sendDate).getDate();
          newArr = [...newArr, el];
        }
        return el;
      });

      setTimeDivCounter(newArr.filter(el => el.component).length);
      setLocalPagination(value => ({
        ...value,
        [conversationId]: pagination.currentPage,
      }));
      dispatch(
        setAllMessagesAction({
          [conversationId]: newArr,
        }),
      );
    }
  }, [messageHistory]);

  React.useEffect(() => {
    if (opponentId) {
      if (isCreateChat.length) {
        dispatch(
          setConversationIdAction({
            id: isCreateChat[0].id,
            type: 'dialog',
          }),
        );
      } else {
        dispatch(
          setConversationIdAction({
            id: 0,
            type: '',
          }),
        );
      }
    }
  }, [isCreateChat]);

  // RENDERS
  const renderMainContent = () => {
    return (
      <>
        {(() => {
          if (Number.isNaN(conversationId) && !opponentId) {
            return <Text>{languages[lang].mainScreen.chooseAChat}</Text>;
          } else {
            if (opponentId && !conversationId) {
              return (
                <Text>
                  {languages[lang].mainScreen.sendANewMessageToStartAChat}
                </Text>
              );
            } else {
              if (
                allMessages[conversationId] &&
                allMessages[conversationId].length === 0
              ) {
                return (
                  <Text>
                    {languages[lang].mainScreen.thereAreNoMessagesInChatYet}
                  </Text>
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
                      onEndReachedThreshold={0.1}
                      onMomentumScrollBegin={() => {
                        onEndReachedCalledDuringMomentum.current = false;
                      }}
                      style={{
                        marginBottom:
                          messageEdit.isEdit || sheraMessages.length ? 95 : 40,
                      }}
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
                            <View
                              style={styles.wrapperSendData}
                              key={messageData.sendDate}>
                              <Text style={styles.sendDataText}>
                                {setMessageDate(new Date(messageData.sendDate))}
                              </Text>
                            </View>
                          );
                        }
                        return (
                          <Message
                            key={messageData.id}
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
      </>
    );
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ChatHeader
          conversationData={conversationData}
          conversationId={conversationId}
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
                color={'#517DA2'}
                size={50}
              />
            </View>
          ) : (
            renderMainContent()
          )}
        </ImageBackground>
        <ChatBottom
          opponentId={opponentId}
          firstName={firstName}
          userId={userId}
          conversationId={conversationId}
          conversationData={conversationData}
        />
        <SnackbarComponent />
      </SafeAreaView>
    </>
  );
};

export default Chat;
