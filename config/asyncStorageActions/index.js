import AsyncStorage from '@react-native-async-storage/async-storage';

// Token
export const setTokenStorage = async token => {
  AsyncStorage.setItem('myChat_token', token);
};

export const getTokenStorage = async () => {
  return await AsyncStorage.getItem('myChat_token');
};

export const removeTokenStorage = async () => {
  return await AsyncStorage.removeItem('myChat_token');
};
