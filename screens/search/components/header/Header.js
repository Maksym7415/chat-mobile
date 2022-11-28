/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {Pressable, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {useTheme, TextInput} from 'react-native-paper';
import makeStyles from './styles';
import HeaderLayout from '../../../../components/header';
import SvgMaker from '../../../../components/svgMaker';
import {useDebounce} from '../../../../hooks';

const Header = ({
  placeholder,
  textInputProps = {},
  getRequest,
  styles,
  svgFill = '#868686',
}) => {
  // HOOKS
  const dispatch = useDispatch();
  const theme = useTheme();

  // STATES
  const [search, setSearch] = React.useState('');

  // CUSTOM HOOKS
  const debouncedSearchValue = useDebounce(search, 300);

  // STYLES
  const stylesRoot = makeStyles(theme);

  // FUNCTIONS
  const clearSearch = () => {
    setSearch('');
  };
  const onChangeText = value => {
    setSearch(value);
  };

  // USEEFFECTS
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
        container: stylesRoot.container,
        top: stylesRoot.containerTop,
        ...styles?.headerLayout,
      }}
      svgMakerOptions={{
        strokeFill: svgFill,
      }}
      renderTopCenterComponent={() => (
        <View style={stylesRoot.wrpperSelectedAmount}>
          <TextInput
            style={{...stylesRoot.input, ...styles?.input}}
            secureTextEntry={false}
            onChangeText={onChangeText}
            value={search}
            placeholder={placeholder}
            dense={true}
            underlineColor="transparent"
            onBlur={() => console.log('onBlur')}
            autoFocus={true}
            {...textInputProps}
          />
        </View>
      )}
      renderTopRightComponent={() =>
        search ? (
          <Pressable onPress={clearSearch}>
            <SvgMaker name="svgs_filled_cross" strokeFill={svgFill} />
          </Pressable>
        ) : null
      }
    />
  );
};

export default Header;
