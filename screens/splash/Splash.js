import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import Loader from '../../components/loader';

const Splash = () => {
  return (
    <View style={styles.container}>
      <Loader
        styles={{
          text: {
            color: 'red',
          },
        }}
      />
    </View>
  );
};
export default Splash;
