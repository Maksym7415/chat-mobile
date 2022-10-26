/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, Pressable} from 'react-native';
import {useTheme} from 'react-native-paper';
import makeStyles from './styles';

const RITitleWithSubtitleAndRightComponent = ({
  title = '',
  subTitle = '',
  renderRightComponent = null,
  onPressWrapperItemLeft = () => {},
  styles = {
    wrapperItem: {},
    wrapperItemLeft: {},
    title: {},
    subTitle: {},
  },
}) => {
  // HOOKS
  const theme = useTheme();

  // STYLES
  const stylesRoot = makeStyles(theme);

  return (
    <View
      style={{
        ...stylesRoot.wrapperItem,
        justifyContent: renderRightComponent ? 'space-between' : null,
        ...styles.wrapperItem,
      }}>
      <Pressable
        onPress={onPressWrapperItemLeft}
        style={{...stylesRoot.wrapperItemLeft, ...styles.wrapperItemLeft}}>
        <Text style={{...stylesRoot.title, ...styles.title}}>{title}</Text>
        {subTitle ? (
          <Text style={{...stylesRoot.subTitle, ...styles.subTitle}}>
            {subTitle}
          </Text>
        ) : null}
      </Pressable>
      {renderRightComponent ? renderRightComponent() : null}
    </View>
  );
};
export default RITitleWithSubtitleAndRightComponent;
