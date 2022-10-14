/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {SafeAreaView, Text, View, FlatList} from 'react-native';
import {Divider, useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import makeStyles from './styles';
import Header from './components/header';
import * as config from './config';
import SvgMaker from '../../components/svgMaker';
import {ScrollView} from 'react-native-gesture-handler';

const Profile = route => {
  // HOOKS
  const theme = useTheme();
  const navigation = useNavigation();

  // STYLES
  const styles = makeStyles(theme);

  // SELECTORS
  const {lang} = useSelector(({settingSlice}) => settingSlice);

  const isPhotos = false;

  // RENDERS
  const renderList = (
    data = {
      title: 'Settings',
      list: () => [],
      onPress: () => {},
    },
  ) => {
    const ListItem = ({item}) => {
      return (
        <View
          key={item.id}
          onStartShouldSetResponder={() => data.onPress(item)}
          style={styles.wrapperListItem}>
          {item.icon?.name && <SvgMaker name={item.icon?.name} />}
          <Text style={styles.listItemTitle}>{item.title}</Text>
        </View>
      );
    };

    return (
      <View style={styles.wrapperList}>
        <Text style={styles.listTitle}>{data.title}</Text>
        <View style={styles.list}>
          <FlatList
            ItemSeparatorComponent={() => <Divider style={styles.divider} />}
            data={data.list(lang)}
            renderItem={({item, _, separators}) => {
              return <ListItem item={item} />;
            }}
            keyExtractor={item => item.conversationId}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView>
        <View
          style={styles.wrapperSetPhoto}
          onStartShouldSetResponder={() => data.onPress(item)}>
          <SvgMaker name={'svgs_line_camera_add'} strokeFill={'#4094D0'} />
          <Text style={styles.setPhotoTitle}>Insert photo</Text>
        </View>
        <View style={{...styles.wrapperList, marginTop: isPhotos ? 0 : 12}}>
          <Text style={styles.listTitle}>Account</Text>
          <View style={styles.list}>
            <View
              // onStartShouldSetResponder={() => data.onPress(item)}
              style={styles.wrapperItemAccount}>
              <Text style={styles.title}>+1 (234) 567 89 01*</Text>
              <Text style={styles.subTitle}>Tap to change phone number</Text>
            </View>
            <Divider style={styles.divider} />
            <View
              // onStartShouldSetResponder={() => data.onPress(item)}
              style={styles.wrapperItemAccount}>
              <Text style={styles.title}>@voidvoidvoidvoidvoid*</Text>
              <Text style={styles.subTitle}>Username</Text>
            </View>
            <Divider style={styles.divider} />
            <View
              // onStartShouldSetResponder={() => data.onPress(item)}
              style={styles.wrapperItemAccount}>
              <Text style={styles.title}>@voidrainbow*</Text>
              <Text style={styles.subTitle}>Bio</Text>
            </View>
          </View>
        </View>
        {renderList({
          title: 'Settings',
          list: config.settingsList,
          onPress: item => navigation.navigate(item.path),
        })}
        {renderList({
          title: 'Help',
          list: config.helpsList,
          onPress: item => {},
        })}
        <Text style={styles.bottomText}>
          Telegram for Android v7.8.0 (2293) arm64-v8a
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
