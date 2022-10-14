/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Animated, Easing} from 'react-native';
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
import {PathsName} from '../navigationConfig';

function CustomContentComponent({}) {
  // HOOKS
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

  const source = userInfo.Avatar;
  const nameShort = userInfo.fullName ? getNameShort(userInfo.fullName) : null;
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
      <View
        key={item.id}
        onStartShouldSetResponder={() =>
          handleMenuAction(item.navigatePathName)
        }
        style={stylesRoot.wrapperMenuItem}>
        <SvgMaker name={item.icon.name} />
        <Text style={stylesRoot.menuItemTitle}>{item.title}</Text>
      </View>
    ));

  return (
    <>
      <View style={{...stylesRoot.containerTop}}>
        <View style={{...stylesRoot.wrapperAvatarAndTheme}}>
          <View
            onStartShouldSetResponder={() => {
              navigation.navigate(PathsName.profile);
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
          </View>
          {themeObjState.core === 'light' ? (
            <SvgMaker name="svgs_filled_theme_moon" strokeFill={'#ffffff'} />
          ) : (
            <SvgMaker name="svgs_filled_theme_sun" strokeFill={'#ffffff'} />
          )}
        </View>
        <View style={{...stylesRoot.wrapperNameNumberArrow}}>
          <View style={{...stylesRoot.wrapperNameNumber}}>
            <Text style={stylesRoot.topName}>{userInfo.fullName}</Text>
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
              name={userInfo.fullName}
              sizeAvatar={27}
              // status={'selected'}
              // sizeBadge={10}
            />
            {/* </View> */}
            <Text style={stylesRoot.menuItemTitle}>{userInfo.fullName}</Text>
          </View>
          <View
            onStartShouldSetResponder={() => {}}
            style={stylesRoot.wrapperMenuItem}>
            <IconEntypo name={'plus'} color={'#868686'} size={27} />
            <Text style={stylesRoot.menuItemTitle}>{'Add account'}</Text>
          </View>
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
