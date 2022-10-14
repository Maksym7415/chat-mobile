import React from 'react';
import {Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from 'react-native-paper';
import makeStyles from './styles';
import HeaderLayout from '../../../../components/header';
import SvgMaker from '../../../../components/svgMaker';
import {PathsName} from '../../../../navigation/navigationConfig';

const Header = ({}) => {
  // HOOKS
  const navigation = useNavigation();
  const theme = useTheme();

  // STYLES
  const styles = makeStyles(theme);

  return (
    <HeaderLayout
      styles={{
        container: styles.container,
        top: styles.containerTop,
      }}
      renderTopLeftComponent={() => (
        <View
          onStartShouldSetResponder={() => {
            navigation.navigate(PathsName.main);
          }}>
          <SvgMaker name="svgs_filled_back_arrow" strokeFill={'#ffffff'} />
        </View>
      )}
      renderTopCenterComponent={() => (
        <View style={styles.wrapperTopCenterComponent} />
      )}
      renderTopRightComponent={() => (
        <>
          <View style={styles.wrapperAction}>
            <SvgMaker name={'svgs_line_qr_code'} strokeFill={'#ffffff'} />
          </View>
          <View style={styles.wrapperAction}>
            <SvgMaker name={'svgs_line_search'} strokeFill={'#ffffff'} />
          </View>
          <View style={{...styles.wrapperAction, ...styles.wrapperOptions}}>
            {/* <Menu
                visible={visibleOptions}
                onDismiss={closeOptions}
                anchor={
                  <View onStartShouldSetResponder={openOptions}>
                    <SvgMaker name="svgs_filled_dots" strokeFill={'#ffffff'} />
                  </View>
                }>
                <Menu.Item icon="redo" onPress={() => {}} title="Redo" />
                <Menu.Item icon="undo" onPress={() => {}} title="Undo" />
                <Menu.Item
                  icon="content-cut"
                  onPress={() => {}}
                  title="Cut"
                  disabled
                />
                <Menu.Item
                  icon="content-copy"
                  onPress={() => {}}
                  title="Copy"
                  disabled
                />
                <Menu.Item
                  icon="content-paste"
                  onPress={() => {}}
                  title="Paste"
                />
              </Menu> */}
          </View>
        </>
      )}>
      <View style={styles.content}></View>
    </HeaderLayout>
  );
};

export default Header;
