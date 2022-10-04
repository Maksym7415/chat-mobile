import React from 'react';
import {Appbar, useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import makeStyles from './styles';
import {View} from 'react-native';

const Header = ({
  renderTopLeftComponent,
  renderTopCenterComponent,
  renderTopRightComponent,
  title = 'title',
  styles,
  children,
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
          <Appbar.BackAction onPress={navigation.goBack} />
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
