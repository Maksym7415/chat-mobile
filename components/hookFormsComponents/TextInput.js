import React from 'react';
import {View, TextInput, Text} from 'react-native';
import PropTypes from 'prop-types';
import stylesRoot from './styles';

const propTypes = {
  onChangeText: PropTypes.func.isRequired,
  error: PropTypes.object,
  secureTextEntry: PropTypes.bool,
  label: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
};

const TextInputField = ({
  onChangeText,
  error,
  secureTextEntry,
  label,
  value,
  styles,
  placeholder,
  settingAuto = {
    autoCapitalize: 'auto',
    autoComplete: false,
    autoCorrect: false,
  },
}) => {
  return (
    <View style={{...stylesRoot.container, ...styles.container}}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={error ? stylesRoot.errorInputStyle : stylesRoot.inputStyle}
        accessibilityLabel={label}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        // autoCapitalize={settingAuto.autoCapitalize || 'none'}
        // autoComplete={settingAuto.autoComplete || false}
        // autoCorrect={settingAuto.autoCorrect || false}
      />
      {error && <Text style={stylesRoot.errorLabel}>{error.message}</Text>}
    </View>
  );
};

TextInputField.propTypes = propTypes;

export default TextInputField;
