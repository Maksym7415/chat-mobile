import languages from '../../config/translations';

export const contextMenuConfig =
  () => (lang, isMyMessage, deleteMessage, editMessage, shareMessage) => {
    if (isMyMessage) {
      return [
        {
          id: 1,
          title: languages[lang].generals.deleteMessage,
          callback: deleteMessage,
        },
        {
          id: 2,
          title: languages[lang].generals.editMessage,
          callback: editMessage,
        },
        {
          id: 3,
          title: languages[lang].generals.shareMessage,
          callback: shareMessage,
        },
      ];
    }
    return [
      {
        id: 3,
        title: languages[lang].generals.shareMessage,
        callback: shareMessage,
      },
    ];
  };

export const contextMenuCallback = (event, id, config, dispatch) => {
  // event.preventDefault();
  // if (event.type === 'click') {
  //   dispatch(
  //     contextMenuAction({
  //       yPos: '',
  //       xPos: '',
  //       isShowMenu: false,
  //       messageId: 0,
  //       config,
  //     }),
  //   );
  // }
  // if (event.type === 'contextmenu') {
  //   dispatch(
  //     contextMenuAction({
  //       yPos: `${event.pageY}px`,
  //       xPos: `${event.pageX}px`,
  //       isShowMenu: true,
  //       messageId: id,
  //       config,
  //     }),
  //   );
  // }
};
