/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {useTheme} from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import {View, Dimensions, Text, Pressable} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import makeStyles from './styles';
import * as config from './config';

const {width: screenWidth} = Dimensions.get('window');

const FilesProfile = ({
  files = {
    media: [],
    files: [],
    links: [],
    music: [],
    voice: [],
    gif: [],
  },
  styles = {
    container: {},
    wrapperTabs: {},
    wrapper: {},
  },
}) => {
  // HOOKS
  const theme = useTheme();

  // REFS
  const carouselRef = React.useRef(null);

  // STYLES
  const stylesRoot = makeStyles(theme);

  // SELECTORS
  const lang = useSelector(({settingSlice}) => settingSlice.lang);

  // STATES
  const [indexSelected, setIndexSelected] = React.useState(0);
  const [data, setData] = React.useState([]);

  // FUNCTIONS
  const onSelect = indexSelected => {
    setIndexSelected(indexSelected);
  };

  const onSelectTab = tab => {
    const selectedIndex = data.findIndex(item => item.type === tab.type);
    carouselRef.current.snapToItem(selectedIndex);
    setIndexSelected(selectedIndex);
  };

  // FINCTIONS
  React.useEffect(() => {
    const dataLocal = [];
    files.media.length &&
      dataLocal.push({...config.tabMedia(lang), data: files.media});
    files.files.length &&
      dataLocal.push({...config.tabFiles(lang), data: files.files});
    files.links.length &&
      dataLocal.push({...config.tabLinks(lang), data: files.links});
    files.music.length &&
      dataLocal.push({...config.tabMusic(lang), data: files.music});
    files.voice.length &&
      dataLocal.push({...config.tabVoice(lang), data: files.voice});
    files.gif.length &&
      dataLocal.push({...config.tabGif(lang), data: files.gif});
    setData(dataLocal);
  }, [files]);

  // RENDERS
  const renderItem = ({item}) => {
    return (
      <ScrollView
        style={{...stylesRoot.wrapper, ...styles.wrapper}}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {(() => {
          switch (item.type) {
            case 'media':
              return <Text>{item.title}</Text>;
            case 'files':
              return <Text>{item.title}</Text>;
            case 'links':
              return <Text>{item.title}</Text>;
            case 'music':
              return <Text>{item.title}</Text>;
            case 'voice':
              return <Text>{item.title}</Text>;
            case 'gif':
              return <Text>{item.title}</Text>;
            default:
              return <Text>default</Text>;
          }
        })()}
      </ScrollView>
    );
  };

  return (
    <View style={{...stylesRoot.container, ...styles.container}}>
      <ScrollView
        style={{...stylesRoot.wrapperTabs, ...styles.wrapperTabs}}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {data.map((tab, index) => (
          <Pressable
            onPress={() => onSelectTab(tab)}
            key={index}
            style={stylesRoot.tab}>
            <Text
              style={{
                ...stylesRoot.tabTitle,
                color: index === indexSelected ? '#3B94D0' : '#9B9B9B',
              }}>
              {tab.title}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
      <Carousel
        ref={carouselRef}
        layout="default"
        sliderWidth={screenWidth}
        currentIndex={indexSelected}
        activeDotIndex={indexSelected}
        itemWidth={screenWidth}
        data={data}
        renderItem={renderItem}
        onSnapToItem={index => onSelect(index)}
        inactiveSlideScale={1}
      />
    </View>
  );
};

export default FilesProfile;
