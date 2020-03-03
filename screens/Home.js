import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Alert,
  FlatList,
  ScrollView,
} from 'react-native';

//bring in custom components
import Colors from '../constants/Colors';
import Btn from '../components/Btn';
import Card from '../components/Card';
import Input from '../components/Input';
import ChitItem from '../components/ChitItem';

/*
  This is the Home screen, where chits are loaded into a list, also user should 
  be able to signup and login from this page. The chits shown depend on whether the user
  is logged in or not.
*/

const Home = props => {
  //###################### MANAGE STATE #######################

  //Manage whether modals are visible
  const [logInVisible, setLogInVisible] = useState(false);
  const [signUpVisible, setSignUpVisible] = useState(false);

  //Manage user login and signup data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [token, setToken] = useState('None Set');
  const [givenName, setGivenName] = useState('');
  const [familyName, setFamilyName] = useState('');

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //State to hold chits
  const [chitData, setChitData] = useState([]);

  //run get chits every time Islogged in is changed
  useEffect(() => {
    getChits();
  }, [isLoggedIn]);

  //#################### MODAL CONTENT ############################

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
        <Text style={styles.titleText}>Chittr</Text>
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

        <Btn
          style={styles.cardButton}
          title="Log in"
          onPress={() => {
            login();
            console.log('Token = ' + token);
          }}
        />
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
        <Text style={styles.titleText}>Chittr</Text>
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
              signup();
            }
          }}
        />
        <Btn
          style={{...styles.cardButton, backgroundColor: Colors.cancel}}
          title="Cancel"
          onPress={() => setSignUpVisible(!signUpVisible)}
        />
      </Card>
    </Modal>
  );

  const renderChitItem = itemData => <ChitItem item={itemData.item} />;

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
        <Btn
          title="Log out"
          style={styles.button}
          onPress={() => {
            logout();
            console.log('Token = ' + token);
            //getChits();
          }}
        />
      </View>
    );
  }

  //#######################################################################
  //###################### RETURN #########################################
  return (
    <ScrollView style={styles.screen}>
      {loginModalContent}
      {signUpModalContent}
      {console.log('Inside return token = ' + token)}
      <View style={styles.welcomeContainer}>
        <Card>
          <Text style={styles.welcomeText}>Welcome{' ' + email}!</Text>
          <Btn
            title="UserScreen"
            style={styles.cardButton}
            onPress={() => {
              props.navigation.navigate('User');
            }}
          />
        </Card>
        {buttonContent}
        <Card>
          <Text style={styles.welcomeText}>Chits</Text>

          <FlatList
            keyExtractor={item => item.chit_id.toString()}
            data={chitData}
            renderItem={renderChitItem}
          />
        </Card>
      </View>
    </ScrollView>
  );

  //#########################################################################
  //#################### NETWORK FUNCTIONS ##################################

  //Login function
  async function login() {
    return fetch('http://10.0.2.2:3333/api/v0.0.5/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then(response => {
        console.log('status code: ' + response.status);
        //check response code, if okay return response else throw error
        if (response.ok) {
          return response.json();
        } else {
          networkErrorHandler();
        }
      })
      .then(response => {
        //Response should now be in right format to use
        console.log(response);

        //get response values for id and token
        var respToken = response['token'];

        //set token state to response token val
        setToken(respToken);
        //Set logged in to true
        setIsLoggedIn(true);

        //Handle the login - set required state etc
        loginSuccessHandler(respToken);
      })
      .catch(error => {
        //Handle a network error or wrong credential
        networkErrorHandler();
      });
  }

  async function logout() {
    return fetch('http://10.0.2.2:3333/api/v0.0.5/logout', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Authorization': token,
      },
    })
      .then(response => {
        console.log('status code: ' + response.status);
        //check response code, if okay return response else throw error
        if (response.ok) {
          setIsLoggedIn(false);
          setToken('logged out none set');
          setEmail('');
        } else {
          console.error(error);
        }
      })
      .catch(error => {
        //Handle a network error or wrong credential
        console.error(error);
      });
  }

  //Signup function
  async function signup() {
    return fetch('http://10.0.2.2:3333/api/v0.0.5/user', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        given_name: givenName,
        family_name: familyName,
        email: email,
        password: password,
      }),
    })
      .then(response => {
        console.log('status code: ' + response.status);
        //check response code, if okay return response else throw error
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Response not OK');
        }
      })
      .then(response => {
        //Response should now be in right format to use
        console.log(response);
        Alert.alert('Signup Success');
        //On successful signup, log the user in
        login();
      })
      .catch(error => {
        console.error(error);
      });
  }

  async function getChits() {
    var headers = {};
    if (isLoggedIn) {
      headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Authorization': token,
      };
    } else {
      headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
    }
    return fetch('http://10.0.2.2:3333/api/v0.0.5/chits', {
      method: 'GET',
      headers: headers,
    })
      .then(response => {
        console.log('status code: ' + response.status);
        //check response code, if okay return response else throw error
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Response not OK');
        }
      })
      .then(response => {
        //Response should now be in right format to use
        console.log(response);
        setChitData(response.reverse());
        //console.log('chitData = ' + chitData[4].chit_content);
      })
      .catch(error => {
        console.error(error);
      });
  }

  //Network error handler
  function networkErrorHandler() {
    Alert.alert('Error', 'Email or Password incorrect.', [
      {
        text: 'Okay',
        onPress: () => {
          setLogInVisible(false);
          setSignUpVisible(false);
        },
      },
    ]);
  }

  //Login success handler
  function loginSuccessHandler(token) {
    Alert.alert(
      'Log in Success',
      'Your email: ' + email + '\nYour token: ' + token,
      [
        {
          text: 'Okay',
          onPress: () => {
            setLogInVisible(false);
            setSignUpVisible(false);
          },
        },
      ],
    );
  }
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
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
  listContainer: {
    flex: 1,
    width: '100%',
    height: 300,
    backgroundColor: 'red',
  },
  list: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});

export default Home;
