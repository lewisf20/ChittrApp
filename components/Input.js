import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

//Get props
const Input = ({ ...props }) => {
    return (
        //inherit styles and props from TextInput
        <TextInput
            {...props}
            style={{ ...styles.input, ...props.style }}
        />

    );
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: "#fff",
        fontSize: 24,
        margin: 5,
        textAlign: "center",
        borderBottomWidth: 5,
        borderColor: "royalblue"
    }
});

export default Input;