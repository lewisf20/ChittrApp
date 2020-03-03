import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
//import components
import Btn from '../components/Btn';
/* 
  This screen will deal with the user's own profile, listing their chits, followers
  and who they're following, their account photo, and links to update their profile 
  information.
*/

const MyAccount = props => {
  //gets the global token for if the user is logged in
  const storeToken = useSelector(state => state.authentication.token);
  return (
    <View style={styles.container}>
      <Text>My account screen</Text>
      {console.log('MyAccount store token = ' + storeToken)}
      <Btn
        title="Account Details"
        onPress={() => {
          props.navigation.navigate('AccountDetails');
        }}
      />
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

export default MyAccount;
