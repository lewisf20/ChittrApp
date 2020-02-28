import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { withNavigation } from 'react-navigation';

import { DrawerActions } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/Octicons';

class DrawerTrigger extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <TouchableOpacity style={styles.trigger}
                onPress={() => {
                    this.props.navigation.dispatch(DrawerActions.toggleDrawer())
                }}
            >
                <Icon
                    name='three-bars'
                    size={60}
                    color='#fff'
                />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    trigger: {

    }
});

export default withNavigation(DrawerTrigger);