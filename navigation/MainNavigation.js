import React, {Component} from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

//import screens
import MyAccount from '../screens/MyAccount';
import SearchUserScreen from '../screens/SearchUserScreen';
import Home from '../screens/Home';
import UserScreen from '../screens/UserScreen';
import MyAccountDetails from '../screens/MyAccountDetails';

//Stack navigators
const HomeStackNavigator = createStackNavigator({
  Home: Home,
  User: UserScreen,
});

const SearchStackNavigator = createStackNavigator({
  Search: SearchUserScreen,
  User: UserScreen,
});

const AccountStackNavigator = createStackNavigator({
  Account: MyAccount,
  AccountDetails: MyAccountDetails,
});

//root nav
const TabNavigator = createBottomTabNavigator({
  Home: HomeStackNavigator,
  Search: SearchStackNavigator,
  Account: AccountStackNavigator,
});

export default createAppContainer(TabNavigator);
