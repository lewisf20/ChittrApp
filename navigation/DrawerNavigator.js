import {createDrawerNavigator} from 'react-navigation-drawer';

import Home from '../screens/Home';
import MyAccount from '../screens/MyAccount';

const DrawerNavigator = createDrawerNavigator({
  Home: Home,
  Account: MyAccount,
});

export default DrawerNavigator;
