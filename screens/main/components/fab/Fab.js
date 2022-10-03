/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {useDispatch} from 'react-redux';
import {useTheme, FAB} from 'react-native-paper';
import makeStyles from './styles';

const Fab = () => {
  // HOOKS
  const dispatch = useDispatch();
  const theme = useTheme();

  // STYLES
  const styles = makeStyles(theme);

  // STATES
  const [stateFab, setStateFab] = React.useState({open: false});

  // FUNCTIONS
  const onStateChange = ({open}) => setStateFab({open});

  return (
    <FAB.Group
      open={stateFab.open}
      labelStyle={'red'}
      icon={stateFab.open ? 'calendar-today' : 'plus'}
      fabStyle={styles.fabStyle}
      color={'#ffffff'}
      actions={[
        {icon: 'plus', onPress: () => console.log('Pressed add')},
        {
          icon: 'star',
          label: 'Star',
          onPress: () => console.log('Pressed star'),
        },
        {
          icon: 'email',
          label: 'Email',
          onPress: () => console.log('Pressed email'),
        },
        {
          icon: 'bell',
          label: 'Remind',
          onPress: () => console.log('Pressed notifications'),
          small: false,
        },
      ]}
      onStateChange={onStateChange}
      onPress={() => {
        if (stateFab.open) {
          // do something if the speed dial is open
        }
      }}
    />
  );
};

export default Fab;
