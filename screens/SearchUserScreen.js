import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import * as userActions from '../store/actions/UserManagement';
import * as authActions from '../store/actions/Authentication';

//import icons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//import components
import Btn from '../components/Btn';
import Input from '../components/Input';
import Card from '../components/Card';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Colors from '../constants/Colors';
/*
    This screen will have a search input to search for other users.
    Upon searching a list of users will be returned if that search string
    is contained within their name
*/

const SearchUserScreen = props => {
  const dispatch = useDispatch();
  //gets the global token for if the user is logged in
  const storeToken = useSelector(state => state.authentication.token);
  const searchList = useSelector(state => state.userManagement.searchList);
  const [searchText, setSearchText] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const searchHandler = async () => {
    setIsSearching(true);

    try {
      await dispatch(userActions.searchUser(searchText));
    } catch (err) {
      console.log(err);
    }

    setIsSearching(false);
  };

  const renderUserItem = itemData => (
    <TouchableOpacity
      style={{borderBottomWidth: 2, borderColor: '#cbcbcb', padding: 10}}
      activeOpacity={0.75}
      onPress={() =>
        props.navigation.navigate('User', {
          item: itemData.item,
          username: itemData.item.given_name,
          userId: itemData.item.user_id,
        })
      }>
      <Card style={styles.userCard}>
        <Text style={styles.username}>@{itemData.item.given_name}</Text>
      </Card>
    </TouchableOpacity>
  );

  const logOutHandler = async () => {
    setIsLoading(true);
    await dispatch(authActions.logout(storeToken));
    setIsLoading(false);
    props.navigation.navigate('Home');
  };

  //buttons for header
  const loginBtn = !storeToken ? (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate('Auth', {
          route: 'Search',
        })
      }>
      <Icon name="login" size={45} color={Colors.compliment} />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={logOutHandler}>
      <Icon name="logout" size={45} color={Colors.compliment} />
    </TouchableOpacity>
  );

  useEffect(() => {
    props.navigation.setParams({loginBtn: loginBtn});
  }, [storeToken]);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Search for a user..."
          onChangeText={searchText => {
            setSearchText(searchText);
            searchHandler();
          }}
          value={searchText}
        />
      </View>
      <View style={styles.listContainer}>
        {isSearching ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <FlatList
            contentContainerStyle={styles.list}
            data={searchList}
            keyExtractor={item => item.user_id.toString()}
            renderItem={renderUserItem}
          />
        )}
      </View>
    </View>
  );
};

SearchUserScreen.navigationOptions = navData => {
  var btn = navData.navigation.getParam('loginBtn');
  return {
    headerRight: () => btn,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
  },
  list: {},
  userCard: {
    width: '100%',
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
  },
});

export default SearchUserScreen;
