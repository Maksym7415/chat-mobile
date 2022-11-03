/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {Divider, useTheme, Switch} from 'react-native-paper';
import makeStyles from './styles';
import makeStylesListMenu from '../listMenu/styles';
import RITitleWithSubtitleAndRightComponent from '../../../../components/rendersItem/RITitleWithSubtitleAndRightComponent';
import {TYPES_CONVERSATIONS} from '../../../../config/constants/general';

const MainInfo = ({typeProfile}) => {
  // HOOKS
  const theme = useTheme();

  // STYLES
  const styles = makeStyles(theme);
  const stylesListMenu = makeStylesListMenu(theme);

  // SELECTORS
  const {lang} = useSelector(({settingSlice}) => settingSlice);

  // STATES
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  // FUNCTIONS
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <View style={{...stylesListMenu.wrapperList, marginTop: 0}}>
      {(() => {
        switch (typeProfile) {
          case TYPES_CONVERSATIONS.dialog:
            return (
              <>
                <Text style={stylesListMenu.listTitle}>Data</Text>
                <View style={stylesListMenu.list}>
                  <RITitleWithSubtitleAndRightComponent
                    title={'+1 (234) 567 89 01*'}
                    subTitle={'Phone number'}
                    styles={{
                      wrapperItem: {
                        paddingLeft: 0,
                      },
                    }}
                  />
                  <Divider style={styles.divider} />
                  <RITitleWithSubtitleAndRightComponent
                    title={`I'm fine and you?*`}
                    subTitle={'About myself'}
                    styles={{
                      wrapperItem: {
                        paddingLeft: 0,
                      },
                    }}
                  />
                  <Divider style={styles.divider} />
                  <RITitleWithSubtitleAndRightComponent
                    title={'@voidrainbow*'}
                    subTitle={'Pseudonym'}
                    styles={{
                      wrapperItem: {
                        paddingLeft: 0,
                      },
                    }}
                  />
                </View>
                <Divider style={styles.divider} />
              </>
            );
          case TYPES_CONVERSATIONS.group:
            return (
              <>
                <Text style={stylesListMenu.listTitle}>Вescription</Text>
                <View style={stylesListMenu.list}>
                  <RITitleWithSubtitleAndRightComponent
                    title={
                      'a spoken or written representation or account of a person, object, or event.*'
                    }
                    styles={{
                      wrapperItem: {
                        paddingLeft: 0,
                      },
                    }}
                  />
                </View>
                <Divider style={styles.divider} />
              </>
            );
          default:
            return <></>;
        }
      })()}
      <RITitleWithSubtitleAndRightComponent
        title={'Notification'}
        subTitle={isSwitchOn ? 'enabled' : 'turned off'}
        styles={{
          wrapperItem: {
            paddingLeft: 0,
          },
        }}
        renderRightComponent={() => {
          return (
            <View style={styles.wrapperNotification}>
              <Divider style={styles.dividerNotification} />
              <Switch
                value={isSwitchOn}
                onValueChange={onToggleSwitch}
                style={styles.switchNotification}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

export default MainInfo;
