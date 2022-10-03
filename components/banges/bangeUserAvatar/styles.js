import {StyleSheet} from 'react-native';

const defaultContainder = theme => ({
  position: 'absolute',
  bottom: 0,
  right: 0,
  borderWidth: 3,
  borderColor: theme.colors.white1,
  backgroundColor: theme.colors.green_bright1,
});

export default theme =>
  StyleSheet.create({
    badge: {
      ...defaultContainder(theme),
    },
    selected: {
      ...defaultContainder(theme),
      borderRadius: 15,
    },
  });
