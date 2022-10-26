/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, Pressable, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {Divider, useTheme} from 'react-native-paper';
import makeStyles from './styles';
import makeStylesListMenu from '../listMenu/styles';
import RITitleWithSubtitleAndRightComponent from '../../../../components/rendersItem/RITitleWithSubtitleAndRightComponent';

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
        <RITitleWithSubtitleAndRightComponent
          title={'+1 (234) 567 89 01*'}
          subTitle={'Tap to change phone number'}
          styles={{
            wrapperItem: {
              paddingLeft: 0,
            },
          }}
        />
        <Divider style={styles.divider} />
        <RITitleWithSubtitleAndRightComponent
          title={'@voidvoidvoidvoidvoid*'}
          subTitle={'Username'}
          styles={{
            wrapperItem: {
              paddingLeft: 0,
            },
          }}
        />
        <Divider style={styles.divider} />
        <RITitleWithSubtitleAndRightComponent
          title={'@voidrainbow*'}
          subTitle={'Bio'}
          styles={{
            wrapperItem: {
              paddingLeft: 0,
            },
          }}
        />
      </View>
    </View>
  );
};

export default ProfileAccount;
