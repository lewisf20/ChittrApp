import React, { Component } from 'react';
import { StyleSheet, Alert, Modal, TouchableHighlight, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { withNavigation } from 'react-navigation';
import { useNavigation } from '@react-navigation/native';

import Card from '../components/Card';
import Input from '../components/Input';
import Btn from '../components/Btn';
import Header from '../components/Header';

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
            },
            modalVisible: false
        };
        this.signup = this.signup.bind(this);
        this.login = this.login.bind(this);
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    /**{
  "given_name": "Lewis",
  "family_name": "Frater",
  "email": "LewisFrater@gmail.com",
  "password": "lewis1234"
} */



    async signup() {
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
                this.login();
            })
            .catch((error) => {
                console.error(error);
            })
    }

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

                //get response values for id and token
                var id = response["id"];
                var token = response["token"];

                //set state to these values
                this.state.loginResponse.id = id;
                this.state.loginResponse.token = token;

                this.setModalVisible(!this.state.modalVisible);
            })
            .catch((error) => {
                console.error(error);
            })
    }



    GoToButton({ screenName }) {
        const navigation = useNavigation();
      
        return (
          <Btn
            title={`Go to ${screenName}`}
            onPress={() => navigation.navigate(screenName)}
          />
        );
      }


    render() {
        return (

            <Card style={styles.screen}>
                <Modal
                    animationType="fade"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    
                    <View style={styles.modalView}>
                        <Card style={styles.modalCard}>
                            <Text style={styles.successText}>Sign up successful!</Text>
                            <this.GoToButton screenName="Home"/>
                        </Card>
                    </View>
                </Modal>
                <TouchableHighlight
                    onPress={() => {
                        this.setModalVisible(true);
                    }}>
                    <Text>Show Modal</Text>
                </TouchableHighlight>
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
                    onPress={() => this.signup()}

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
    },
    modalView: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center"
    },
    modalCard: {
        flex: .5,
        justifyContent: "center",
        alignItems: "center"
    },
    modalButton: {
        alignSelf: "center",
        width: 200
    },
    successText: {
        fontSize: 48,
        color: "royalblue",
        fontWeight: "bold",
        textAlign: "center"
    }
});

export default withNavigation(Signup); 