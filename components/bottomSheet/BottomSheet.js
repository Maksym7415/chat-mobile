/* eslint-disable react-native/no-inline-styles */
import React, {Children} from 'react';
import {useTheme, Badge} from 'react-native-paper';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import makeStyles from './styles';
import * as config from './config';

const BottomSheetRoot = React.forwardRef(
  ({children, snapPoints, bottomSheetBackdropData = {}}, ref) => {
    // HOOKS
    const theme = useTheme();

    // STYLES
    const stylesRoot = makeStyles(theme);

    // VARIABLES
    const snapPointsRoot = React.useMemo(
      () => snapPoints || ['60%'],
      [snapPoints],
    );

    // FUNCTIONS
    const handleSheetChanges = React.useCallback(index => {
      console.log('handleSheetChanges', index);
    }, []);

    // RENDERS
    const renderBackdrop = React.useCallback(
      props => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          opacity={0.5}
          {...bottomSheetBackdropData}
        />
      ),
      [],
    );

    return (
      <>
        <BottomSheet
          ref={ref}
          index={-1}
          snapPoints={snapPointsRoot}
          onChange={handleSheetChanges}
          enablePanDownToClose={true}
          backdropComponent={renderBackdrop}
          // BottomSheetHandle={true}
          // keyboardBehavior="interactive"
          // animateOnMount={true}
          style={{zIndex: 100}}>
          {children}
        </BottomSheet>
      </>
    );
  },
);

export default BottomSheetRoot;
