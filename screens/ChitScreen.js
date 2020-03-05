import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

import Colors from '../constants/Colors';
import ChitItem from '../components/ChitItem';
import {DrawerRouter} from 'react-navigation-drawer';
/* 
  This screen will show another users profile, listing their chits, how many
  following and followers they have got. It will also include links to a list of
  who their followers and following are.
  A button to follow/unfollow this particular user will also be on this page.
*/

const ChitScreen = props => {
  //gets the global token for if the user is logged in
  const storeToken = useSelector(state => state.authentication.token);
  const data = props.navigation.state.params;

  return (
    <View style={styles.container}>
      <ChitItem item={data.item} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

export default ChitScreen;
