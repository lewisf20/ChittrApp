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

  //sets token on the global state, the store
  const storeToken = useSelector(state => state.authentication.token);
  const loggedInidUser = useSelector(state => state.authentication.idUser);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [userData, setUserData] = useState({});
  const [name, setName] = useState('');
  const [chits, setChits] = useState([]);

  //alert the user to an error on login or signup
  useEffect(() => {
    if (error) {
      Alert.alert('An error has occured', error, [{text: 'okay'}]);
    }
  }, [error]);

  useEffect(() => {
    if (!storeToken) return;
    else {
      setIsLoading(true);
      getUserData();
      setIsLoading(false);
    }
  }, [storeToken]);

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

  const getUserData = async () => {
    const response = await fetch(
      `http://10.0.2.2:3333/api/v0.0.5/user/${loggedInidUser}`,
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

  if (isLoading) {
    return (
      <View style={styles.loggedOutScreen}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.picContainer}>
          <View style={styles.temp}></View>
          <Text>@{name}</Text>
        </View>
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

export default MyAccount;
