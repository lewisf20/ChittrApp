import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  TouchableOpacityBase,
} from 'react-native';

//import icons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//import redux and auth actions from store
import {useSelector, useDispatch} from 'react-redux';
import * as authActions from '../store/actions/Authentication';
import * as userActions from '../store/actions/UserManagement';
//import components
import Btn from '../components/Btn';
import ChitItem from '../components/ChitItem';
import Card from '../components/Card';
import Input from '../components/Input';
import Colors from '../constants/Colors';
/* 
  This screen will deal with the user's own profile, listing their chits, followers
  and who they're following, their account photo, and links to update their profile 
  information.
*/

const MyAccount = props => {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //gets token from the global state, the store
  const storeToken = useSelector(state => state.authentication.token);
  const idUser = useSelector(state => state.authentication.idUser);

  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [userData, setUserData] = useState({});
  const [name, setName] = useState('');
  const [chits, setChits] = useState([]);
  const [listFollowing, setListFollowing] = useState([]);
  const [listFollowers, setListFollowers] = useState([]);
  const amountFollowing = listFollowing.length;
  const amountFollowers = listFollowers.length;

  //state for if followers or following has been pressed
  const [followersPressed, setFollowersPressed] = useState(false);
  const [followingPressed, setFollowingPressed] = useState(false);

  const isFocused = props.navigation.isFocused();

  //alert the user to an error on login or signup
  useEffect(() => {
    if (error) {
      Alert.alert('An error has occured', error, [{text: 'okay'}]);
    }
  }, [error]);

  //This checks whether user navigate back to account screen, and
  // updates that screen accordingly
  useEffect(() => {
    if (storeToken) {
      const onFocusListener = props.navigation.addListener(
        'didFocus',
        payload => {
          getUserDetailsHandler();
        },
      );
      return () => {
        onFocusListener.remove();
      };
    }
  });

  //Get users data upon loading after the user has logged in
  useEffect(() => {
    if (!storeToken) return;
    else {
      getUserDetailsHandler();
    }
  }, [storeToken, followersPressed, followingPressed]);

  //Calls the functions which deal with getting the logged in
  //user's data
  const getUserDetailsHandler = async () => {
    setIsLoading(true);
    try {
      getUserData();
      getFollowers();
      getFollowing();
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const logOutHandler = async () => {
    setIsLoading(true);
    await dispatch(authActions.logout(storeToken));
    setIsLoading(false);
    setIsLoggedIn(false);
    props.navigation.navigate('Home');
  };

  //buttons for header
  const loginBtn = !storeToken ? (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate('Auth', {
          route: 'Account',
        })
      }>
      <Icon name="login" size={45} color={Colors.compliment} />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={logOutHandler}>
      <Icon name="logout" size={45} color={Colors.compliment} />
    </TouchableOpacity>
  );

  useEffect(() => {
    props.navigation.setParams({loginBtn: loginBtn});
  }, [storeToken]);

  if (!storeToken) {
    return (
      <View style={styles.loggedOutScreen}>
        <Text>Log in/Sign up to view the account tab!</Text>
        <Text></Text>
      </View>
    );
  }

  const renderChitItem = itemData => (
    <TouchableOpacity
      style={{borderBottomWidth: 2, borderColor: '#cbcbcb', padding: 10}}
      activeOpacity={0.75}>
      <ChitItem item={itemData.item} username={name} />
    </TouchableOpacity>
  );

  let modalContent;

  //if followers have been pressed, set modal content to show list
  // of followers
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
              data={listFollowers}
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

  //if following has been pressed, set modal content to list of users
  //which this particular user follows
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
              data={listFollowing}
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

  const getUserData = async () => {
    const response = await fetch(
      `http://10.0.2.2:3333/api/v0.0.5/user/${idUser}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    if (!response.ok) {
      throw new Error('response error!');
    }
    const responseData = await response.json();
    setUserData(responseData);
    setName(responseData.given_name);
    setChits(responseData.recent_chits);
  };

  const getFollowers = async () => {
    const response = await fetch(
      `http://10.0.2.2:3333/api/v0.0.5/user/${idUser}/followers`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    if (!response.ok) {
      throw new Error('response error!');
    }
    const responseData = await response.json();
    setListFollowers(responseData);
    // const responseJsonData = JSON.stringify(responseData);
    // console.log('Get followers Response = ' + responseJsonData);
  };

  const getFollowing = async () => {
    const response = await fetch(
      `http://10.0.2.2:3333/api/v0.0.5/user/${idUser}/following`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    if (!response.ok) {
      throw new Error('response error!');
    }
    const responseData = await response.json();
    setListFollowing(responseData);
    // const responseJsonData = JSON.stringify(responseData);
    // console.log('Get following Response = ' + responseJsonData);
  };

  if (isLoading) {
    return (
      <View style={styles.loggedOutScreen}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {modalContent}
      <View style={styles.profileContainer}>
        <View style={styles.picContainer}>
          <View style={styles.temp}></View>
          <Text style={styles.username}>@{name}</Text>
        </View>
        <TouchableOpacity onPress={() => setFollowersPressed(true)}>
          <Text>{amountFollowers} Followers</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFollowingPressed(true)}>
          <Text>{amountFollowing} Following</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settings}
          onPress={() =>
            props.navigation.navigate('AccountDetails', {
              userData: userData,
            })
          }>
          <Icon name="settings" size={30} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.chitsContainer}>
        <FlatList
          contentContainerStyle={styles.list}
          keyExtractor={item => item.chit_id.toString()}
          data={chits}
          renderItem={renderChitItem}
        />
      </View>
    </View>
  );
};

MyAccount.navigationOptions = navData => {
  var btn = navData.navigation.getParam('loginBtn');
  return {
    headerRight: () => btn,
  };
};

const styles = StyleSheet.create({
  loggedOutScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  tempContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer: {
    flex: 1 / 3,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: Colors.background,
    padding: 15,
  },
  chitsContainer: {
    flex: 2 / 3,
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
  userCard: {
    width: '100%',
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  settings: {
    alignSelf: 'flex-end',
  },
});

export default MyAccount;
