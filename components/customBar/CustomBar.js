import React from 'react';
import {useTheme} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView, StatusBar, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import makeStyles from './styles';

const CustomStatusBar = () => {
  // HOOKS
  const theme = useTheme();
  const {top} = useSafeAreaInsets();

  // SELECTORS
  const {
    settingStatusBar: {backgroundColor, barStyle},
  } = useSelector(({appSlice}) => appSlice);

  // STYLES
  // const stylesRoot = makeStyles(theme);

  StatusBar.setBarStyle(barStyle, true);

  return (
    <View style={{height: StatusBar.currentHeight || top, backgroundColor}}>
      <SafeAreaView>
        <StatusBar translucent backgroundColor={backgroundColor} />
      </SafeAreaView>
    </View>
  );
};
export default CustomStatusBar;
