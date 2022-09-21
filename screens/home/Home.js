import React from 'react';
import styles from './styles';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';

const Home = () => {
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

export default Home;
