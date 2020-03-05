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

  //get chits on first run
  // useEffect(() => {
  //   getChits();
  // }, []);

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
      {/* {loginModalContent}
      {signUpModalContent} */}
      {console.log('store token = ' + storeToken)}
      <View style={styles.welcomeContainer}>
        {/* {buttonContent} */}
        {/* <Text style={styles.welcomeText}>Chits</Text> */}
      </View>
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

  async function getChits() {
    var headers = {};
    //If logged in set x auth to token, else use no auth to get all chits
    if (storeToken !== null) {
      headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Authorization': storeToken,
      };
    } else {
      headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
    }
    return fetch('http://10.0.2.2:3333/api/v0.0.5/chits', {
      method: 'GET',
      headers: headers,
    })
      .then(response => {
        console.log('status code: ' + response.status);
        //check response code, if okay return response else throw error
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Response not OK');
        }
      })
      .then(response => {
        //Response should now be in right format to use
        console.log(response);
        setChitData(response.reverse());
        //console.log('chitData = ' + chitData[4].chit_content);
      })
      .catch(error => {
        console.error(error);
      });
  }
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
