import React from 'react';
import {Text, View, Pressable} from 'react-native';
import {useTheme, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import makeStyles from './styles';
import HeaderLayout from '../../../../components/header';
import SvgMaker from '../../../../components/svgMaker';
import store from '../../../../redux/store';
import {PathsName} from '../../../../navigation/navigationConfig';

const Header = ({}) => {
  // HOOKS
  const theme = useTheme();
  const navigation = useNavigation();

  // STYLES
  const styles = makeStyles(theme);

  // STATES
  const [openSearchInput, setOpenSearchInput] = React.useState(false);
  // const [search, setSearch] = React.useState('');

  // // FUNCTIONS
  // const clearSearch = () => {
  //   setSearch('');
  // };
  // const onChangeText = value => {
  //   setSearch(value);
  // };

  // RENDERS
  const renderTopLeftComponent = () => {
    return (
      <Pressable
        onPress={() => {
          // if (openSearchInput) {
          //   return setOpenSearchInput(false);
          // }
          if (navigation.canGoBack()) {
            navigation.goBack();
          } else {
            // navigation.navigate(PathsName.chat, routeParams.additionalData);
          }
        }}>
        <SvgMaker name="svgs_filled_back_arrow" strokeFill={'#ffffff'} />
      </Pressable>
    );
  };

  const renderTopCenterComponent = () => {
    return openSearchInput ? (
      <View style={styles.wrapperTitle}>
        {/* <TextInput
          style={{...styles?.input}}
          secureTextEntry={false}
          onChangeText={onChangeText}
          value={search}
          placeholder={'Search'}
          dense={true}
          underlineColor="transparent"
          onBlur={() => console.log('onBlur')}
          autoFocus={true}
          placeholderTextColor="#ffffff"
        /> */}
      </View>
    ) : (
      <View style={styles.wrapperTitle}>
        <Text style={styles.title}>Contacts</Text>
      </View>
    );
  };

  const renderTopRightComponent = () => {
    return openSearchInput ? null : (
      <>
        {/* <Pressable
          style={styles.wrapperSearch}
          onPress={() => {
            setOpenSearchInput(true);
          }}>
          <SvgMaker
            name={'svgs_line_search'}
            strokeFill={'#ffffff'}
            strokeWidth={'2'}
          />
        </Pressable> */}
      </>
    );
  };

  return (
    <HeaderLayout
      styles={{
        container: styles.container,
        top: styles.containerTop,
      }}
      renderTopLeftComponent={renderTopLeftComponent}
      renderTopCenterComponent={renderTopCenterComponent}
      renderTopRightComponent={renderTopRightComponent}
    />
  );
};

export default Header;
