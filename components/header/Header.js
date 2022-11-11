import React from 'react';
import {Appbar, useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import makeStyles from './styles';
import {View, Pressable} from 'react-native';
import SvgMaker from '../svgMaker';

const Header = ({
  renderTopLeftComponent,
  renderTopCenterComponent,
  renderTopRightComponent,
  title = 'title',
  styles,
  children,
  navigationAlternativeBack,
  svgMakerOptions = {
    strokeFill: '#ffffff',
  },
}) => {
  // HOOKS
  const theme = useTheme();
  const navigation = useNavigation();

  // STYLES
  const stylesRoot = makeStyles(theme);

  return (
    <Appbar.Header style={{...stylesRoot.container, ...styles?.container}}>
      <View style={{...stylesRoot.top, ...styles?.top}}>
        {renderTopLeftComponent ? (
          renderTopLeftComponent()
        ) : (
          <Pressable
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              } else {
                navigationAlternativeBack && navigationAlternativeBack();
              }
            }}>
            <SvgMaker
              name="svgs_filled_back_arrow"
              strokeFill={svgMakerOptions.strokeFill}
            />
          </Pressable>
        )}
        {renderTopCenterComponent ? (
          renderTopCenterComponent()
        ) : (
          <Appbar.Content title={title} />
        )}
        {renderTopRightComponent ? renderTopRightComponent() : null}
      </View>
      {children}
    </Appbar.Header>
  );
};

export default Header;
