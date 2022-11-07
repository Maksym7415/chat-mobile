import * as React from 'react';
import {Snackbar} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {Text} from 'react-native';
import {getSnackBar, initialState} from './slice';

const SnackbarComponent = () => {
  // HOOKS
  const dispatch = useDispatch();

  // SEECTERS
  const options = useSelector(({snackBarSlice}) => snackBarSlice.options);

  // FUNCTIONS
  const onDismissSnackBar = () => dispatch(getSnackBar(initialState.options));

  // VARIABLES
  const message = options.message;

  return (
    <Snackbar
      wrapperStyle={options.wrapperStyle}
      style={options.style}
      visible={options.open}
      onDismiss={onDismissSnackBar}
      duration={options.timeout}
      action={options.action}>
      {message ? (
        <Text style={options.styleText}>{message}</Text>
      ) : (
        options.content
      )}
    </Snackbar>
  );
};

export default SnackbarComponent;
