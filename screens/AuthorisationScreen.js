import React from 'react';
import { Text, TextInput, View, Button, StyleSheet, Alert, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import Login from '../actions/Login';
import Signup from '../actions/Signup';
import Header from '../components/Header';

const AuthorisationScreen = props => {

let content = <Login />



    return (
        <View style={styles.container}>
            <Header />
            {content}
        </View>
    );
 };

const styles = StyleSheet.create({
    container: {
        flex: 1,
      }
});

export default AuthorisationScreen;