import React from 'react';
import {Text, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import makeStyles from './styles';
import HeaderLayout from '../../../../components/header';

const Header = ({}) => {
  // HOOKS
  const theme = useTheme();

  // STYLES
  const styles = makeStyles(theme);

  return (
    <HeaderLayout
      styles={{
        container: styles.container,
        top: styles.containerTop,
      }}
      renderTopCenterComponent={() => (
        <View style={styles.wrpperSelectedAmount}>
          <Text>Header</Text>
        </View>
      )}
    />
  );
};

export default Header;
