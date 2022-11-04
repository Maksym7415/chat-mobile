/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, Pressable, Dimensions, ImageBackground} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {useDispatch, useSelector} from 'react-redux';
import {useTheme, Avatar} from 'react-native-paper';
import makeStyles from './styles';
import SvgMaker from '../../../../components/svgMaker';
import {PathsName} from '../../../../navigation/navigationConfig';
import MenuPaper from '../../../../components/menu/menuPaper';
import {REACT_APP_BASE_URL} from '../../../../config/constants/url';
import {headerOptions, headerOptionsChat, headerOptionsGroup} from './config';
import {getUserAvatars} from '../../../../redux/user/requests';
import {handleInsertPhotoVideo} from '../../config';
import {TYPES_CONVERSATIONS} from '../../../../config/constants/general';

const {width: screenWidth} = Dimensions.get('window');

const Header = ({
  setShowBiggerImg,
  showBiggerImg,
  refBottomSheet,
  openTranslateYBottomSheet,
  setting,
}) => {
  // HOOKS
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const theme = useTheme();

  // STYLES
  const styles = makeStyles(theme);

  // REFS
  const carouselRef = React.useRef(null);

  // SELECTORS
  const {avatars: userAvatars} = useSelector(({userSlice}) => userSlice);
  const lang = useSelector(({settingSlice}) => settingSlice.lang);

  // STATES
  const [images, setImages] = React.useState([]);
  const [indexSelected, setIndexSelected] = React.useState(0);
  const [visibleOptions, setVisibleOptions] = React.useState(false);

  // VARIABLES
  const sizeAvatar = 59;

  // FUNCTIONS
  const onSelect = indexSelected => {
    setIndexSelected(indexSelected);
  };

  const handleOptions = value => {
    // if (value === 'insertPhotoVideo') {
    //   const isActive = refBottomSheet?.current?.isActive();
    //   if (isActive) {
    //     refBottomSheet?.current?.scrollTo(0);
    //   } else {
    //     refBottomSheet?.current?.scrollTo(-200);
    //   }
    // }
    switch (value) {
      case 'insertPhotoVideo':
        handleInsertPhotoVideo(refBottomSheet, openTranslateYBottomSheet);
        break;

      default:
        break;
    }
    setVisibleOptions(false);
  };

  const renderItem = ({item}) => {
    return (
      <ImageBackground
        source={{uri: `${REACT_APP_BASE_URL}/${item.fileName}`}}
        style={styles.imageContainer}>
        <View style={{...styles.info, marginLeft: 0}}>
          <Text style={{...styles.userName, fontSize: 26, marginBottom: 10}}>
            {setting.conversationName}
          </Text>
          <Text style={styles.status}>online*</Text>
        </View>
      </ImageBackground>
    );
  };

  const renderIconAction = () => {
    if (
      [TYPES_CONVERSATIONS.group, TYPES_CONVERSATIONS.chat].includes(
        setting.typeProfile,
      )
    ) {
      return <></>;
    }
    return setting.avatar ? (
      <Pressable
        style={styles.wrapperSetPhoto}
        onPress={() => {
          setting.isOwnerProfile
            ? handleInsertPhotoVideo(refBottomSheet, openTranslateYBottomSheet)
            : navigation.goBack();
        }}>
        {setting.isOwnerProfile ? (
          <SvgMaker name={'svgs_line_camera_add'} />
        ) : (
          <SvgMaker name={'svgs_line_chat_2'} />
        )}
      </Pressable>
    ) : null;
  };

  const selectOptions = (typeProfile, isOwnerProfile) => {
    if (isOwnerProfile) {
      return headerOptions(lang);
    }

    switch (typeProfile) {
      case TYPES_CONVERSATIONS.chat:
        return headerOptionsChat(lang);
      case TYPES_CONVERSATIONS.group:
        return headerOptionsGroup(lang);
      default:
        return [];
    }
  };

  // USEEFFECTS
  useFocusEffect(
    React.useCallback(() => {
      if (setting.isOwnerProfile && !userAvatars.length) {
        dispatch(getUserAvatars());
      }
    }, [setting.isOwnerProfile]),
  );

  React.useEffect(() => {
    setting.avatar &&
      !images.length &&
      setImages([{id: 1, fileName: setting.avatar}]);
  }, [setting.avatar]);

  React.useEffect(() => {
    if (
      JSON.stringify(userAvatars.data) !== JSON.stringify(images) &&
      userAvatars.length &&
      setting.isOwnerProfile
    ) {
      setImages(userAvatars);
    }
  }, [userAvatars]);

  React.useEffect(() => {
    showBiggerImg && indexSelected !== 0 && setIndexSelected(0);
  }, [showBiggerImg]);

  console.log(
    selectOptions(setting.typeProfile, setting.isOwnerProfile),
    'headerOptionsChat(lang)',
  );
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.containerTop}>
          <Pressable
            onPress={() => {
              navigation.navigate(PathsName.main);
            }}>
            <SvgMaker name="svgs_filled_back_arrow" strokeFill={'#ffffff'} />
          </Pressable>
          <View style={styles.wrapperTopCenterComponent} />
          <>
            {setting.isOwnerProfile ? (
              <>
                <View style={styles.wrapperAction}>
                  <SvgMaker name={'svgs_line_qr_code'} strokeFill={'#ffffff'} />
                </View>
                <View style={styles.wrapperAction}>
                  <SvgMaker name={'svgs_line_search'} strokeFill={'#ffffff'} />
                </View>
              </>
            ) : [TYPES_CONVERSATIONS.chat].includes(setting.typeProfile) ? (
              <View style={styles.wrapperAction}>
                <SvgMaker name={'svgs_filled_pencil'} strokeFill={'#ffffff'} />
              </View>
            ) : (
              <></>
            )}
            <View style={{...styles.wrapperAction, ...styles.wrapperOptions}}>
              <MenuPaper
                setShowMenu={setVisibleOptions}
                showMenu={visibleOptions}
                anchor={{strokeFill: '#ffffff'}}>
                {selectOptions(setting.typeProfile, setting.isOwnerProfile)
                  ?.filter(item => {
                    if (item.show === 1) {
                      return true;
                    }
                    return showBiggerImg ? item.show === 2 : item.show === 3;
                  })
                  ?.map(action => {
                    return (
                      <Pressable
                        key={action.id}
                        style={styles.dotsOption}
                        onPress={() => handleOptions(action.value)}>
                        {action.icon.name && (
                          <View style={styles.wrapperIconOption}>
                            <SvgMaker name={action.icon.name} />
                          </View>
                        )}
                        <Text>{action.title}</Text>
                      </Pressable>
                    );
                  })}
              </MenuPaper>
            </View>
          </>
        </View>
        <View
          style={{
            ...styles.content,
            paddingHorizontal: showBiggerImg ? 0 : 16,
            height: showBiggerImg ? screenWidth : 100,
            backgroundColor: showBiggerImg ? 'transparent' : '#517DA2',
          }}>
          {showBiggerImg ? (
            <>
              <Carousel
                ref={carouselRef}
                layout="default"
                sliderWidth={screenWidth}
                activeDotIndex={indexSelected}
                itemWidth={screenWidth}
                data={images}
                renderItem={renderItem}
                onSnapToItem={index => onSelect(index)}
                inactiveSlideScale={1}
              />
              <Pagination
                inactiveDotColor="#3f0f08"
                dotColor={'#517DA2'}
                activeDotIndex={indexSelected}
                dotsLength={images.length}
                animatedDuration={150}
                inactiveDotScale={1}
                containerStyle={styles.paginationContainerStyle}
              />
            </>
          ) : (
            <View style={styles.wrapperAvatarAndInfo}>
              <Pressable
                style={styles.avatar}
                onPress={() => images.length && setShowBiggerImg(true)}>
                {setting.avatar ? (
                  <Avatar.Image
                    size={sizeAvatar}
                    source={{
                      height: sizeAvatar,
                      width: sizeAvatar,
                      uri: `${REACT_APP_BASE_URL}/${setting.avatar}`,
                    }}
                  />
                ) : (
                  <Avatar.Text
                    size={sizeAvatar}
                    label={setting.nameShort || '!'}
                  />
                )}
              </Pressable>
              <View style={styles.info}>
                <Text style={styles.userName}>{setting.conversationName}</Text>
                <Text style={styles.status}>online*</Text>
              </View>
            </View>
          )}
        </View>
      </View>
      {renderIconAction()}
    </View>
  );
};

export default Header;