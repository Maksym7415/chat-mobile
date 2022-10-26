/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {SafeAreaView, Text, View, Pressable, ScrollView} from 'react-native';
import Animated from 'react-native-reanimated';
import {Divider, useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import makeStyles from './styles';
import Header from './components/header';
import ListMenu from './components/listMenu';
import ProfileAccount from './components/profileAccount';
import BottomSheet from './components/BottomSheet';
import MainInfo from './components/mainInfo';

import * as config from './config';
import SvgMaker from '../../components/svgMaker';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

const openTranslateYBottomSheet = -400;

const Profile = route => {
  // HOOKS
  const theme = useTheme();
  const navigation = useNavigation();

  // REFS
  const refBottomSheet = React.useRef(null);

  // STYLES
  const styles = makeStyles(theme);

  // STATES
  const [showBiggerImg, setShowBiggerImg] = React.useState(false);

  // SELECTORS
  const {lang} = useSelector(({settingSlice}) => settingSlice);
  const {userInfo} = useSelector(({userSlice}) => userSlice);

  // VARIABLES
  const isOwnerProfile = true;
  const isPhotos = userInfo.userAvatar;
  // typeProfile: group, dialog, chat
  const typeProfile = 'dialog';

  // FUNCtIONS
  const singleTap = Gesture.Tap().onStart(() => {
    showBiggerImg && setShowBiggerImg(false);
  });

  return (
    <SafeAreaView style={styles.container}>
      <Header
        setShowBiggerImg={setShowBiggerImg}
        showBiggerImg={showBiggerImg}
        refBottomSheet={refBottomSheet}
        openTranslateYBottomSheet={openTranslateYBottomSheet}
        typeProfile={typeProfile}
        isOwnerProfile={isOwnerProfile}
      />

      <ScrollView style={styles.scrollView}>
        <GestureDetector gesture={Gesture.Exclusive(singleTap)}>
          <View>
            {isOwnerProfile ? (
              <>
                {!isPhotos ? (
                  <Pressable
                    style={styles.wrapperSetPhoto}
                    onPress={() =>
                      config.handleInsertPhotoVideo(
                        refBottomSheet,
                        openTranslateYBottomSheet,
                      )
                    }>
                    <SvgMaker
                      name={'svgs_line_camera_add'}
                      strokeFill={'#4094D0'}
                    />
                    <Text style={styles.setPhotoTitle}>Insert photo</Text>
                  </Pressable>
                ) : null}
                <ProfileAccount isPhotos={isPhotos} />
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
                <MainInfo typeProfile={typeProfile} />
              </>
            )}
          </View>
        </GestureDetector>
      </ScrollView>

      <BottomSheet
        refBottomSheet={refBottomSheet}
        closeTranslateYBottomSheet={openTranslateYBottomSheet}
      />
    </SafeAreaView>
  );
};

export default Profile;
