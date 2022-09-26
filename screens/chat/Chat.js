import React from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';
import MessageInput from './components/MessageInput';
import Message from './components/Message';
import languages from '../../config/translations';
import {checkIsShowAvatar, scrollTop, settingFilesObject} from '../../helpers';
import {getConversationUserHistoryRequest} from '../../redux/conversations/requests';

const Chat = ({navigation, route}) => {
  // HOOKS
  const dispatch = useDispatch();

  // REFS
  const inputRef = React.useRef(null);
  const ref = React.useRef(null);

  const conversationId = route.params.id;
  // SELECTORS
  const lang = useSelector(({settingSlice}) => settingSlice.lang);
  // const lang = useSelector(({commonReducer}) => commonReducer.lang);
  // const isCreateChat = useSelector(
  //   ({userConversationReducer}) =>
  //     userConversationReducer.createConversation.success.data,
  // );
  const opponentId = useSelector(
    ({conversationsSlice}) => conversationsSlice.opponentId.id,
  );
  const messageHistory = useSelector(
    ({conversationsSlice}) => conversationsSlice.userHistoryConversation.data,
  );
  const pagination = useSelector(
    ({conversationsSlice}) =>
      conversationsSlice.userHistoryConversation.pagination,
  );
  // const lastMessage = useSelector(
  //   ({userConversationReducer}) => userConversationReducer.lastMessages,
  // );
  const {userId, firstName} = useSelector(
    ({authSlice}) => authSlice.tokenPayload,
  );
  const sheraMessages = useSelector(({appSlice}) => appSlice.sheraMessages);
  // const messageEdit = useSelector(
  //   ({commonReducer}) => commonReducer.messageEdit,
  // );

  // STATES
  const [allMessages, setAllMessages] = React.useState({});
  const [localPagination, setLocalPagination] = React.useState({});
  const [files, setFiles] = React.useState({});
  const [isOpenDialog, setIsOpenDialog] = React.useState(false);
  const [isInputState, setIsInputState] = React.useState(false);
  const [timeDivCounter, setTimeDivCounter] = React.useState(0);

  const headers = useSelector(({authSlice}) => authSlice.headers);
  // const {data: conversationsList} = useSelector(
  //   ({conversationsSlice}) => conversationsSlice.conversationsList,
  // );

  // FUNCTIONS
  const scrollHandler = event => {
    let element = event.currentTarget;
    if (
      allMessages[conversationId]?.length % (15 + timeDivCounter) === 0 &&
      element.scrollTop === 0
    ) {
      // dispatch(
      //   conversationUserHistoryActionRequest(
      //     conversationId,
      //     localPagination[conversationId] + 15,
      //   ),
      // );
    }
  };

  const openFileDialog = () => {
    const element = inputRef.current;
    if (element) element.click();
  };

  React.useEffect(() => {
    if (navigation.isFocused()) {
      console.log(route.params, 'route.params');
      // dispatch(getUserConversationsRequest());
    }
  }, [navigation]);

  React.useEffect(() => {
    if (!allMessages[conversationId] && conversationId) {
      dispatch(
        getConversationUserHistoryRequest({
          data: {
            id: conversationId,
            offset: 0,
          },
        }),
      );
    }
    if (sheraMessages.length) {
      // console.log(sheraMessages, 'sheraMessages');
    }
  }, [conversationId]);

  React.useEffect(() => {
    // scrollTop(ref);
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
      console.log(messageHistory, 'messageHistory');
      // setTimeDivCounter(newArr.filter(el => el.component).length);
      // setLocalPagination(value => ({
      //   ...value,
      //   [conversationId]: pagination.currentPage,
      // }));
      setAllMessages(messages => ({...messages, [conversationId]: newArr}));
    }
  }, [messageHistory]);

  console.log(messageHistory, 'messageHistory');
  return (
    <SafeAreaView style={styles.container}>
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
          {Number.isNaN(conversationId) && !opponentId ? (
            <Text>{languages[lang].mainScreen.chooseAChat}</Text>
          ) : opponentId && !conversationId ? (
            <Text>
              {languages[lang].mainScreen.sendANewMessageToStartAChat}
            </Text>
          ) : allMessages[conversationId] &&
            allMessages[conversationId].length === 0 ? (
            <Text>
              {languages[lang].mainScreen.thereAreNoMessagesInChatYet}
            </Text>
          ) : (
            allMessages[conversationId] &&
            allMessages[conversationId].map((messageData, index, arr) => {
              let isShowAvatar = false;
              if (
                messageData.fkSenderId !== userId &&
                checkIsShowAvatar(allMessages[conversationId], userId, index)
              )
                isShowAvatar = true;
              if (messageData.component) {
                return (
                  <React.Fragment key={messageData.sendDate}>
                    <View style={{display: 'flex', justifyContent: 'center'}}>
                      <Text
                        style={
                          {
                            // maxWidth: '125px',
                            // padding: '1px 7px',
                            // backgroundColor: 'rgba(0, 0, 0, 0.4)',
                            // color: '#fffefeb5',
                            // borderRadius: '5px',
                          }
                        }>
                        {/* {setMessageDate(new Date(messageData.sendDate))} */}
                      </Text>
                    </View>
                  </React.Fragment>
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
            })
          )}
          <View style={{height: 50}} ref={ref}></View>
        </>
      </ScrollView>
      {(!!conversationId || !!opponentId) && (
        <MessageInput
          allMessages={allMessages}
          setAllMessages={setAllMessages}
          conversationId={conversationId}
          userId={userId}
          firstName={firstName}
          opponentId={opponentId}
          openFileDialog={openFileDialog}
        />
      )}
    </SafeAreaView>
  );
};

export default Chat;
