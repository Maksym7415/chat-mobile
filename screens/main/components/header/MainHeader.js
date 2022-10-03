import React from 'react';
import {useSelector} from 'react-redux';
import {Text, View} from 'react-native';
import {Menu} from 'react-native-paper';
import {mainHeader as styles} from './styles';
import {headerSelectedСhatsAmountDotsOptions} from '../../config';
import Header from '../../../../components/header';
import SvgMaker from '../../../../components/svgMaker';
import {
  selectedСhatsActions,
  actionsTypeObjectSelected,
} from '../../../../redux/app/actions';
import store from '../../../../redux/store';

const MainHeader = () => {
  // SELECTORS
  const lang = useSelector(({settingSlice}) => settingSlice.lang);
  const {selectedСhats} = useSelector(({appSlice}) => appSlice);

  const [visibleOptions, setVisibleOptions] = React.useState(true);

  // VARIABLES
  const selectedСhatsAmount = Object.keys(selectedСhats).length;

  // FUNCTIONS
  const openOptions = () => setVisibleOptions(true);
  const closeOptions = () => setVisibleOptions(false);
  const handleOptions = value => {
    console.log(value, 'value');
    closeOptions();
    store.dispatch(selectedСhatsActions(null, actionsTypeObjectSelected.clear));
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
          <View
            style={styles.wrapperClose}
            onStartShouldSetResponder={() => {
              store.dispatch(
                selectedСhatsActions(null, actionsTypeObjectSelected.clear),
              );
            }}>
            <SvgMaker name="svgs_line_bot_close" />
          </View>
        ) : (
          <View>
            <SvgMaker name="svgs_filled_menu" strokeFill={'#ffffff'} />
          </View>
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
            <View style={styles.wrapperAction}>
              <SvgMaker name="svgs_line_mute" width={27} height={27} />
            </View>
            <View style={styles.wrapperAction}>
              <SvgMaker name="svgs_line_archive" width={27} height={27} />
            </View>
            <View style={styles.wrapperAction}>
              <SvgMaker name="svgs_line_trash_bin_alt" width={27} height={27} />
            </View>
            <View style={{...styles.wrapperAction, ...styles.wrapperOptions}}>
              <Menu
                visible={visibleOptions}
                onDismiss={closeOptions}
                anchor={
                  <View onStartShouldSetResponder={openOptions}>
                    <SvgMaker name="svgs_filled_dots" />
                  </View>
                }>
                {headerSelectedСhatsAmountDotsOptions(lang).map(action => {
                  return (
                    <View
                      key={action.id}
                      style={styles.dotsOption}
                      onStartShouldSetResponder={() =>
                        handleOptions(action.value)
                      }>
                      {action.icon.name && (
                        <View style={styles.wrapperIconOption}>
                          <SvgMaker name={action.icon.name} />
                        </View>
                      )}
                      <Text>{action.title}</Text>
                    </View>
                  );
                })}
              </Menu>
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
