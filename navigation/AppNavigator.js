import React, {Component} from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import DrawerNavigator from './DrawerNavigator';
import StackNavigator from './StackNavigator';

export default createAppContainer(
  createSwitchNavigator({
    Main: DrawerNavigator,
    Stack: StackNavigator,
  }),
);
