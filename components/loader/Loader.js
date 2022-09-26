import React from 'react';
import {Text} from 'react-native';
import stylesRoot from './styles';

const Loader = ({styles}) => {
  return <Text style={{...stylesRoot.text, ...styles?.text}}>Loading...</Text>;
};

export default Loader;
