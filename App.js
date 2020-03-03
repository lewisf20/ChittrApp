import React, {Component} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';

//redux imports
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';

import authorisationReducer from './store/reducers/Authentication';
import MainNavigation from './navigation/MainNavigation';

const rootReducer = combineReducers({
  authentication: authorisationReducer,
});

//Redux store - stores all state to be used app wide
const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <MainNavigation />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
