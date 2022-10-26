import * as React from 'react';
import {Pressable} from 'react-native';
import {useTheme, Menu} from 'react-native-paper';
import makeStyles from './styles';
import SvgMaker from '../../svgMaker';
import {useEffect} from 'react';

const MenuPaper = ({showMenu, setShowMenu, anchor, children}) => {
  // HOOKS
  const theme = useTheme();

  // STYLES
  const styles = makeStyles(theme);

  // STATES
  const [visibleOptions, setVisibleOptions] = React.useState(false);

  // FUNCTIONS
  const openOptions = () => {
    setShowMenu && setShowMenu(true);
    setVisibleOptions(true);
  };
  const closeOptions = () => {
    setShowMenu && setShowMenu(false);
    setVisibleOptions(false);
  };

  useEffect(() => {
    if (typeof showMenu === 'boolean') {
      !showMenu && visibleOptions && setVisibleOptions(false);
      showMenu && !visibleOptions && setVisibleOptions(true);
    }
  }, [showMenu, visibleOptions]);

  return (
    <Menu
      visible={visibleOptions}
      onDismiss={closeOptions}
      anchor={
        <Pressable onPress={openOptions}>
          {anchor?.component ? (
            anchor.component
          ) : (
            <SvgMaker name="svgs_filled_dots" strokeFill={anchor?.strokeFill} />
          )}
        </Pressable>
      }>
      {children}
    </Menu>
  );
};

export default MenuPaper;
