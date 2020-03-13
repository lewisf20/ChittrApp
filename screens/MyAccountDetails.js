import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {useSelector} from 'react-redux';

import Colors from '../constants/Colors';

//import components
import Btn from '../components/Btn';
import Card from '../components/Card';
import Input from '../components/Input';

/* 
  This screen will deal with the user's details, allow them to update their details etc
*/

const MyAccountDetails = props => {
  //gets the global token for if the user is logged in
  const token = useSelector(state => state.authentication.token);

  //get userData from param
  const userData = props.navigation.getParam('userData');
  const idUser = userData.user_id;
  const [email, setEmail] = useState(userData.email);
  const [givenName, setGivenName] = useState(userData.given_name);
  const [familyName, setFamilyName] = useState(userData.family_name);
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  //Handles the updatingof user details
  const updateDetailsHandler = () => {
    try {
      updateUser();
    } catch (err) {
      console.log(err);
    }
  };

  const updateUser = async () => {
    const response = await fetch(
      `http://10.0.2.2:3333/api/v0.0.5/user/${idUser}`,
      {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-Authorization': token,
        },
        body: JSON.stringify({
          given_name: givenName,
          family_name: familyName,
          email: email,
          password: password,
        }),
      },
    )
      .then(response => {
        Alert.alert(
          'Details updated!',
          'Press okay to go back to your profile.',
          [
            {
              text: 'Okay',
              onPress: () => {
                props.navigation.navigate('Account');
              },
            },
          ],
        );
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Details</Text>
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
        <Btn
          style={styles.cardButton}
          title="Update Details"
          onPress={() => {
            //Check if passwords match
            if (password !== repeatPassword) {
              Alert.alert('Passwords do not match!');
              //Clear password input fields by resetting state
              setPassword('');
              setRepeatPassword('');
            } else {
              updateDetailsHandler();
            }
          }}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: Colors.primary,
    fontWeight: 'bold',
  },
});

export default MyAccountDetails;
