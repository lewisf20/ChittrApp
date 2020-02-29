import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import Colors from '../constants/Colors';

//Get props
const Btn = ({ ...props }) => {
    return (
        //inherit styles and props from touchable opacity
        <TouchableOpacity
            {...props}
            style={{ ...styles.button, ...props.style }}
        >
            <Text style={styles.btnText}>{props.title}</Text>
        </TouchableOpacity>

    );
}

const styles = StyleSheet.create({
    button: {
        width: "50%",
        height: 50,
        backgroundColor: Colors.primary,
        fontSize: 24,
        margin: 5,
        textAlign: "center",
        borderRadius: 8,
        justifyContent: "center",
    },
    btnText: {
        textAlign: "center",
        color: Colors.compliment,
        fontSize: 28,
        fontWeight: "bold",
    }
});

export default Btn;