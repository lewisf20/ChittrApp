import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import Card from '../components/Card';
import Input from '../components/Input';
import Btn from '../components/Btn';


const Login = props =>  {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('None Set');

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
                var respToken = response["token"];

                //set token state to these values
                setToken(respToken);

                
            })
            .catch((error) => {
                console.error(error);
            })
    }




    
        return (
            <Card style={styles.screen}>
                <Text>Token = {token}</Text>
                <Input
                    style={styles.input}
                    placeholder="email..."
                    onChangeText={(email) => setEmail(email)}
                    value={email}
                />
                <Input
                    style={styles.input}
                    placeholder="password..."
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                    value={password}
                />

                <Btn
                    style={styles.button}
                    title="Log in"
                    onPress={() => login()}
                />
                

            </Card>
        );
    

}

const styles = StyleSheet.create({
    screen: {
        height: 300,
        justifyContent: "center",
    },
    input: {
        flex: 1,
    },
    button: {
        alignSelf: "center",
    },
});

export default Login; 