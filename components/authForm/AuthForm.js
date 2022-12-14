import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableNativeFeedback,
  ScrollView,
  Keyboard,
} from 'react-native';
import {Controller} from 'react-hook-form';
import styles from './styles';
import PressableCustom from '../pressableCustom';
import TextInputCustom from '../hookFormsComponents/TextInput';

const AuthForm = ({
  title,
  configFields,
  optionsForm,
  errorBack,
  onSubmit,
  submitBtnTitle,
  render,
}) => {
  return (
    <SafeAreaView style={styles.keyboardView}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.wrapperForm}>
          {title && <Text style={styles.title}>{title}</Text>}
          <TouchableNativeFeedback onPress={Keyboard.dismiss}>
            <React.Fragment>
              {configFields.map((el, key) => (
                <Controller
                  key={key}
                  control={optionsForm.control}
                  rules={el.validate}
                  render={({field: {onChange, onBlur, value}}) => (
                    <TextInputCustom
                      style={el.style}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      errors={optionsForm.errors}
                      error={optionsForm.errors[el.fieldName]}
                      keyboardType={el.keyboardType}
                      placeholder={el.placeholder}
                      secureTextEntry={false}
                      styles={el.styles}
                    />
                  )}
                  name={el.fieldName}
                />
              ))}
            </React.Fragment>
          </TouchableNativeFeedback>
          {errorBack && (
            <View style={styles.error}>
              <Text style={styles.errorText}>{errorBack}</Text>
            </View>
          )}
          <PressableCustom
            on={{
              onPress: optionsForm.handleSubmit(onSubmit),
            }}
            styles={(stylesRoot, pressed) => {
              return [
                {
                  backgroundColor: pressed ? '#666666' : '#000000',
                },
                {
                  ...stylesRoot.btn,
                  marginTop: 15,
                },
              ];
            }}
            options={{
              text: {
                label: submitBtnTitle,
                styles: null,
              },
            }}
          />
          {render?.text && render.text(styles)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AuthForm;
