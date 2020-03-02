import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

/* 
  This screen will deal with the user's details, allow them to update their details etc
*/

const MyAccountDetails = props => {
  return (
    <View style={styles.container}>
      <Text>My Account Details Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MyAccountDetails;
