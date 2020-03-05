import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Alert,
  FlatList,
  SafeAreaView,
} from 'react-native';

//bring in redux
import {useSelector, useDispatch} from 'react-redux';
import * as chitActions from '../store/actions/ChitManagement';
//bring in custom components
import Colors from '../constants/Colors';
import Btn from '../components/Btn';
import Card from '../components/Card';
import Input from '../components/Input';
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
  //State to hold chits
  const [chitData, setChitData] = useState([]);

  useEffect(() => {
    chitHandler();
  }, [storeToken]);

  const chitHandler = async () => {
    try {
      await dispatch(chitActions.getChits(storeToken));
    } catch (err) {
      console.log(err);
    }
  };
  const renderChitItem = itemData => <ChitItem item={itemData.item} />;

  //#######################################################################
  //###################### RETURN #########################################
  return (
    <SafeAreaView style={styles.screen}>
      {console.log('store token = ' + storeToken)}
      <View style={styles.welcomeContainer}></View>
      <Card style={styles.chitsContainer}>
        <FlatList
          contentContainerStyle={styles.list}
          keyExtractor={item => item.chit_id.toString()}
          data={storeChitList}
          renderItem={renderChitItem}
        />
      </Card>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: Colors.primary,
  },
  button: {
    width: '35%',
  },
  card: {
    flex: 1,
    justifyContent: 'center',
  },
  cardButton: {
    alignSelf: 'center',
  },
  cardInput: {},
  titleText: {
    color: Colors.primary,
    textAlign: 'center',
    fontSize: 52,
    paddingRight: 10,
  },
  welcomeContainer: {
    padding: 8,
    borderTopWidth: 5,
    borderTopColor: Colors.compliment,
  },
  welcomeText: {
    color: Colors.primary,
    textAlign: 'center',
    fontSize: 24,
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
