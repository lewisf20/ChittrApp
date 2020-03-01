import { createStackNavigator } from 'react-navigation-stack';

import Home from '../screens/Home';
import UserScreen from '../screens/UserScreen'

const StackNavigator = createStackNavigator({
    Home: Home,
    User: UserScreen
});

export default StackNavigator;
