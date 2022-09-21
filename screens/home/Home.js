import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';

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

const styles = StyleSheet.create({});

export default Home;
