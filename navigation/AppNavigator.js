import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import DrawerNavigator from './DrawerNavigator';


export default createAppContainer(
    createSwitchNavigator({
        // additional routers such as login can
        // be added here
        //login: loginnavigator
        Main: DrawerNavigator
    })
);