import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

import AppNavigator from './navigation/AppNavigator';



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
    justifyContent: 'center'
  }
});
