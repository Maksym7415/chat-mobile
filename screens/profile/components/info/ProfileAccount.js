/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, Pressable, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {Divider, useTheme} from 'react-native-paper';
import makeStyles from './styles';
import makeStylesListMenu from '../ListMenu/styles';

const ProfileAccount = ({isPhotos}) => {
  // HOOKS
  const theme = useTheme();

  // STYLES
  const styles = makeStyles(theme);
  const stylesListMenu = makeStylesListMenu(theme);

  // SELECTORS
  const {lang} = useSelector(({settingSlice}) => settingSlice);

  return (
    <View style={{...stylesListMenu.wrapperList, marginTop: isPhotos ? 0 : 12}}>
      <Text style={stylesListMenu.listTitle}>Account</Text>
      <View style={stylesListMenu.list}>
        <TouchableOpacity style={styles.wrapperItemAccount}>
          <Text style={styles.title}>+1 (234) 567 89 01*</Text>
          <Text style={styles.subTitle}>Tap to change phone number</Text>
        </TouchableOpacity>
        <Divider style={styles.divider} />
        <Pressable
          onPress={() => console.log('item')}
          style={styles.wrapperItemAccount}>
          <Text style={styles.title}>@voidvoidvoidvoidvoid*</Text>
          <Text style={styles.subTitle}>Username</Text>
        </Pressable>
        <Divider style={styles.divider} />
        <Pressable style={styles.wrapperItemAccount}>
          <Text style={styles.title}>@voidrainbow*</Text>
          <Text style={styles.subTitle}>Bio</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ProfileAccount;
