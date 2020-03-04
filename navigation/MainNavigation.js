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

//import icons
import Icon from 'react-native-vector-icons/Octicons';

//import colors
import Colors from '../constants/Colors';

//Reuseable header options for each stack nav
const headerOptions = {
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTitleStyle: {
    color: Colors.compliment,
  },
};

//Stack navigators
const HomeStackNavigator = createStackNavigator(
  {
    Home: Home,
    User: UserScreen,
  },
  {
    defaultNavigationOptions: headerOptions,
  },
);

const SearchStackNavigator = createStackNavigator(
  {
    Search: SearchUserScreen,
    User: UserScreen,
  },
  {
    defaultNavigationOptions: headerOptions,
  },
);

const AccountStackNavigator = createStackNavigator(
  {
    Account: MyAccount,
    AccountDetails: MyAccountDetails,
  },
  {
    defaultNavigationOptions: headerOptions,
  },
);

//rootnav
//tab nav
const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStackNavigator,
      navigationOptions: {
        //function to get an icon on tab bar
        tabBarIcon: tabInfo => {
          return <Icon name="home" size={25} color={tabInfo.tintColor} />;
        },
      },
    },
    Search: {
      screen: SearchStackNavigator,
      navigationOptions: {
        tabBarIcon: tabInfo => {
          return <Icon name="search" size={25} color={tabInfo.tintColor} />;
        },
      },
    },
    Account: {
      screen: AccountStackNavigator,
      navigationOptions: {
        tabBarIcon: tabInfo => {
          return <Icon name="person" size={25} color={tabInfo.tintColor} />;
        },
      },
    },
  },
  {
    tabBarOptions: {
      inactiveBackgroundColor: Colors.primary,
      inactiveTintColor: Colors.compliment,
      activeBackgroundColor: Colors.compliment,
      activeTintColor: Colors.primary,
    },
  },
);

export default createAppContainer(TabNavigator);
