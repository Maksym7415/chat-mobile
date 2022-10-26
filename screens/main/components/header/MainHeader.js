import React from 'react';
import {useSelector} from 'react-redux';
import {Text, View, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Menu} from 'react-native-paper';
import {mainHeader as styles} from './styles';
import {headerSelectedСhatsAmountDotsOptions} from './config';
import Header from '../../../../components/header';
import SvgMaker from '../../../../components/svgMaker';
import MenuPaper from '../../../../components/menu/menuPaper';
import {
  selectedСhatsActions,
  actionsTypeObjectSelected,
} from '../../../../redux/app/actions';
import store from '../../../../redux/store';

const MainHeader = () => {
  const navigation = useNavigation();

  // SELECTORS
  const lang = useSelector(({settingSlice}) => settingSlice.lang);
  const {selectedСhats} = useSelector(({appSlice}) => appSlice);

  const [visibleOptions, setVisibleOptions] = React.useState(false);

  // VARIABLES
  const selectedСhatsAmount = Object.keys(selectedСhats).length;

  const handleOptions = value => {
    setVisibleOptions(false);
    // store.dispatch(selectedСhatsActions(null, actionsTypeObjectSelected.clear));
  };

  return (
    <Header
      styles={
        selectedСhatsAmount
          ? {
              container: styles.selectedСhatsAmountContainer,
            }
          : null
      }
      renderTopLeftComponent={() =>
        selectedСhatsAmount ? (
          <Pressable
            style={styles.wrapperClose}
            onPress={() => {
              store.dispatch(
                selectedСhatsActions(null, actionsTypeObjectSelected.clear),
              );
            }}>
            <SvgMaker name="svgs_line_bot_close" />
          </Pressable>
        ) : (
          <Pressable
            onPress={() => {
              navigation.toggleDrawer();
            }}>
            <SvgMaker name="svgs_filled_menu" strokeFill={'#ffffff'} />
          </Pressable>
        )
      }
      renderTopCenterComponent={() =>
        selectedСhatsAmount ? (
          <View style={styles.wrpperSelectedAmount}>
            <Text>{selectedСhatsAmount}</Text>
          </View>
        ) : (
          <View style={styles.wrapperTitle}>
            <Text style={styles.title}>Telegram</Text>
          </View>
        )
      }
      renderTopRightComponent={() =>
        selectedСhatsAmount ? (
          <View style={styles.wrapperActions}>
            <Pressable
              style={styles.wrapperAction}
              // onPress={() => setVisibleOptions(true)}
            >
              <SvgMaker name="svgs_line_mute" width={27} height={27} />
            </Pressable>
            <View style={styles.wrapperAction}>
              <SvgMaker name="svgs_line_archive" width={27} height={27} />
            </View>
            <View style={styles.wrapperAction}>
              <SvgMaker name="svgs_line_trash_bin_alt" width={27} height={27} />
            </View>
            <View style={{...styles.wrapperAction, ...styles.wrapperOptions}}>
              <MenuPaper
                setShowMenu={setVisibleOptions}
                showMenu={visibleOptions}>
                {headerSelectedСhatsAmountDotsOptions(lang).map(action => {
                  return (
                    <Pressable
                      key={action.id}
                      style={styles.dotsOption}
                      onPress={() => handleOptions(action.value)}>
                      {action.icon.name && (
                        <View style={styles.wrapperIconOption}>
                          <SvgMaker name={action.icon.name} />
                        </View>
                      )}
                      <Text>{action.title}</Text>
                    </Pressable>
                  );
                })}
              </MenuPaper>
            </View>
          </View>
        ) : (
          <View style={styles.wrapperSearch}>
            <SvgMaker
              name={'svgs_line_search'}
              strokeFill={'#ffffff'}
              strokeWidth={'2'}
            />
          </View>
        )
      }
    />
  );
};

export default MainHeader;
