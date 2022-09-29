import React from 'react';
import {View} from 'react-native';
import stylesRoot from './styles';

const Header = ({styles, children}) => {
  console.log(styles, 'styles');
  return (
    <View style={{...stylesRoot.container, ...styles?.container}}>
      {children}
    </View>
  );
};

export default Header;
