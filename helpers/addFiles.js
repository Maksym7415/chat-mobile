/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import {v4 as uuidv4} from 'uuid';

export const handleGetBufferFile =
  (
    fileReader,
    blob,
    fileSize,
    fileName,
    userId,
    conversationId,
    socket,
    message,
    type,
    filesCount,
    dispatch,
    handleOpenDialog,
    setSrc,
    setMessage,
    messageId,
    sendDate,
  ) =>
  resolve => {
    fileReader.readAsArrayBuffer(blob);
    fileReader.onloadend = () => {
      let arrayBuffer = fileReader.result;
      socket.emit(
        'files',
        {
          data: arrayBuffer,
          uniqueName: uuidv4(),
          fileName,
          messageId,
          message,
          sendDate,
          userId,
          conversationId,
          fileSize,
          fileExtension: fileName.split('.')[fileName.split('.').length - 1],
          isImage: !!type.includes('image'),
          filesCount,
        },
        success => {
          if (success === 'upload done') {
            handleOpenDialog(false);
            setSrc([]);
            setMessage('');

            return resolve();
          }
          resolve();
        },
      );
    };
  };
