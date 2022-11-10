import {socket} from '../index';

import {fullDate, handleGetBufferFile} from '../../../helpers';

let filesCount = 0;

export const socketEmitSendFiles = (
  data = {
    userId: '',
    conversationId: '',
    message: '',
  },
  files,
  dispatch,
) => {
  if (!files) return;

  let fileReader = new FileReader();
  if (files) {
    let filesArray = Object.values(files);
    const handleEmitFile = async (messageId, sendDate) => {
      if (filesCount === filesArray.length) {
        filesCount = 0;
      } else {
        await handleGetBufferFile(
          fileReader,
          filesArray[filesCount],
          filesArray[filesCount].size,
          filesArray[filesCount].name,
          data.userId,
          data.conversationId,
          socket,
          data.message,
          filesArray[filesCount].type,
          filesArray.length,
          dispatch,
          messageId,
          sendDate,
        );
        filesCount++;
        handleEmitFile(messageId, sendDate);
      }
    };
    socket.emit(
      'files',
      {
        conversationId: data.conversationId,
        message: {
          message: data.message,
          fkSenderId: data.userId,
          sendDate: fullDate(new Date()),
          messageType: 'File',
          isEdit: false,
        },
      },
      id => {
        if (id) handleEmitFile(id, fullDate(new Date()));
      },
    );
  }
};