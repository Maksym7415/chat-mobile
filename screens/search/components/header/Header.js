/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {Pressable, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {useTheme, TextInput} from 'react-native-paper';
import makeStyles from './styles';
import HeaderLayout from '../../../../components/header';
import SvgMaker from '../../../../components/svgMaker';
import {useDebounce} from '../../../../hooks';

const Header = ({placeholder, textInputProps = {}, getRequest}) => {
  // HOOKS
  const dispatch = useDispatch();
  const theme = useTheme();

  // STATES
  const [search, setSearch] = React.useState('');

  // CUSTOM HOOKS
  const debouncedSearchValue = useDebounce(search, 500);

  // STYLES
  const styles = makeStyles(theme);

  const clearSearch = () => {
    setSearch('');
  };
  const onChangeText = value => {
    setSearch(value);
  };

  React.useEffect(() => {
    getRequest &&
      dispatch(
        getRequest({
          params: {
            search: debouncedSearchValue,
          },
        }),
      );
  }, [debouncedSearchValue]);

  return (
    <HeaderLayout
      styles={{
        container: styles.container,
        top: styles.containerTop,
      }}
      svgMakerOptions={{
        strokeFill: '#868686',
      }}
      renderTopCenterComponent={() => (
        <View style={styles.wrpperSelectedAmount}>
          <TextInput
            style={styles.input}
            secureTextEntry={false}
            onChangeText={onChangeText}
            value={search}
            placeholder={placeholder}
            dense={true}
            underlineColor="transparent"
            {...textInputProps}
          />
        </View>
      )}
      renderTopRightComponent={() =>
        search ? (
          <Pressable onPress={clearSearch}>
            <SvgMaker name="svgs_filled_cross" />
          </Pressable>
        ) : null
      }
    />
  );
};

export default Header;
