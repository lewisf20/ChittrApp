import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

//import components
import Btn from '../components/Btn';
/* 
  This screen will deal with the user's own profile, listing their chits, followers
  and who they're following, their account photo, and links to update their profile 
  information.
*/

const MyAccount = props => {
  return (
    <View style={styles.container}>
      <Text>My account screen</Text>
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
