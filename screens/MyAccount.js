import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

//import icons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//import redux and auth actions from store
import {useSelector, useDispatch} from 'react-redux';
import * as authActions from '../store/actions/Authentication';

//import components
import Btn from '../components/Btn';
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
  const userId = useSelector(state => state.authentication.userId);

  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  //alert the user to an error on login or signup
  useEffect(() => {
    if (error) {
      Alert.alert('An error has occured', error, [{text: 'okay'}]);
    }
  }, [error]);

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

  return (
    <View style={styles.container}>
      <Text>My account screen</Text>
      {/* <Icon name="login" size={50} color="blue" /> */}
      {console.log('STORE TOKEN = ' + storeToken)}
      {/* <Btn
        title="Account Details"
        onPress={() => {
          props.navigation.navigate('AccountDetails');
        }}
      /> */}
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
  screen: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: Colors.primary,
  },
  button: {
    width: '35%',
  },
  card: {
    flex: 1,
    justifyContent: 'center',
  },
  cardButton: {
    alignSelf: 'center',
  },
  cardInput: {},
  titleText: {
    color: Colors.primary,
    textAlign: 'center',
    fontSize: 52,
    paddingRight: 10,
  },
  welcomeContainer: {
    padding: 8,
    borderTopWidth: 5,
    borderTopColor: Colors.compliment,
  },
  welcomeText: {
    color: Colors.primary,
    textAlign: 'center',
    fontSize: 24,
  },
});

export default MyAccount;
