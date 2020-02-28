import React, { Component } from 'react';
import { Text, TextInput, View, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import Card from '../components/Card';
import Input from '../components/Input';
import Btn from '../components/Btn';

class Signup extends Component {
    constructor(props) {
        super(props);

        //components state
        this.state = {
            email: '',
            password: '',
            given_name: '',
            family_name: '',
            loginResponse: {
                id: null,
                token: null,
            }
        };
        this.signUp = this.signUp.bind(this);
    }


    /**{
  "given_name": "Lewis",
  "family_name": "Frater",
  "email": "LewisFrater@gmail.com",
  "password": "lewis1234"
} */


    async signUp() {
        return fetch('http://10.0.2.2:3333/api/v0.0.5/user',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    given_name: this.state.given_name,
                    family_name: this.state.family_name,
                    email: this.state.email,
                    password: this.state.password
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
            })
            .catch((error) => {
                console.error(error);
            })
    }




    render() {
        return (
            
            <Card style={styles.screen}>

                <Input
                    style={styles.input}
                    placeholder="email..."
                    onChangeText={(email) => this.setState({ email })}
                    value={this.state.email}
                />
                <Input
                    style={styles.input}
                    placeholder="password..."
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password })}
                    value={this.state.password}
                />
                <Input
                    style={styles.input}
                    placeholder="first name..."
                    onChangeText={(given_name) => this.setState({ given_name })}
                    value={this.state.given_name}
                />
                <Input
                    style={styles.input}
                    placeholder="last name..."
                    onChangeText={(family_name) => this.setState({ family_name })}
                    value={this.state.family_name}
                />
                

                <Btn
                    style={styles.button}
                    title="Sign Up"
                    onPress={() => this.signUp()}

                />

            </Card>

        );
    }

}

const styles = StyleSheet.create({
    screen: {
        height: 400,
        justifyContent: "center",
    },
    input: {
        flex: 1,
    },
    button: {
        alignSelf: "center",
    },
    header: {
        textAlign: "center",
        color: "royalblue",
        fontSize: 44
    }
});

export default Signup; 