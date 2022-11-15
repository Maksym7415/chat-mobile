/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {useTheme} from 'react-native-paper';
import makeStyles from './styles';
import Header from './components/header';

const Contacts = ({}) => {
  // HOOKS
  const theme = useTheme();

  // STYLES
  const styles = makeStyles(theme);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Text>Contacts</Text>
    </SafeAreaView>
  );
};

export default Contacts;
