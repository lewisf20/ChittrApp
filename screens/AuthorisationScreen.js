import React, { useState } from 'react';
import { View, StyleSheet, } from 'react-native';
import Login from '../actions/Login';
import Signup from '../actions/Signup';
import Header from '../components/Header';
import Btn from '../components/Btn';

const AuthorisationScreen = props => {
    const [isLoginScreen, setIsLoginScreen] = useState(true);


    let content;
    let btnTitle;
    if (isLoginScreen) {
        content = <Login />;
        btnTitle = "Switch to Signup";
    }
    else {
        content = <Signup />;
        btnTitle = "Switch to Login";
    }



    return (
        <View style={styles.container}>
            <Header />
            {content}
            <Btn
                style={styles.button}
                title={btnTitle}
                onPress={() => setIsLoginScreen(!isLoginScreen)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        alignSelf: 'center',
        width: "80%"

    }
});

export default AuthorisationScreen;