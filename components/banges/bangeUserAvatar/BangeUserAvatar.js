import * as React from 'react';
import makeStyles from './styles';
import {View} from 'react-native';
import {useTheme, Badge} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

const BangeUserAvatar = ({visible, typeBange, sizeBadge, styles}) => {
  // HOOKS
  const theme = useTheme();

  // STYLES
  const stylesRoot = makeStyles(theme);

  return (() => {
    switch (typeBange) {
      case 'online':
        return (
          <Badge
            size={sizeBadge || 18}
            style={{...stylesRoot.badge, ...styles?.badge}}
          />
        );
      case 'selected':
        return (
          <View style={{...stylesRoot.selected}}>
            <Icon name="checkmark" size={19} color="#ffffff" />
          </View>
        );

      default:
        return <></>;
    }
  })();
};

export default BangeUserAvatar;
