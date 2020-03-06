import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityComponent,
} from 'react-native';
import {useSelector} from 'react-redux';
/* 
  This screen will show another users profile, listing their chits, how many
  following and followers they have got. It will also include links to a list of
  who their followers and following are.
  A button to follow/unfollow this particular user will also be on this page.
*/
import Btn from '../components/Btn';

const UserScreen = props => {
  //gets the global token for if the user is logged in
  const storeToken = useSelector(state => state.authentication.token);

  //get params
  const username = props.navigation.getParam('username');
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.picContainer}>
          <View style={styles.temp}></View>
          <Text>@{username}</Text>
          <Btn title="follow" />
        </View>
        <View style={styles.followActions}>
          <TouchableOpacity>
            <Text>105 Followers</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>132 Following</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.chitsContainer}></View>
    </View>
  );
};

UserScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('username'),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    flex: 1 / 4,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderColor: 'red',
    padding: 15,
  },
  chitsContainer: {
    borderWidth: 1,
    borderColor: 'blue',
  },
  picContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  followActions: {
    flexDirection: 'row',
    width: '55%',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  temp: {
    height: 75,
    width: 75,
    backgroundColor: 'blue',
  },
});

export default UserScreen;
