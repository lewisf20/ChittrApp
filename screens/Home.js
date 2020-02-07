import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

//Pull screen name component
import ScreenName from '../components/ScreenName.js';

//bring in header 
import Header from '../components/Header.js';

export default class ScreenOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  static navigationOptions = {

  };

  render() {
    return (
      <React.Fragment>
        <Header />
        <View style={styles.container}>
          <ScreenName name={'Home screen'} /* pass the prop */ />
        </View>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

