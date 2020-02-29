import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import Btn from '../components/Btn';


//bring in header 
import Header from '../components/Header';
import Colors from '../constants/Colors';




const Home = props => {

  function getChits() {

  }

  return (

    <View style={styles.screen}>
      <Header />
      <View style={styles.mainContainer}>
        <Text>Home</Text>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.buttonContainer}>
          <Btn title="Log in" style={styles.button} />
          <Btn title="Sign up" style={styles.button} />
        </View>
      </View>
    </View>

  );

}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end",
    
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderWidth: 2
  },
  button: {
    width: "35%"
  }
});

export default withNavigation(Home);