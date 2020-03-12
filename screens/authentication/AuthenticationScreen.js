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
import * as authActions from '../../store/actions/Authentication';

//import components
import Btn from '../../components/Btn';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Colors from '../../constants/Colors';

const AuthenticationScreen = props => {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //sets token on the global state, the store
  const storeToken = useSelector(state => state.authentication.token);
  const userId = useSelector(state => state.authentication.userId);

  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  //Manage whether modals are visible
  const [logInVisible, setLogInVisible] = useState(true);
  const [signUpVisible, setSignUpVisible] = useState(false);

  //Manage user login and signup data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [givenName, setGivenName] = useState('');
  const [familyName, setFamilyName] = useState('');

  //Get the route to go back to from params
  const route = props.navigation.getParam('route');

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
      if (signUpVisible) {
        await dispatch(authActions.login(email, password));
      }
      setLogInVisible(false);
      props.navigation.navigate(route);
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
      animationType="fade"
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
          onPress={() => props.navigation.navigate(route)}
        />
      </Card>
      <Btn
        title="Switch to Signup"
        onPress={() => {
          setLogInVisible(!logInVisible);
          setSignUpVisible(!signUpVisible);
        }}
      />
    </Modal>
  );

  //Content of the signup modal
  let signUpModalContent = (
    <Modal
      animationType="fade"
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
          onPress={() => props.navigation.navigate(route)}
        />
      </Card>
    </Modal>
  );

  //buttons for header
  const loginBtn = !storeToken ? (
    <TouchableOpacity onPress={() => setLogInVisible(!logInVisible)}>
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
      {loginModalContent}
      {signUpModalContent}
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

export default AuthenticationScreen;
