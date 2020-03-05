import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

//bring in redux
import {useSelector, useDispatch} from 'react-redux';
import * as chitActions from '../store/actions/ChitManagement';
//bring in custom components
import Colors from '../constants/Colors';
import ChitItem from '../components/ChitItem';

/*
  This is the Home screen, where chits are loaded into a list, also user should 
  be able to signup and login from this page. The chits shown depend on whether the user
  is logged in or not.
*/

const Home = props => {
  //###################### MANAGE STATE #######################

  const dispatch = useDispatch();
  // //sets token on the global state, the store
  const storeToken = useSelector(state => state.authentication.token);
  const storeChitList = useSelector(state => state.chitManagement.chitList);

  //State to hold whether storeChitList has loaded
  const [chitsLoaded, setChitsLoaded] = useState(false);

  useEffect(() => {
    chitHandler();
  }, [storeToken]); //will depend on more than token - will need updating

  const chitHandler = async () => {
    try {
      await dispatch(chitActions.getChits(storeToken));
      setChitsLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  const renderChitItem = itemData => (
    <TouchableOpacity
      style={{borderBottomWidth: 2, borderColor: '#cbcbcb', padding: 10}}
      activeOpacity={0.75}
      onPress={() => props.navigation.navigate('Chit', {item: itemData.item})}>
      <ChitItem item={itemData.item} />
    </TouchableOpacity>
  );

  //#######################################################################
  //###################### RETURN #########################################
  return (
    <SafeAreaView style={styles.screen}>
      {console.log('store token = ' + storeToken)}

      {!chitsLoaded ? (
        <ActivityIndicator size="large" color={Colors.primary} />
      ) : (
        <FlatList
          contentContainerStyle={styles.list}
          keyExtractor={item => item.chit_id.toString()}
          data={storeChitList}
          renderItem={renderChitItem}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
  },
  chitsContainer: {
    height: '85%',
    backgroundColor: '#cbcbcb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    flexGrow: 1,
  },
});

export default Home;
