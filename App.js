import React, {Component} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';

//redux imports
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';

//import reducers
import authorisationReducer from './store/reducers/Authentication';
import userManagementReducer from './store/reducers/UserManagement';
import chitManagementReducer from './store/reducers/ChitManagement';

import MainNavigation from './navigation/MainNavigation';

const rootReducer = combineReducers({
  authentication: authorisationReducer,
  userManagement: userManagementReducer,
  chitManagement: chitManagementReducer,
});

//Redux store - stores all state to be used app wide
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <MainNavigation />
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
