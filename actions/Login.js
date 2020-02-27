import React, { Component } from 'react';
import { Text, TextInput, View, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';



class Login extends Component {
    constructor(props) {
        super(props);

        //components state
        this.state = {
            email: '',
            password: '',
            loginResponse: {
                id: null,
                token: null,
            }
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
            .then(response => {
                console.log("status code: " + response.status);
                //check response code, if okay return response else throw error
                if(response.ok) {
                    return response.json();
                }
                else {
                    throw new Error('Response not OK');
                  }
                
            })
            .then(response => {
                //Response should now be in right format to use
                console.log(response);

                //get response values for id and token
                var id = response["id"];
                var token = response["token"];

                //set state to these values
                this.state.loginResponse.id = id;
                this.state.loginResponse.token = token;

                Alert.alert("Token", this.state.loginResponse.token);
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
        flex: .5,
        backgroundColor: "#cbcbcb",
        justifyContent: "center",
        padding: 8
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