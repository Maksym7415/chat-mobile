import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useTheme, IconButton} from 'react-native-paper';
import PropTypes from 'prop-types';
import makeStyles from './styles';

const propTypes = {
  scrollToBottom: PropTypes.func.isRequired,
};

const ScrollToBottomButton = ({scrollToBottom, styles}) => {
  //HOOKS
  const theme = useTheme();

  // STYLES
  const stylesRoot = makeStyles(theme);

  return (
    <TouchableOpacity
      onPress={scrollToBottom}
      style={{...stylesRoot.button, ...styles.button}}
      activeOpacity={0.95}>
      <IconButton icon="arrow-down" size={16} />
    </TouchableOpacity>
  );
};

ScrollToBottomButton.propTypes = propTypes;

export default ScrollToBottomButton;
