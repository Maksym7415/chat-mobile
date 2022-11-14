/* eslint-disable react-hooks/exhaustive-deps */
import React, {useLayoutEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {useTheme} from 'react-native-paper';
import makeStyles from './styles';
import Header from './components/header';
import SearchMain from './components/searchMain';
import SearchProfile from './components/searchProfile';
import {getSearchContactRequest} from '../../redux/search/requests';
import {TYPES_FROM_TO_SEARCH_SCREEN} from '../../config/constants/general';

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
      styles: {
        headerLayout: {},
      },
    },
  });

  // VARIABLES
  const routeParams = route.params;

  // USEEFFECTS
  useLayoutEffect(() => {
    // set setting options from screen
    switch (routeParams?.from) {
      case TYPES_FROM_TO_SEARCH_SCREEN.main:
        return setSettings(prev => ({
          header: {
            placeholder: 'Search',
            getRequest: getSearchContactRequest,
          },
        }));
      case TYPES_FROM_TO_SEARCH_SCREEN.profile:
        return setSettings(prev => ({
          header: {
            placeholder: 'Search settings and questions',
            getRequest: null,
            styles: {
              headerLayout: {container: {backgroundColor: '#517DA2'}},
              // input: {color: '#ffffff'},
            },
            svgFill: '#ffffff',
            textInputProps: {
              placeholderTextColor: '#ffffff',
              activeUnderlineColor: '#ffffff',
            },
          },
        }));
      default:
        return null;
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        placeholder={settings.header.placeholder}
        getRequest={settings.header.getRequest}
        textInputProps={settings.header.textInputProps}
        styles={settings.header.styles}
        svgFill={settings.header?.svgFill || '#868686'}
      />
      {(() => {
        switch (routeParams?.from) {
          case TYPES_FROM_TO_SEARCH_SCREEN.main:
            return <SearchMain />;
          case TYPES_FROM_TO_SEARCH_SCREEN.profile:
            return <SearchProfile />;
          default:
            return <></>;
        }
      })()}
    </SafeAreaView>
  );
};

export default Search;
