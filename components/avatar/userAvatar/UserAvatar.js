import * as React from 'react';
import {View} from 'react-native';
import makeStyles from './styles';
import {useTheme, Avatar, Badge} from 'react-native-paper';
import {getNameShort} from '../../../helpers';

// test
import IMAGE from '../../../assets/img';

const UserAvatar = ({
  sizeAvatar = 58,
  source,
  status = 'online',
  sizeBadge = 18,
  isImage,
  name = '',
  defaultNameAvatar = 'Chat',
}) => {
  // HOOKS
  const theme = useTheme();

  // STYLES
  const styles = makeStyles(theme);

  // VARIABLES
  const nameShort = name ? getNameShort(name) : null;

  return (
    <View style={styles.container}>
      {isImage ? (
        <Avatar.Image
          size={sizeAvatar}
          source={
            source
              ? {
                  height: sizeAvatar,
                  width: sizeAvatar,
                  uri: source,
                }
              : IMAGE.emptyNotifications
          }
        />
      ) : (
        <Avatar.Text size={sizeAvatar} label={nameShort || defaultNameAvatar} />
      )}

      {['online'].includes(status) && (
        <Badge size={sizeBadge} style={styles.badge} />
      )}
    </View>
  );
};

export default UserAvatar;
