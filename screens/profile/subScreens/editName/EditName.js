/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {useForm, Controller} from 'react-hook-form';
import {SafeAreaView, View, Pressable} from 'react-native';
import {useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import makeStyles from './styles';
import Header from '../../../../components/header';
import {PathsName} from '../../../../navigation/navigationConfig';
import TextInputCustom from '../../../../components/hookFormsComponents/TextInput';
import * as config from './config';
import SvgMaker from '../../../../components/svgMaker';
import {
  putUpdateProfileRequest,
  getUserProfileDataRequest,
} from '../../../../redux/user/requests';

const EditName = () => {
  // HOOKS
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigation = useNavigation();

  // STYLES
  const styles = makeStyles(theme);

  // SELECTORS
  const {lang} = useSelector(({settingSlice}) => settingSlice);
  const {userInfo} = useSelector(({userSlice}) => userSlice);

  // STATES
  const [errorBack, setErrorBack] = React.useState('');

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: {errors},
  } = useForm({
    defaultValues: {},
  });

  // FUNCTIONS
  const backToProfile = () => {
    navigation.navigate(PathsName.profile, {
      isOwnerProfile: true,
    });
  };

  const onSubmit = data => {
    const sendData = {};
    if (data.firstName !== userInfo.firstName) {
      sendData.firstName = data.firstName;
    }

    if (data.lastName !== userInfo.lastName) {
      sendData.lastName = data.lastName;
    }

    Object.keys(sendData).length
      ? dispatch(
          putUpdateProfileRequest({
            data: sendData,
            cb: () => {
              dispatch(
                getUserProfileDataRequest({
                  cb: () => {
                    backToProfile();
                  },
                }),
              );
            },
          }),
        )
      : backToProfile();
    errorBack && setErrorBack('');
  };

  // USEEFFECTS
  React.useEffect(() => {
    // set defaultValues form from back
    if (!getValues('firstName') && userInfo.firstName) {
      setValue('firstName', `${userInfo.firstName}`);
    }
    if (!getValues('lastName') && userInfo.lastName) {
      setValue('lastName', `${userInfo.lastName}`);
    }
  }, [userInfo]);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        styles={{
          top: styles.headerTop,
        }}
        title={'Edit Name'}
        navigationAlternativeBack={backToProfile}
        renderTopRightComponent={() => (
          <Pressable onPress={handleSubmit(onSubmit)}>
            <SvgMaker name="svgs_filled_check_square" strokeFill={'#ffffff'} />
          </Pressable>
        )}
      />
      <View style={styles.wrapper}>
        {config.fieldsEditName.map((el, key) => (
          <Controller
            key={key}
            control={control}
            rules={el.validate}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInputCustom
                style={el.style}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                errors={errors}
                error={errors[el.fieldName]}
                keyboardType={el.keyboardType}
                placeholder={el.placeholder}
                secureTextEntry={false}
                styles={el.styles}
              />
            )}
            name={el.fieldName}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

export default React.memo(EditName);
