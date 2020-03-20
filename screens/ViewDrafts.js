import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, AsyncStorage} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import * as chitActions from '../store/actions/ChitManagement';
import * as authActions from '../store/actions/Authentication';

import Card from '../components/Card';
import Btn from '../components/Btn';
import Color from '../constants/Colors';

const ViewDrafts = props => {
  const dispatch = useDispatch();
  const [chitDrafts, setChitDrafts] = useState([]);
  const location = props.navigation.getParam('location');
  const storeToken = useSelector(state => state.authentication.token);

  const getAllChitDrafts = async () => {
    try {
      let value = await AsyncStorage.getItem('drafts');
      let jsonValue = JSON.parse(value);
      setChitDrafts(jsonValue);
      //console.log(jsonValue);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllChitDrafts();
  }, [removeFromDrafts]);

  const postChit = async chit => {
    try {
      await dispatch(chitActions.postChit(storeToken, chit, location));
      props.navigation.navigate('Home');
    } catch (err) {
      console.log(err);
    }
  };

  const postChitHandler = chit => {
    postChit(chit);
  };

  const removeFromDrafts = async chit => {
    try {
      const value = chitDrafts;
      const newValue = value.filter(theChit => theChit !== chit);
      setChitDrafts(newValue);
      const stringify = JSON.stringify(newValue);
      await AsyncStorage.setItem('drafts', stringify);
      //console.log('new val = ' + newValue);
    } catch (err) {
      console.log(err);
    }
  };

  const renderDraftItem = itemData => {
    return (
      <Card style={styles.draftItem}>
        <Text style={styles.textItem}>{itemData.item.toString()}</Text>
        <View style={styles.btnContainer}>
          <Btn
            title="Post"
            style={styles.buttons}
            onPress={() => {
              let theChit = itemData.item.toString();
              //console.log('chit = ' + theChit);
              postChitHandler(theChit);
            }}
          />
          <Btn
            title="Delete"
            style={styles.buttons}
            onPress={() => {
              let theChit = itemData.item.toString();
              removeFromDrafts(theChit);
            }}
          />
        </View>
      </Card>
    );
  };
  return (
    <View style={styles.container}>
      <Text>View Drafts Screen</Text>
      {/* {console.log('Draft screen = ' + chitDrafts)} */}
      <FlatList
        contentContainerStyle={styles.list}
        keyExtractor={item => item.toString()}
        data={chitDrafts}
        renderItem={renderDraftItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  list: {
    flexGrow: 1,
  },

  draftItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  btnContainer: {
    flexDirection: 'row',
    marginTop: 25,
  },
  buttons: {
    width: '40%',
    marginHorizontal: 10,
  },
  textItem: {
    fontSize: 20,
    color: Color.primary,
  },
});

export default ViewDrafts;
