import React from 'react';
import {Text, Pressable} from 'react-native';
import stylesRoot from './styles';

const styleRoot = pressed => {
  return [
    {
      backgroundColor: pressed ? '#666666' : '#000000',
    },
    stylesRoot.btn,
  ];
};
const PressableCustom = ({
  on = {
    onPress: () => {},
    onPressIn: () => {},
    onPressOut: () => {},
    onLongPress: () => {},
  },
  styles,
  options = {
    type: 'custom',
    componentChildren: () => {},
    text: {
      label: '',
      styles: null,
    },
  },
}) => {
  const renderChildren = (actions, options) => {
    switch (options.type) {
      case 'custom':
        return options.componentChildren(actions);
      default:
        return (
          <Text style={options.text.styles || stylesRoot.btnText}>
            {options.text.label}
          </Text>
        );
    }
  };

  return (
    <Pressable
      {...on}
      style={({pressed}) => (styles ? styles(pressed) : styleRoot(pressed))}>
      {({pressed}) =>
        renderChildren(
          {
            pressed: pressed,
          },
          options,
        )
      }
    </Pressable>
  );
};

export default PressableCustom;
