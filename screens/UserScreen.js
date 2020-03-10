import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Modal,
  ScrollView,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as userActions from '../store/actions/UserManagement';
/* 
  This screen will show another users profile, listing their chits, how many
  following and followers they have got. It will also include links to a list of
  who their followers and following are.
  A button to follow/unfollow this particular user will also be on this page.
*/
import Colors from '../constants/Colors';
import Card from '../components/Card';
import Btn from '../components/Btn';
import ChitItem from '../components/ChitItem';

const UserScreen = props => {
  const dispatch = useDispatch();
  //gets the global token for if the user is logged in
  const storeToken = useSelector(state => state.authentication.token);
  const loggedInUserId = useSelector(state => state.authentication.userId);
  const userData = useSelector(state => state.userManagement.userData);
  const userChits = userData.recent_chits; // array of recent_chit objects
  const [chitsLoaded, setChitsLoaded] = useState(false);

  //Get follower and following lists and lengths
  const followers = useSelector(state => state.userManagement.followerList);
  const following = useSelector(state => state.userManagement.followingList);
  const followerLength = followers.length;
  const followingLength = following.length;

  //state for if followers or following has been pressed
  const [followersPressed, setFollowersPressed] = useState(false);
  const [followingPressed, setFollowingPressed] = useState(false);

  //get params
  const username = props.navigation.getParam('username');
  const userId = props.navigation.getParam('userId');

  //get user details if userid or username is changed
  useEffect(() => {
    getUserDetailsHandler();
  }, [userId, username]);

  const getUserDetailsHandler = async () => {
    try {
      await dispatch(userActions.getUser(userId));
      await dispatch(userActions.getFollowers(userId));
      await dispatch(userActions.getFollowing(userId));
    } catch (err) {
      console.log(err);
    }
    setChitsLoaded(true);
  };

  const followUserHandler = async () => {
    try {
      await dispatch(userActions.followUser(userId, storeToken));
    } catch (err) {
      console.log(err);
    }
  };

  const unfollowUserHandler = async () => {
    try {
      await dispatch(userActions.unfollowUser(userId, storeToken));
    } catch (err) {
      console.log(err);
    }
  };

  const renderChitItem = itemData => (
    <TouchableOpacity
      style={{borderBottomWidth: 2, borderColor: '#cbcbcb', padding: 10}}
      activeOpacity={0.75}
      onPress={() =>
        props.navigation.navigate('Chit', {
          item: itemData.item,
          username: username,
        })
      }>
      <ChitItem item={itemData.item} username={username} />
    </TouchableOpacity>
  );

  let followerBtnContent;

  //if not logged in, cant see a button button
  //if already following, show unfollow button
  //if userId is same as the persons logged in, don't show a button
  if (!storeToken) {
    followerBtnContent = null;
  } else if (userId === loggedInUserId) {
    followerBtnContent = null;
  } else if (followers.some(user => user.user_id === loggedInUserId)) {
    followerBtnContent = (
      <Btn
        title="unfollow"
        style={styles.unfollowBtn}
        onPress={unfollowUserHandler}
      />
    );
  } else {
    followerBtnContent = (
      <Btn
        title="follow"
        style={styles.followBtn}
        onPress={followUserHandler}
      />
    );
  }

  let modalContent;

  //if followers have been pressed, return something else
  if (followersPressed) {
    modalContent = (
      <Modal
        animationType="slide"
        transparent={false}
        visible={followersPressed}>
        <View style={styles.container}>
          <View style={styles.followContainer}>
            <FlatList
              contentContainerStyle={styles.list}
              keyExtractor={item => item.user_id.toString()}
              data={followers}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={{
                    borderBottomWidth: 2,
                    borderColor: '#cbcbcb',
                    padding: 10,
                  }}
                  activeOpacity={0.75}
                  onPress={() => {
                    setFollowersPressed(false);
                    props.navigation.navigate('User', {
                      item: item,
                      username: item.given_name,
                      userId: item.user_id,
                    });
                  }}>
                  <Card style={styles.userCard}>
                    <Text style={styles.username}>@{item.given_name}</Text>
                  </Card>
                </TouchableOpacity>
              )}
            />
          </View>
          <Btn title="back" onPress={() => setFollowersPressed(false)} />
        </View>
      </Modal>
    );
  }

  //if followers have been pressed, return something else
  if (followingPressed) {
    modalContent = (
      <Modal
        animationType="slide"
        transparent={false}
        visible={followingPressed}>
        <View style={styles.container}>
          <View style={styles.followContainer}>
            <FlatList
              contentContainerStyle={styles.list}
              keyExtractor={item => item.user_id.toString()}
              data={following}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={{
                    borderBottomWidth: 2,
                    borderColor: '#cbcbcb',
                    padding: 10,
                  }}
                  activeOpacity={0.75}
                  onPress={() => {
                    setFollowingPressed(false);
                    props.navigation.navigate('User', {
                      item: item,
                      username: item.given_name,
                      userId: item.user_id,
                    });
                  }}>
                  <Card style={styles.userCard}>
                    <Text style={styles.username}>@{item.given_name}</Text>
                  </Card>
                </TouchableOpacity>
              )}
            />
          </View>
          <Btn title="back" onPress={() => setFollowingPressed(false)} />
        </View>
      </Modal>
    );
  }

  return (
    <View style={styles.container}>
      {modalContent}
      <View style={styles.profileContainer}>
        <View style={styles.picContainer}>
          <View style={styles.temp}></View>
          <Text>@{username}</Text>
          {followerBtnContent}
          {console.log('followers string = ' + JSON.stringify(followers))}
        </View>
        <View style={styles.followActions}>
          <TouchableOpacity onPress={() => setFollowersPressed(true)}>
            <Text>{followerLength} Followers</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFollowingPressed(true)}>
            <Text>{followingLength} Following</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.chitsContainer}>
        {!chitsLoaded ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <FlatList
            contentContainerStyle={styles.list}
            keyExtractor={item => item.chit_id.toString()}
            data={userChits}
            renderItem={renderChitItem}
          />
        )}
      </View>
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
    borderColor: Colors.background,
    padding: 15,
  },
  chitsContainer: {
    flex: 3 / 4,
  },
  followContainer: {
    flex: 1,
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
  list: {
    flexGrow: 1,
  },
  temp: {
    height: 75,
    width: 75,
    backgroundColor: 'blue',
  },
  followBtn: {
    height: 40,
  },
  unfollowBtn: {
    height: 40,
    backgroundColor: Colors.cancel,
  },
  userCard: {
    width: '100%',
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
  },
});

export default UserScreen;
