import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as authActions from '../store/actions/Authentication';
import Authentication from '../store/reducers/Authentication';
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
  //set state which goes into store state first

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //sets token on the global state, the store
  const storeToken = useSelector(state => state.authentication.token);

  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  //Manage whether modals are visible
  const [logInVisible, setLogInVisible] = useState(false);
  const [signUpVisible, setSignUpVisible] = useState(false);

  //Manage user login and signup data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [givenName, setGivenName] = useState('');
  const [familyName, setFamilyName] = useState('');

  //alert the user to an error on login or signup
  useEffect(() => {
    if (error) {
      Alert.alert('An error has occured', error, [{text: 'okay'}]);
    }
  }, [error]);

  //This handles logging in and signing up
  const authHandler = async () => {
    let action;
    //set action depends on if login modal or signup modal is open
    if (logInVisible) {
      action = authActions.login(email, password);
    } else if (signUpVisible) {
      action = authActions.signup(email, password, givenName, familyName);
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      setLogInVisible(false);
      props.navigation.navigate('Home');
      setIsLoggedIn(true);
    } catch (err) {
      setError(err.message);
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

  //Content of the login modal
  let loginModalContent = (
    <Modal
      animationType="slide"
      transparent={false}
      visible={logInVisible}
      onRequestClose={() => {
        setLogInVisible(!logInVisible);
      }}>
      <Card style={styles.card}>
        <Input
          style={styles.cardInput}
          placeholder="email..."
          onChangeText={email => setEmail(email)}
          value={email}
        />
        <Input
          style={styles.cardInput}
          placeholder="password..."
          secureTextEntry={true}
          onChangeText={password => setPassword(password)}
          value={password}
        />

        {isLoading ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Btn style={styles.cardButton} title="Log in" onPress={authHandler} />
        )}

        <Btn
          style={{...styles.cardButton, backgroundColor: Colors.cancel}}
          title="Cancel"
          onPress={() => setLogInVisible(!logInVisible)}
        />
      </Card>
    </Modal>
  );

  //Content of the signup modal
  let signUpModalContent = (
    <Modal
      animationType="slide"
      transparent={false}
      visible={signUpVisible}
      onRequestClose={() => {
        setSignUpVisible(!signUpVisible);
      }}>
      <Card style={styles.card}>
        <Input
          style={styles.cardInput}
          placeholder="email..."
          onChangeText={email => setEmail(email)}
          value={email}
        />
        <Input
          style={styles.cardInput}
          placeholder="password..."
          secureTextEntry={true}
          onChangeText={password => setPassword(password)}
          value={password}
        />
        <Input
          style={styles.cardInput}
          placeholder="repeat password..."
          secureTextEntry={true}
          onChangeText={repeatPassword => setRepeatPassword(repeatPassword)}
          value={repeatPassword}
        />
        <Input
          style={styles.cardInput}
          placeholder="first name..."
          onChangeText={givenName => setGivenName(givenName)}
          value={givenName}
        />
        <Input
          style={styles.cardInput}
          placeholder="last name..."
          onChangeText={familyName => setFamilyName(familyName)}
          value={familyName}
        />
        {isLoading ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Btn
            style={styles.cardButton}
            title="Sign Up"
            onPress={() => {
              //Check if passwords match
              if (password !== repeatPassword) {
                Alert.alert('Passwords do not match!');
                //Clear password input fields by resetting state
                setPassword('');
                setRepeatPassword('');
              } else {
                authHandler();
              }
            }}
          />
        )}

        <Btn
          style={{...styles.cardButton, backgroundColor: Colors.cancel}}
          title="Cancel"
          onPress={() => setSignUpVisible(!signUpVisible)}
        />
      </Card>
    </Modal>
  );

  let buttonContent;

  if (!isLoggedIn) {
    buttonContent = (
      <View style={styles.buttonContainer}>
        <Btn
          title="Log in"
          style={styles.button}
          onPress={() => setLogInVisible(true)}
        />
        <Btn
          title="Sign up"
          style={styles.button}
          onPress={() => setSignUpVisible(true)}
        />
      </View>
    );
  } else {
    buttonContent = (
      <View style={styles.buttonContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Btn
            title="Log out"
            style={styles.button}
            onPress={() => {
              logOutHandler();
            }}
          />
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>My account screen</Text>
      {buttonContent}
      {loginModalContent}
      {signUpModalContent}
      {console.log('STORE TOKEN = ' + storeToken)}
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
