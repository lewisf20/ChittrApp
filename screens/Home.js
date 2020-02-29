import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Modal, Alert } from 'react-native';
import { withNavigation } from 'react-navigation';





//bring in header 
import Header from '../components/Header';
import Colors from '../constants/Colors';
import Btn from '../components/Btn';
import Card from '../components/Card';
import Input from '../components/Input';




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


  //#################### MODAL CONTENT ############################

  //Content of the login modal
  let loginModalContent =
    <Modal
      animationType="slide"
      transparent={false}
      visible={logInVisible}
      onRequestClose={() => {
        setLogInVisible(!logInVisible)
      }}
    >
      <Card style={styles.card}>
        <Text style={styles.titleText}>Chittr</Text>
        <Input
          style={styles.cardInput}
          placeholder="email..."
          onChangeText={(email) => setEmail(email)}
          value={email}
        />
        <Input
          style={styles.cardInput}
          placeholder="password..."
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
          value={password}
        />

        <Btn
          style={styles.cardButton}
          title="Log in"
          onPress={() => {
            login();
          }}
        />
        <Btn
          style={{...styles.cardButton, backgroundColor: Colors.cancel}}
          title="Cancel"
          onPress={() => setLogInVisible(!logInVisible)}
        />
      </Card>
    </Modal>;

  //Content of the signup modal
  let signUpModalContent =
    <Modal
      animationType="slide"
      transparent={false}
      visible={signUpVisible}
      onRequestClose={() => {
        setSignUpVisible(!signUpVisible)
      }}
    >
      <Card style={styles.card}>
        <Text style={styles.titleText}>Chittr</Text>
        <Input
          style={styles.cardInput}
          placeholder="email..."
          onChangeText={(email) => setEmail(email)}
          value={email}
        />
        <Input
          style={styles.cardInput}
          placeholder="password..."
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
          value={password}
        />
        <Input
          style={styles.cardInput}
          placeholder="repeat password..."
          secureTextEntry={true}
          onChangeText={(repeatPassword) => setRepeatPassword(repeatPassword)}
          value={repeatPassword}
        />
        <Input
          style={styles.cardInput}
          placeholder="first name..."
          onChangeText={(givenName) => setGivenName(givenName)}
          value={givenName}
        />
        <Input
          style={styles.cardInput}
          placeholder="last name..."
          onChangeText={(familyName) => setFamilyName(familyName)}
          value={familyName}
        />
        <Btn
          style={styles.cardButton}
          title="Sign Up"
          onPress={() => {
            //Check if passwords match
            if (password !== repeatPassword) {
              Alert.alert("Passwords do not match!");
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
    </Modal>;

  //#######################################################################
  //###################### RETURN #########################################
  return (

    <View style={styles.screen}>
      <Header />
      {loginModalContent}
      {signUpModalContent}
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome{" " + email}!</Text>
      </View>
      <View style={styles.mainContainer}>

      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.buttonContainer}>
          <Btn title="Log in" style={styles.button} onPress={() => setLogInVisible(true)} />
          <Btn title="Sign up" style={styles.button} onPress={() => setSignUpVisible(true)} />
        </View>
      </View>
    </View>

  );
  //#########################################################################
  //#################### NETWORK FUNCTIONS ################################## 

  //Login function
  async function login() {
    return fetch('http://10.0.2.2:3333/api/v0.0.5/login',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
      .then(response => {
        console.log("status code: " + response.status);
        //check response code, if okay return response else throw error
        if (response.ok) {
          return response.json();
        }
        else {
          networkErrorHandler();
        }

      })
      .then(response => {
        //Response should now be in right format to use
        console.log(response);

        //get response values for id and token
        var respToken = response["token"];

        //Handle the login - set required state etc
        networkSuccessHandler(respToken);

      })
      .catch((error) => {
        //Handle a network error or wrong credential
        networkErrorHandler();
      })
  }

  //Signup function
  async function signup() {
    return fetch('http://10.0.2.2:3333/api/v0.0.5/user',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          given_name: givenName,
          family_name: familyName,
          email: email,
          password: password
        })
      })
      .then(response => {
        console.log("status code: " + response.status);
        //check response code, if okay return response else throw error
        if (response.ok) {
          return response.json();
        }
        else {
          throw new Error('Response not OK');
        }

      })
      .then(response => {
        //Response should now be in right format to use
        console.log(response);
        Alert.alert("Signup Success");
        //On successful signup, log the user in
        login();
      })
      .catch((error) => {
        console.error(error);
      })
  }

  //Network error handler
  function networkErrorHandler() {
    Alert.alert(
      "Error",
      "Email or Password incorrect.",
      [
        { text: "Okay", onPress: () => { setLogInVisible(false); setSignUpVisible(false); } }
      ]
    );
  }

  //Login success handler
  function networkSuccessHandler(token) {
    Alert.alert(
      "Log in Success",
      "Your email: " + email + "\nYour token: " + token,
      [
        {
          text: "Okay", onPress: () => {
            setLogInVisible(false);
            setSignUpVisible(false);

            //set token state to these values
            setToken(token);
            //Set logged in to true
            setIsLoggedIn(true);
          }
        }
      ]
    );
  }


}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end",

  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderWidth: 2
  },
  button: {
    width: "35%"
  },
  card: {
    flex: 1,
    justifyContent: "center",
  },
  cardButton: {
    alignSelf: "center",
  },
  cardInput: {

  },
  titleText: {
    color: Colors.primary,
    textAlign: "center",
    fontSize: 52,
    paddingRight: 10
  },
  welcomeContainer: {
    padding: 8,
    backgroundColor: Colors.primary,
    borderTopWidth: 5,
    borderTopColor: Colors.compliment
  },
  welcomeText: {
    color: Colors.compliment,
    textAlign: "center",
    fontSize: 24,
  }
});

export default withNavigation(Home);