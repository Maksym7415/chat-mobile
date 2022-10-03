import * as React from 'react';
import {View} from 'react-native';
import {useTheme, Avatar, Badge} from 'react-native-paper';
import makeStyles from './styles';
import {REACT_APP_BASE_URL} from '../../../config/constants/url';
import {getNameShort} from '../../../helpers';
import BangeUserAvatar from '../../banges/bangeUserAvatar';

// test
import IMAGE from '../../../assets/img';

const UserAvatar = ({
  sizeAvatar = 58,
  source,
  status = '',
  sizeBadge = 18,
  isImage,
  name = '',
  defaultNameAvatar = 'Chat',
  isSelected,
}) => {
  // HOOKS
  const theme = useTheme();

  // STYLES
  const styles = makeStyles(theme);

  // VARIABLES
  const nameShort = name ? getNameShort(name) : null;

  return (
    <View style={styles.container}>
      {source ? (
        <Avatar.Image
          size={sizeAvatar}
          source={
            source
              ? {
                  height: sizeAvatar,
                  width: sizeAvatar,
                  uri: `${REACT_APP_BASE_URL}/${source}`,
                }
              : IMAGE.emptyNotifications
          }
        />
      ) : (
        <Avatar.Text size={sizeAvatar} label={nameShort || defaultNameAvatar} />
      )}

      {['online', 'selected'].includes(status) && (
        <BangeUserAvatar
          typeBange={isSelected ? 'selected' : status}
          sizeBadge={sizeBadge}
          styles={{
            badge: {
              bottom: -1,
            },
          }}
        />
      )}
    </View>
  );
};

export default UserAvatar;
