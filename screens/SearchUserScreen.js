import React, {useState} from 'react';
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
    <TouchableOpacity>
      <Card style={styles.userCard}>
        <Text style={styles.username}>@{itemData.item.given_name}</Text>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {console.log(searchList)}
      <View style={styles.inputContainer}>
        <Input
          placeholder="Search for a user..."
          onChangeText={searchText => {
            setSearchText(searchText);
            searchHandler();
          }}
          value={searchText}
        />
        {/* <Btn title="Search" onPress={searchHandler} /> */}
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
