import SafariView from 'react-native-safari-view';
import {Platform, Linking} from 'react-native';

export const openURL = ({URL}) => {
  if (Platform.OS === 'ios') {
    SafariView.show({
      url: URL,
    });
  } else {
    Linking.openURL(URL);
  }
};

export const openNumber = ({Number}) => {
  Linking.openURL(`tel:${Number}`);
};
