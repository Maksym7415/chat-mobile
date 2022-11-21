import React from 'react';
import {Text, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import makeStyles from './styles';
import Loader from '../loader';

const RenderConditionsList = ({
  list = [],
  isLoading = false,
  noResultsText = 'No results',
  styles = {
    boxCenter: {},
    noResults: {},
  },
  seettingLoader = {},
}) => {
  // HOOKS
  const theme = useTheme();

  // STYLES
  const stylesRoot = makeStyles(theme);

  // RENDER CONDITIONS
  if (isLoading) {
    return (
      <View style={{...stylesRoot.boxCenter, ...styles?.boxCenter}}>
        <Loader color={theme.colors.main} size={50} {...seettingLoader} />
      </View>
    );
  }

  if (!list.length) {
    return (
      <View style={{...stylesRoot.boxCenter, ...styles?.boxCenter}}>
        <Text style={{...stylesRoot.noResults, ...styles?.noResults}}>
          {noResultsText}
        </Text>
      </View>
    );
  }
};

export default RenderConditionsList;
