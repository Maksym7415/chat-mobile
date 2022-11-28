/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Pressable,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import {runOnJS} from 'react-native-reanimated';
import {useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import makeStyles from './styles';
import * as config from './config';
import Header from './components/header';
import ListMenu from './components/listMenu';
import ProfileAccount from './components/profileAccount';
import MainInfo from './components/mainInfo';
import SvgMaker from '../../components/svgMaker';
// import FilesProfile from '../../components/sliders/filesProfile';
import BottomSheet from '../../components/bottomSheet';
import ImageAndDocumentPicker from '../../components/bottomSheet/components/imageAndDocumentPicker';
import {typesActionBtn} from '../../components/bottomSheet/components/imageAndDocumentPicker/config';
import {TYPES_CONVERSATIONS} from '../../config/constants/general';
import {getNameShort} from '../../helpers';

const Profile = ({route}) => {
  // HOOKS
  const theme = useTheme();
  const navigation = useNavigation();

  // REFS
  const refBottomSheet = React.useRef(null);

  // STYLES
  const styles = makeStyles(theme);

  // SELECTORS
  const {lang} = useSelector(({settingSlice}) => settingSlice);
  const {userInfo} = useSelector(({userSlice}) => userSlice);

  // STATES
  const [showBiggerImg, setShowBiggerImg] = React.useState(false);
  const [setting, setSetting] = React.useState({
    nameShort: '',
    avatar: '',
    conversationData: null,
    isOwnerProfile: false,
    typeProfile: TYPES_CONVERSATIONS.dialog,
    conversationName: '',
  });

  // FUNCtIONS
  const fSetShowBiggerImg = bool => {
    setShowBiggerImg(bool);
  };

  const singleTap = Gesture.Tap().onStart(() => {
    if (showBiggerImg) {
      runOnJS(fSetShowBiggerImg)(false);
    }
  });

  // USEEFFECTS
  React.useEffect(() => {
    let settingLocal = {
      typeProfile:
        route.params?.typeProfile?.toLowerCase() || TYPES_CONVERSATIONS.dialog,
    };

    const conversationData = route.params?.conversationData;

    if (route.params?.isOwnerProfile) {
      const fullName =
        userInfo.fullName || `${userInfo.firstName} ${userInfo.lastName}`;
      settingLocal = {
        ...settingLocal,
        nameShort: getNameShort(fullName),
        avatar: userInfo.userAvatar || '',
        conversationName: fullName,
        isOwnerProfile: true,
      };
    } else {
      settingLocal = {
        ...settingLocal,
        nameShort: getNameShort(conversationData?.conversationName),
        conversationData: conversationData || null,
        avatar: conversationData?.conversationAvatar || '',
        conversationName: conversationData?.conversationName,
        isOwnerProfile: false,
      };
    }
    setSetting(prev => ({
      ...prev,
      ...settingLocal,
    }));
  }, [route.params, userInfo]);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        setShowBiggerImg={setShowBiggerImg}
        showBiggerImg={showBiggerImg}
        refBottomSheet={refBottomSheet}
        setting={setting}
      />
      <ScrollView style={styles.scrollView}>
        <GestureDetector gesture={Gesture.Exclusive(singleTap)}>
          <View style={{flex: 1, position: 'relative'}}>
            {/* <TouchableWithoutFeedback
              accessibilityRole="button"
              onPress={() => console.log('onDismiss')}
              style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                backgroundColor: 'red',
                too: 0,
                left: 0,
              }}>
              <View
                style={
                  {
                    // width: 100,
                    // height: 100,
                    // // backgroundColor: 'transparent',
                    // backgroundColor: 'red',
                    // position: 'absolute',
                    // too: 0,
                    // left: 0,
                  }
                }
              />
            </TouchableWithoutFeedback> */}

            {/* <Pressable
              onPress={() => console.log('onDismiss')}
              style={{
                width: 100,
                height: 100,
                // backgroundColor: 'transparent',
                backgroundColor: 'red',
                position: 'absolute',
                too: 0,
                left: 0,
              }}></Pressable> */}

            {setting.isOwnerProfile ? (
              <>
                {!setting.avatar ? (
                  <Pressable
                    style={styles.wrapperSetPhoto}
                    onPress={() =>
                      config.handleInsertPhotoVideo(refBottomSheet)
                    }>
                    <SvgMaker
                      name={'svgs_line_camera_add'}
                      strokeFill={'#4094D0'}
                    />
                    <Text style={styles.setPhotoTitle}>Insert photo</Text>
                  </Pressable>
                ) : null}
                <ProfileAccount avatar={setting.avatar} userInfo={userInfo} />
                <ListMenu
                  title={'Settings'}
                  list={config.settingsList}
                  onPress={item => navigation.navigate(item.path)}
                />
                <ListMenu
                  title={'Help'}
                  list={config.helpsList}
                  onPress={item => {}}
                />
                <Text style={styles.bottomText}>
                  Telegram for Android v7.8.0 (2293) arm64-v8a
                </Text>
              </>
            ) : (
              <>
                <MainInfo typeProfile={setting.typeProfile} />
                {/* <FilesProfile
                  files={{
                    media: [{id: 1, src: 'sss'}],
                    files: [{id: 1, src: 'sss'}],
                    links: [{id: 1, src: 'sss'}],
                    music: [{id: 1, src: 'sss'}],
                    voice: [{id: 1, src: 'sss'}],
                    gif: [{id: 1, src: 'sss'}],
                  }}
                  styles={{
                    container: {marginTop: 10},
                  }}
                /> */}
              </>
            )}
          </View>
        </GestureDetector>
      </ScrollView>
      <BottomSheet ref={refBottomSheet} snapPoints={[90]}>
        <ImageAndDocumentPicker
          ref={refBottomSheet}
          exclud={[typesActionBtn.uploadFile]}
        />
      </BottomSheet>
    </SafeAreaView>
  );
};

export default React.memo(Profile);
