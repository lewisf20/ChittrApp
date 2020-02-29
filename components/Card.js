import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

const Card = props => {
    return (
        //Merge or overwrite styles of this card component
        <View style={{ ...styles.card, ...props.style }}>
            {props.children}
        </View>
    )
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.compliment,
        padding: 15,
        elevation: 10,
        borderRadius: 15,
        margin: 8
    }
});

export default Card;