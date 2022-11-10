/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, {useLayoutEffect, useState} from 'react';
import {useTheme} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import makeStyles from './styles';
import MessageInput from './components/messageInput/MessageInput';
import Selecteds from './components/selecteds';
import BottomSheet from '../../../../components/bottomSheet';
import ImageAndDocumentPicker from '../../../../components/bottomSheet/components/imageAndDocumentPicker';

function Message({
  firstName,
  conversationId,
  userId,
  openFileDialog,
  opponentId,
}) {
  // HOOKS
  const dispatch = useDispatch();
  const theme = useTheme();

  // REFS
  const refBottomSheet = React.useRef(null);

  // STYLES
  const styles = makeStyles(theme);

  // SELECTORS
  const lang = useSelector(({settingSlice}) => settingSlice.lang);

  const {selectedMessages} = useSelector(({appSlice}) => appSlice);

  const renderBottom = () => {
    if (Object.keys(selectedMessages).length) {
      return <Selecteds />;
    } else {
      if (!!conversationId || !!opponentId) {
        return (
          <MessageInput
            userId={userId}
            firstName={firstName}
            opponentId={opponentId}
            openFileDialog={openFileDialog}
            refBottomSheet={refBottomSheet}
          />
        );
      }
    }
  };

  return (
    <>
      {renderBottom()}
      <BottomSheet ref={refBottomSheet} snapPoints={[120]}>
        <ImageAndDocumentPicker ref={refBottomSheet} />
      </BottomSheet>
    </>
  );
}

export default React.memo(Message);
