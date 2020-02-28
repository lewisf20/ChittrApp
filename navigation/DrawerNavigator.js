import React, { Component, Profiler } from 'react';
import { View, Text } from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Home from '../screens/Home';
import Profile from '../screens/Profile';
import AuthorisationScreen from '../screens/AuthorisationScreen';


const DrawerNavigator = createDrawerNavigator({
    Home: Home,
    Profile: Profile,
    Login: AuthorisationScreen
    
});

export default DrawerNavigator;