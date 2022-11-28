/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useLayoutEffect, useState} from 'react';
import {SafeAreaView, Keyboard, Pressable} from 'react-native';
import {useTheme} from 'react-native-paper';
import makeStyles from './styles';
import Header from './components/header';
import SearchMain from './components/searchMain';
import SearchProfile from './components/searchProfile';
import {TYPES_FROM_TO_SEARCH_SCREEN} from '../../config/constants/general';
import {getSearchContactRequest} from '../../redux/search/requests';

const Search = ({route}) => {
  // HOOKS
  const theme = useTheme();

  // STYLES
  const styles = makeStyles(theme);

  // STATES
  const [settings, setSettings] = useState({
    noSettings: true,
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
    console.log('render - useLayoutEffect');
    switch (routeParams?.from) {
      case TYPES_FROM_TO_SEARCH_SCREEN.main:
        return setSettings(() => ({
          header: {
            placeholder: 'Search',
            getRequest: getSearchContactRequest,
          },
        }));
      case TYPES_FROM_TO_SEARCH_SCREEN.profile:
        return setSettings(() => ({
          header: {
            placeholder: 'Search settings and questions',
            getRequest: null,
            styles: {
              headerLayout: {container: {backgroundColor: theme.colors.main}},
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

  if (settings.noSettings) {
    return <></>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        placeholder={settings.header.placeholder}
        getRequest={settings.header.getRequest}
        textInputProps={settings.header.textInputProps}
        styles={settings.header.styles}
        svgFill={settings.header?.svgFill || '#868686'}
      />
      <Pressable onPress={Keyboard.dismiss} style={{flex: 1}}>
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
      </Pressable>
    </SafeAreaView>
  );
};

export default Search;
