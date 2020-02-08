import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

import AppNavigator from './navigation/AppNavigator';
import Login from './components/Login';

export default function App() {
  return(
    <Login />
  );
}
