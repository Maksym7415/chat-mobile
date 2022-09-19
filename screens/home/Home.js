import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

const Home = () => {
  const isDarkMode = useColorScheme() === 'dark';

  console.log('hello');
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text style={{height: 100, backgroundColor: 'red'}}>Home !!!!</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Home;
