/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, Image, FlatList, ScrollView, Pressable} from 'react-native';
import {useTheme, Badge} from 'react-native-paper';
import {useSelector} from 'react-redux';
import BottomSheet, {
  BottomSheetFooter,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import makeStyles from './styles';
import * as config from './config';
import Gallery from './components/gallery';
import SvgMaker from '../../../../../../components/svgMaker';

const BottomSheetRoot = React.forwardRef(
  ({closeTranslateYBottomSheet}, ref) => {
    // HOOKS
    const theme = useTheme();

    // STYLES
    const stylesRoot = makeStyles(theme);

    // SELECTORS
    const lang = useSelector(({settingSlice}) => settingSlice.lang);

    // STATES
    const [tabSelectedType, setTabSelectedType] = React.useState(
      config.tabsFooter(lang)[0].type,
    );
    const [currentHeight, setСurrentHeight] = React.useState(
      closeTranslateYBottomSheet,
    );

    // VARIABLES
    const snapPoints = React.useMemo(() => [1, '60%', '100%'], []);
    const data = React.useMemo(
      () =>
        Array(100)
          .fill(0)
          .map((_, index) => `index-${index}`),
      [],
    );

    // FUNCTIONS
    const handleSheetChanges = React.useCallback(index => {
      console.log('handleSheetChanges', index);
    }, []);

    const onSelectTab = tab => {
      setTabSelectedType(tab.type);
      // carouselRef.current.snapToItem(selectedIndex);
      // setIndexSelected(selectedIndex);
    };
    console.log(tabSelectedType, 'tabSelectedType');
    // RENDERS
    const renderFooter = React.useCallback(
      props => (
        <BottomSheetFooter {...props} bottomInset={0}>
          <ScrollView
            style={{...stylesRoot.wrapperTabs}}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            {config.tabsFooter(lang).map((tab, index) => {
              const selected = tab.type === tabSelectedType;
              const styleInnerTabIcon = selected ? stylesRoot.innerTabIcon : {};
              return (
                <Pressable
                  onPress={() => onSelectTab(tab)}
                  key={index}
                  style={stylesRoot.tab}>
                  <View style={{...stylesRoot.wrapperTabIcon, ...tab.styles}}>
                    <View style={{...styleInnerTabIcon, borderRadius: 25}}>
                      <SvgMaker name={tab.icon.name} strokeFill={'#ffffff'} />
                    </View>
                  </View>
                  <Text
                    style={{
                      ...stylesRoot.tabTitle,
                      color: selected ? '#3B94D0' : '#9B9B9B',
                    }}>
                    {tab.title}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </BottomSheetFooter>
      ),
      [tabSelectedType],
    );

    const renderItem = React.useCallback(
      item => (
        <View key={item} style={stylesRoot.itemContainer}>
          <Text>{item}</Text>
        </View>
      ),
      [],
    );

    const renderMainContent = tabSelectedType => {
      return (() => {
        switch (tabSelectedType) {
          case config.typesTabsFooter.gallery:
            return <Gallery />;
          case config.typesTabsFooter.file:
            return <Text>{tabSelectedType}</Text>;
          case config.typesTabsFooter.location:
            return <Text>{tabSelectedType}</Text>;
          case config.typesTabsFooter.contact:
            return <Text>{tabSelectedType}</Text>;
          case config.typesTabsFooter.music:
            return <Text>{tabSelectedType}</Text>;
          default:
            return (
              <BottomSheetScrollView
                contentContainerStyle={stylesRoot.contentContainer}>
                {data.map(renderItem)}
              </BottomSheetScrollView>
            );
        }
      })();
    };

    return (
      <BottomSheet
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        dismissOnPanDown={false}
        footerComponent={renderFooter}
        onChange={handleSheetChanges}>
        {renderMainContent(tabSelectedType)}
      </BottomSheet>
    );
  },
);

export default BottomSheetRoot;
