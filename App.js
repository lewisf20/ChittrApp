import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

import AppNavigator from './navigation/AppNavigator';
import Signup from './actions/Signup';
import Login from './actions/Login';



export default function App() {
  return(
    <View style={styles.container}>
      <AppNavigator />
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    justifyContent: 'center'
  }
});
