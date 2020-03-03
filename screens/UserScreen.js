import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
/* 
  This screen will show another users profile, listing their chits, how many
  following and followers they have got. It will also include links to a list of
  who their followers and following are.
  A button to follow/unfollow this particular user will also be on this page.
*/

const UserScreen = props => {
  //gets the global token for if the user is logged in
  const storeToken = useSelector(state => state.authentication.token);
  return (
    <View style={styles.container}>
      <Text> User screen </Text>
      {console.log('UserScreen store token = ' + storeToken)}
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

export default UserScreen;
