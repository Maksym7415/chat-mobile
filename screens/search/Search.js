/* eslint-disable react-hooks/exhaustive-deps */
import React, {useLayoutEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {useTheme} from 'react-native-paper';
import makeStyles from './styles';
import Header from './components/header';
import SearchMain from './components/searchMain';
import {getSearchContactRequest} from '../../redux/search/requests';

const Search = ({route}) => {
  // HOOKS
  const theme = useTheme();

  // STYLES
  const styles = makeStyles(theme);

  // STATES
  const [settings, setSettings] = useState({
    header: {
      placeholder: 'Search',
      getRequest: '',
    },
  });

  // VARIABLES
  const routeParams = route.params;

  // USEEFFECTS
  useLayoutEffect(() => {
    // from main screen
    if (routeParams?.from === 'main') {
      return setSettings(prev => ({
        ...prev,
        header: {
          placeholder: 'Search',
          getRequest: getSearchContactRequest,
        },
      }));
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        placeholder={settings.header.placeholder}
        getRequest={settings.header.getRequest}
      />
      {(() => {
        switch (routeParams?.from) {
          case 'main':
            return <SearchMain />;
          default:
            return <></>;
        }
      })()}
    </SafeAreaView>
  );
};

export default Search;
