/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, Image, FlatList} from 'react-native';
import {useTheme} from 'react-native-paper';
import makeStyles from './styles';
import BottomSheetRoot from '../../../../components/customBottomSheet';
import {flatListFormatDataColumns} from '../../../../helpers';
import IMAGE from '../../../../assets/img';

const BottomSheet = ({refBottomSheet, closeTranslateYBottomSheet}) => {
  // HOOKS
  const theme = useTheme();

  // STYLES
  const styles = makeStyles(theme);
  const [currentHeight, setСurrentHeight] = React.useState(
    closeTranslateYBottomSheet,
  );

  // STATES
  const [files, setFiles] = React.useState([
    {
      id: 0,
      image: IMAGE.wallPaper,
    },
    {
      id: 1,
      image: IMAGE.wallPaper,
    },
    {
      id: 2,
      image: IMAGE.wallPaper,
    },
    {
      id: 3,
      image: IMAGE.wallPaper,
    },
    {
      id: 4,
      image: IMAGE.wallPaper,
    },
    {
      id: 5,
      image: IMAGE.wallPaper,
    },
    {
      id: 6,
      image: IMAGE.wallPaper,
    },
    {
      id: 7,
      image: IMAGE.wallPaper,
    },
    {
      id: 8,
      image: IMAGE.wallPaper,
    },
    {
      id: 9,
      image: IMAGE.wallPaper,
    },
    {
      id: 10,
      image: IMAGE.wallPaper,
    },
    {
      id: 11,
      image: IMAGE.wallPaper,
    },
    {
      id: 12,
      image: IMAGE.wallPaper,
    },
    {
      id: 13,
      image: IMAGE.wallPaper,
    },
    {
      id: 14,
      image: IMAGE.wallPaper,
    },
    {
      id: 15,
      image: IMAGE.wallPaper,
    },
    {
      id: 16,
      image: IMAGE.wallPaper,
    },
    {
      id: 17,
      image: IMAGE.wallPaper,
    },
    {
      id: 18,
      image: IMAGE.wallPaper,
    },
    {
      id: 19,
      image: IMAGE.wallPaper,
    },
    {
      id: 20,
      image: IMAGE.wallPaper,
    },
  ]);

  // FUNCTIONS
  const renderItem = ({item, index}) => {
    return (
      <View style={styles.wrapperFile}>
        <Image style={styles.image} source={item.image} />
      </View>
    );
  };

  return (
    <BottomSheetRoot
      ref={refBottomSheet}
      closeTranslateYBottomSheet={closeTranslateYBottomSheet}
      setСurrentHeight={setСurrentHeight}>
      <View style={styles.container}>
        <Text style={styles.title}>Select a photo or video</Text>
        <View
          style={{
            ...styles.wrapper,
            height:
              Math.abs(currentHeight) > closeTranslateYBottomSheet
                ? Math.abs(currentHeight) - 180
                : closeTranslateYBottomSheet - 180,
          }}>
          <FlatList
            data={flatListFormatDataColumns(files, 3)}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns={3}
          />
        </View>
      </View>
    </BottomSheetRoot>
  );
};

export default BottomSheet;
