import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';

import Colors from '../constants/Colors';
import Card from '../components/Card';
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
  //grab data from navigation parameters
  const data = props.navigation.state.params;
  const item = data.item;
  //extract user id out of data - to use on user screen to get users details
  const userId = data.item.user.user_id;

  return (
    <View style={styles.container}>
      {console.log(userId)}
      {/* <ChitItem style={styles.chit} item={data.item} text={styles.text} /> */}

      <Card style={styles.nameContainer}>
        <TouchableOpacity
          style={styles.touchContainer}
          activeOpacity={0.75}
          onPress={() => props.navigation.navigate('User', {userId: userId})}>
          <View style={styles.contentInfo}>
            <Text style={styles.name}>{item.user.given_name}</Text>
          </View>
        </TouchableOpacity>
      </Card>
      <Card style={styles.chit}>
        <View style={styles.content}>
          <Text style={styles.text}>{item.chit_content}</Text>
        </View>
        <Text>{new Date(item.timestamp).toString()}</Text>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: Colors.background,
  },
  chit: {
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexGrow: 1,
  },
  touchContainer: {
    width: '100%',
    padding: 8,
  },
  nameContainer: {
    width: '90%',
    padding: 0,
  },
  content: {
    paddingVertical: 20,
  },
  text: {
    fontSize: 32,
    backgroundColor: Colors.primary,
    color: Colors.compliment,
    borderRadius: 10,
    padding: 20,
  },
  contentInfo: {
    width: '100%',
  },
  name: {
    fontSize: 34,
    fontWeight: 'bold',
    color: Colors.primary,
    textAlign: 'center',
    paddingVertical: 8,
  },
});

export default ChitScreen;
