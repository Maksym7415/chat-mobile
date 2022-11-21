/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Animated, Easing, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import {Drawer, Avatar, useTheme, Divider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import makeStyles from './styles';
import * as config from './config';
import SvgMaker from '../../components/svgMaker';
import UserAvatar from '../../components/avatar/userAvatar';
import {getNameShort} from '../../helpers';
import {REACT_APP_BASE_URL} from '../../config/constants/url';
import {themeLight, themeDark} from '../../config/theme';
import {PathsName} from '../navigationConfig';
import {setThemeAction} from '../../redux/setting/slice';
import {setSettingStatusBarAction} from '../../redux/app/slice';

function CustomContentComponent(props) {
  // HOOKS
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigation = useNavigation();

  // STYLES
  const stylesRoot = makeStyles(theme);

  // SELECTORS
  const {theme: themeObjState, lang} = useSelector(
    ({settingSlice}) => settingSlice,
  );
  const {userInfo} = useSelector(({userSlice}) => userSlice);

  const [isOpenAccounts, setIsOpenAccounts] = React.useState(false);

  // FUNCTIONS
  const handleMenuAction = navigatePathName => {
    navigatePathName && navigation.navigate(navigatePathName);
  };
  const changeThemeCore = (value, themeSelected) => {
    dispatch(
      setThemeAction({
        core: value,
      }),
    );
    dispatch(
      setSettingStatusBarAction({
        backgroundColor: themeSelected.colors.main,
      }),
    );
  };

  const source = userInfo.userAvatar;
  const fullName =
    userInfo.fullName || `${userInfo.firstName} ${userInfo.lastName}`;
  const nameShort = fullName ? getNameShort(fullName) : null;
  const sizeAvatar = 59;

  // const spinValue = new Animated.Value(0);
  // // First set up animation
  // Animated.timing(spinValue, {
  //   toValue: 1,
  //   duration: 1500,
  //   easing: Easing.linear, // Easing is an additional import from react-native
  //   useNativeDriver: false, // To make use of native driver for performance
  // }).start();
  // const spin = spinValue.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: ['0deg', '180deg'],
  // });

  // RENDERS
  const renderMenuItems = items =>
    items(lang).map(item => (
      <Pressable
        key={item.id}
        onPress={() => handleMenuAction(item.navigatePathName)}
        style={stylesRoot.wrapperMenuItem}>
        <SvgMaker name={item.icon.name} />
        <Text style={stylesRoot.menuItemTitle}>{item.title}</Text>
      </Pressable>
    ));

  return (
    <>
      <View style={{...stylesRoot.containerTop}}>
        <View style={{...stylesRoot.wrapperAvatarAndTheme}}>
          <Pressable
            onPress={() => {
              props.navigation.closeDrawer();
              navigation.navigate(PathsName.profile, {
                isOwnerProfile: true,
              });
            }}>
            {source ? (
              <Avatar.Image
                size={sizeAvatar}
                source={{
                  height: sizeAvatar,
                  width: sizeAvatar,
                  uri: `${REACT_APP_BASE_URL}/${source}`,
                }}
              />
            ) : (
              <Avatar.Text size={sizeAvatar} label={nameShort || '!'} />
            )}
          </Pressable>
          {themeObjState.core === 'light' ? (
            <Pressable onPress={() => changeThemeCore('dark', themeDark)}>
              <SvgMaker name="svgs_filled_theme_moon" strokeFill={'#ffffff'} />
            </Pressable>
          ) : (
            <Pressable onPress={() => changeThemeCore('light', themeLight)}>
              <SvgMaker name="svgs_filled_theme_sun" strokeFill={'#ffffff'} />
            </Pressable>
          )}
        </View>
        <View style={{...stylesRoot.wrapperNameNumberArrow}}>
          <View style={{...stylesRoot.wrapperNameNumber}}>
            <Text style={stylesRoot.topName}>{fullName}</Text>
            <Text style={stylesRoot.topNumber}>+1 (234) 567 89 01</Text>
            {/* mock */}
          </View>
          {/* <Animated.View style={{transform: [{rotate: spin}]}}> */}
          <Icon
            name="arrow-down"
            size={19}
            color="#ffffff"
            onPress={() => setIsOpenAccounts(prev => !prev)}
          />
          {/* </Animated.View> */}
        </View>
      </View>
      {isOpenAccounts ? (
        <View style={{...stylesRoot.wrapperAccounts}}>
          <View style={{...stylesRoot.wrapperMenuItem}}>
            {/* <View> */}
            <UserAvatar
              source={userInfo.avatar}
              name={fullName}
              sizeAvatar={27}
              // status={'selected'}
              // sizeBadge={10}
            />
            {/* </View> */}
            <Text style={stylesRoot.menuItemTitle}>{fullName}</Text>
          </View>
          <Pressable onPress={() => {}} style={stylesRoot.wrapperMenuItem}>
            <IconEntypo name={'plus'} color={'#868686'} size={27} />
            <Text style={stylesRoot.menuItemTitle}>{'Add account'}</Text>
          </Pressable>
          <Divider />
        </View>
      ) : null}

      <View style={{...stylesRoot.wrapperMainMenuRouts}}>
        {renderMenuItems(config.mainMenuRouts)}
      </View>
      <Divider />
      {renderMenuItems(config.otherMenuRouts)}
    </>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{paddingTop: 0}}>
      <CustomContentComponent {...props} />
    </DrawerContentScrollView>
  );
}

export default CustomDrawerContent;
