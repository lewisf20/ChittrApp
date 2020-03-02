import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

//import components
import Btn from '../components/Btn';
/*
    This screen will have a search input to search for other users.
    Upon searching a list of users will be returned if that search string
    is contained within their name
*/

const SearchUserScreen = props => {
  return (
    <View style={styles.container}>
      <Text> Search Users Screen </Text>
      <Btn
        title="User Screen"
        onPress={() => {
          props.navigation.navigate('User');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SearchUserScreen;
