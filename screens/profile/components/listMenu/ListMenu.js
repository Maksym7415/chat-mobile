/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, Pressable} from 'react-native';
import {useSelector} from 'react-redux';
import {Divider, useTheme} from 'react-native-paper';
import makeStyles from './styles';
import SvgMaker from '../../../../components/svgMaker';
import {uuid} from '../../../../helpers';

const ListMenu = ({title, list, onPress}) => {
  // HOOKS
  const theme = useTheme();

  // STYLES
  const styles = makeStyles(theme);

  // SELECTORS
  const {lang} = useSelector(({settingSlice}) => settingSlice);

  // FUNCTIONS
  const ListItem = ({item}) => {
    return (
      <Pressable
        onPress={() => onPress(item)}
        style={styles.wrapperListItem}
        disabled={item.disabled}>
        {item.icon?.name && <SvgMaker name={item.icon?.name} />}
        <Text style={styles.listItemTitle}>{item.title}</Text>
      </Pressable>
    );
  };

  // VARIABLES
  const items = list(lang);

  return (
    <View style={styles.wrapperList}>
      <Text style={styles.listTitle}>{title}</Text>
      <View style={styles.list}>
        {items.map((item, index) => {
          return items.length > index + 1 ? (
            <React.Fragment key={uuid()}>
              <ListItem item={item} />
              <Divider style={styles.divider} />
            </React.Fragment>
          ) : (
            <ListItem item={item} key={uuid()} />
          );
        })}
      </View>
    </View>
  );
};

export default ListMenu;
