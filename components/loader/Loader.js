import React from 'react';
import {ActivityIndicator} from 'react-native-paper';
import stylesRoot from './styles';

const Loader = ({styles, size, color}) => {
  return (
    <ActivityIndicator
      animating={true}
      color={color}
      style={{...stylesRoot.text, ...styles?.text}}
      size={size || 'small'}
    />
  );
};

export default Loader;
