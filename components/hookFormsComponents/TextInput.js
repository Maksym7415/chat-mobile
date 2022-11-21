import React from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {TextInput, useTheme} from 'react-native-paper';
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
  textInputProps = {},
}) => {
  // HOOKS
  const theme = useTheme();

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
        dense={true}
        activeUnderlineColor={theme.colors.main}
        {...textInputProps}
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
