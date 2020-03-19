import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, AsyncStorage} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import * as chitActions from '../store/actions/ChitManagement';
import * as authActions from '../store/actions/Authentication';

import Card from '../components/Card';
import Btn from '../components/Btn';
import Color from '../constants/Colors';

const ViewDrafts = props => {
  const dispatch = useDispatch();
  const drafts = props.navigation.getParam('drafts');
  const location = props.navigation.getParam('location');
  const storeToken = useSelector(state => state.authentication.token);
  const [chitText, setChitText] = useState('');

  const postChit = async chit => {
    try {
      await dispatch(chitActions.postChit(storeToken, chitText, location));
      props.navigation.navigate('Home');
    } catch (err) {
      console.log(err);
    }
  };

  const postChitHandler = () => {
    postChit();
  };

  const renderDraftItem = itemData => {
    return (
      <Card style={styles.draftItem}>
        <Text style={styles.textItem}>{itemData.item}</Text>
        <View style={styles.btnContainer}>
          <Btn
            title="Post"
            style={styles.buttons}
            onPress={() => {
              setChitText(itemData.item.toString());
              postChitHandler();
            }}
          />
          <Btn title="Delete" style={styles.buttons} />
        </View>
      </Card>
    );
  };
  return (
    <View style={styles.container}>
      <Text>View Drafts Screen</Text>
      {console.log('Draft screen = ' + drafts)}
      <FlatList
        contentContainerStyle={styles.list}
        keyExtractor={item => item.toString()}
        data={drafts}
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
