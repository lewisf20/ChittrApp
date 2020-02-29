import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';


//bring in header 
import Header from '../components/Header.js';

const Profile = props => {

  return (
    <React.Fragment>
      <Header />
      <View style={styles.container}>
        <Text>Profile</Text>
      </View>
    </React.Fragment>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default withNavigation(Profile);
