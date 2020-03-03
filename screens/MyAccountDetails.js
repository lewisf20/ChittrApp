import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
/* 
  This screen will deal with the user's details, allow them to update their details etc
*/

const MyAccountDetails = props => {
  //gets the global token for if the user is logged in
  const storeToken = useSelector(state => state.authentication.token);
  return (
    <View style={styles.container}>
      <Text>My Account Details Screen</Text>
      {console.log('MyAccountDetails store token = ' + storeToken)}
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
