
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// pull in from DrawerTrigger.js
import DrawerTrigger from './DrawerTrigger'

class Header extends React.Component {
    render() {
        return (
            <View style={styles.header}>
                <DrawerTrigger />
                <Text style={styles.headerText}>Chittr</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        padding: 10,
        backgroundColor: 'royalblue',
        flexDirection: "row",
        justifyContent: "space-between"
    },
    headerText: {
        color: "#fff",
        fontSize: 38,
        alignSelf: "center",
        textAlign: "center"
    }
});

export default Header;