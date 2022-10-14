/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  ImageBackground,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';
import {socket} from '../../config/socket';
import Message from './components/message';
import ChatHeader from './components/header';
import ChatBottom from './components/bottom';
import Loader from '../../components/loader';
import languages from '../../config/translations';
import {checkIsShowAvatar, setMessageDate, scrollTop} from '../../helpers';
import {getConversationUserHistoryRequest} from '../../redux/conversations/requests';
import {setConversationIdAction} from '../../redux/conversations';
import {setAllMessagesAction} from '../../redux/app/slice';
import IMAGE from '../../assets/img';
import store from '../../redux/store';

const Chat = ({navigation, route}) => {
  // HOOKS
  const dispatch = useDispatch();

  // REFS
  const inputRef = React.useRef(null);
  const ref = React.useRef(null);

  // VARIABLES
  const conversationId = route.params.id;
  const conversationData = route.params.conversationData;

  // SELECTORS
  const lang = useSelector(({settingSlice}) => settingSlice.lang);
  const {
    userHistoryConversation: {data: messageHistory, pagination},
    opponentId: {id: opponentId},
    createConversation: isCreateChat,
    lastMessages,
  } = useSelector(({conversationsSlice}) => conversationsSlice);
  const {userId, firstName} = useSelector(
    ({authSlice}) => authSlice.tokenPayload,
  );
  const {sheraMessages, messageEdit, selectedMessages, allMessages} =
    useSelector(({appSlice}) => appSlice);

  // STATES
  // const [allMessages, setAllMessages] = React.useState({});
  const [localPagination, setLocalPagination] = React.useState({});
  const [files, setFiles] = React.useState({});
  const [isOpenDialog, setIsOpenDialog] = React.useState(false);
  const [isInputState, setIsInputState] = React.useState(false);
  const [timeDivCounter, setTimeDivCounter] = React.useState(0);
  const [isFetching, setIsFetching] = React.useState(false);

  // FUNCTIONS
  const scrollHandler = event => {
    let element = event.currentTarget;
    if (
      allMessages[conversationId]?.length % (15 + timeDivCounter) === 0 &&
      element.scrollTop === 0
    ) {
      dispatch(
        getConversationUserHistoryRequest({
          data: {
            id: conversationId,
            offset: localPagination[conversationId] + 15,
          },
        }),
      );
    }
  };

  const openFileDialog = () => {
    const element = inputRef.current;
    if (element) {
      element.click();
    }
  };

  // USEEFFECTS
  React.useEffect(() => {
    if (!allMessages[conversationId] && conversationId) {
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
    if (sheraMessages.length) {
      // console.log(sheraMessages, 'sheraMessages');
    }
  }, [conversationId]);

  React.useEffect(() => {
    ref && scrollTop(ref);
    if (messageHistory.length) {
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

      // setAllMessages(messages => ({...messages, [conversationId]: newArr}));
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

  // console.log(messageEdit, 'messageEdit');
  // RENDERS
  const renderMainContent = () => {
    return (
      <ScrollView
        // onScroll={scrollHandler}
        style={
          {
            // height:
            //   messageEdit.isEdit || sheraMessages.length
            //     ? 'calc(100% - 100px)'
            //     : 'calc(100% - 50px)',
            // overflowY: 'scroll',
          }
        }>
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
                    allMessages[conversationId] &&
                    allMessages[conversationId].map(
                      (messageData, index, arr) => {
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
                            conversationId={conversationId}
                            allMassages={allMessages[conversationId]}
                          />
                        );
                      },
                    )
                  );
                }
              }
            }
          })()}
          <View style={{height: 50}} ref={ref} />
        </>
      </ScrollView>
    );
  };

  return (
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
      />
    </SafeAreaView>
  );
};

export default Chat;
