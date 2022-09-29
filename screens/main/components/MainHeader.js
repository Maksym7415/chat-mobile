import React from 'react';
import {useSelector} from 'react-redux';
import {Text, View} from 'react-native';
import {mainHeader as styles} from './styles';
import Header from '../../../components/header';
import {
  selectedСhatsActions,
  actionsTypeObjectSelected,
} from '../../../redux/app/actions';
import store from '../../../redux/store';

const MainHeader = ({}) => {
  // SELECTORS
  const lang = useSelector(({settingSlice}) => settingSlice.lang);
  const {selectedСhats} = useSelector(({appSlice}) => appSlice);

  // VARIABLES
  const selectedСhatsAmount = Object.keys(selectedСhats).length;

  return (
    <Header
      styles={
        selectedСhatsAmount
          ? {
              container: styles.selectedСhatsAmountContainer,
            }
          : null
      }>
      <View style={styles.container}>
        {selectedСhatsAmount ? (
          <>
            <View style={styles.wrapperClose}>
              <Text
                onPress={() =>
                  store.dispatch(
                    selectedСhatsActions(null, actionsTypeObjectSelected.clear),
                  )
                }>
                Close
              </Text>
            </View>
            <View style={styles.wrpperSelectedAmount}>
              <Text>{selectedСhatsAmount}</Text>
            </View>
            <View style={styles.wrapperActions}>
              <View style={styles.wrapperAction}>
                <Text>Mute</Text>
              </View>
              <View style={styles.wrapperAction}>
                <Text>arh</Text>
              </View>
              <View style={styles.wrapperAction}>
                <Text>Del</Text>
              </View>
              <View style={{...styles.wrapperAction, ...styles.wrapperOptions}}>
                <Text>options</Text>
              </View>
            </View>
          </>
        ) : (
          <>
            <View style={styles.wrapperBurger}>
              <Text>Burger</Text>
            </View>
            <View style={styles.wrapperTitle}>
              <Text>Chats</Text>
            </View>
            <View style={styles.wrapperSearch}>
              <Text>Search</Text>
            </View>
          </>
        )}
      </View>
    </Header>
  );
};

export default MainHeader;
