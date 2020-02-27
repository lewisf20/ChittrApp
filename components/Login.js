import React, { Component } from 'react';
import { Text, TextInput, View, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';


class Login extends Component {
    constructor(props) {
        super(props);

        //components state
        this.state = {
            email: '',
            password: '',
        };
        this.login = this.login.bind(this);
    }


    /**{
  "given_name": "Lewis",
  "family_name": "Frater",
  "email": "LewisFrater@gmail.com",
  "password": "lewis1234"
} */


    async login() {
        return fetch('http://10.0.2.2:3333/api/v0.0.5/login',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password
                })
            })
            .then(response => response.json())
            .then(response => {
                //Response should now be in right format to use
                console.log(response);
            })
            .catch((error) => {
                console.error(error);
            })
    }



    render() {
        return (
            <View style={styles.screen}>

                <TextInput
                    style={styles.input}
                    placeholder="email..."
                    onChangeText={(email) => this.setState({ email })}
                    value={this.state.email}
                />
                <TextInput
                    style={styles.input}
                    placeholder="password..."
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password })}
                    value={this.state.password}
                />

                <TouchableOpacity
                    style={styles.button}
                    title="Log in"
                    onPress={() => this.login()}
                ><Text style={styles.btnText}>Log in</Text>
                </TouchableOpacity>

            </View>
        );
    }

}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#cbcbcb",
        justifyContent: "center"
    },
    input: {
        backgroundColor: "#fff",
        fontSize: 24,
        margin: 5,
        textAlign: "center",
        borderBottomWidth: 5,
        borderColor: "skyblue"
    },
    button: {
        backgroundColor: "skyblue",
        width: "50%",
        height: 50,
        alignSelf: "center",
        justifyContent: "center",
        borderWidth: 3,
        borderColor: "#fff",

    },
    btnText: {
        textAlign: "center",
        color: "#fff",
        fontSize: 28,
        fontWeight: "bold",
    },
    header: {
        textAlign: "center",
        color: "royalblue",
        fontSize: 44
    }
});

export default Login; 