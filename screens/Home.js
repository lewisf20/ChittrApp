import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
  Modal,
  Alert,
} from 'react-native';

//bring in redux
import {useSelector, useDispatch} from 'react-redux';
import * as chitActions from '../store/actions/ChitManagement';
import * as authActions from '../store/actions/Authentication';

//import icons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//bring in custom components
import Colors from '../constants/Colors';
import Btn from '../components/Btn';
import ChitItem from '../components/ChitItem';
import Input from '../components/Input';

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

  //pull to refresh state
  const [refreshing, setRefreshing] = useState(false);

  //State to hold whether storeChitList has loaded
  const [chitsLoaded, setChitsLoaded] = useState(false);
  const [isComposing, setIsComposing] = useState(false);
  const [chitText, setChitText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  //state to track count and start for getting shits
  const [count, setCount] = useState(5);
  const [start, setStart] = useState(0);

  useEffect(() => {
    chitHandler();
  }, [storeToken, isComposing, count]); //will depend on more than token - will need updating

  const chitHandler = async () => {
    try {
      await dispatch(chitActions.getChits(storeToken, count, start));
      setChitsLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  //Refreshes chits when flatlist is pulled - pull to refresh
  const refreshChitsHandler = () => {
    setCount(5);
    chitHandler();
  };

  //Load more handler triggers when flatlist is scrolled to the bottom
  //load more chits for the user to see
  const loadMoreHandler = () => {
    setCount(count + 5);
  };

  const renderChitItem = itemData => (
    <TouchableOpacity
      style={{borderBottomWidth: 2, borderColor: '#cbcbcb', padding: 10}}
      activeOpacity={0.75}
      onPress={() =>
        props.navigation.navigate('Chit', {
          item: itemData.item,
          username: itemData.item.user.given_name,
          userId: itemData.item.user.user_id,
        })
      }>
      <ChitItem item={itemData.item} username={itemData.item.user.given_name} />
    </TouchableOpacity>
  );

  const postChitHandler = async () => {
    try {
      setChitsLoaded(false);
      await dispatch(chitActions.postChit(storeToken, chitText));
    } catch (err) {
      console.log(err);
    }
    chitHandler();
    setChitsLoaded(true);
  };

  //Makes sure user cant make a chit longer than 141 characters
  const chitLengthHandler = () => {
    Alert.alert(
      '141 characters max',
      'You exceeded the amount of characters allowed in a chit',
      [
        {
          text: 'Okay',
          onPress: () => {
            setChitText('');
          },
        },
      ],
    );
  };

  const composeModal = (
    <Modal animationType="slide" transparent={false} visible={isComposing}>
      <View style={styles.composeContainer}>
        {chitText.length > 141 ? chitLengthHandler() : null}
        <Input
          placeholder="Compose your chit..."
          style={styles.composeInput}
          multiline={true}
          numberOfLines={3}
          onChangeText={chitText => setChitText(chitText)}
          value={chitText}
        />
        {!chitsLoaded ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Btn
            title="Post"
            onPress={() => {
              postChitHandler();
              setIsComposing(false);
            }}
          />
        )}

        <Btn
          title="Cancel"
          style={{backgroundColor: Colors.cancel}}
          onPress={() => setIsComposing(false)}
        />
      </View>
    </Modal>
  );

  const composeBtn = (
    <Btn title="Compose" onPress={() => setIsComposing(true)} />
  );
  const composeText = (
    <Text style={{textAlign: 'center', fontSize: 20}}>
      Log in to compose a chit!
    </Text>
  );

  const logOutHandler = async () => {
    setIsLoading(true);
    await dispatch(authActions.logout(storeToken));
    setIsLoading(false);
  };

  //buttons for header
  const loginBtn = !storeToken ? (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate('Auth', {
          route: 'Home',
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

  //#######################################################################
  //###################### RETURN #########################################
  return (
    <SafeAreaView style={styles.screen}>
      {storeToken ? composeBtn : composeText}
      {composeModal}
      {!chitsLoaded ? (
        <ActivityIndicator size="large" color={Colors.primary} />
      ) : (
        <FlatList
          contentContainerStyle={styles.list}
          keyExtractor={item => item.chit_id.toString()}
          data={storeChitList}
          renderItem={renderChitItem}
          refreshing={refreshing}
          onRefresh={refreshChitsHandler}
          onEndReachedThreshold={0.15}
          onEndReached={loadMoreHandler}
        />
      )}
    </SafeAreaView>
  );
};

Home.navigationOptions = navData => {
  var btn = navData.navigation.getParam('loginBtn');
  return {
    headerRight: () => btn,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
  },
  chitsContainer: {
    height: '85%',
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    flexGrow: 1,
  },
  composeContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  composeInput: {
    borderWidth: 2,
    borderBottomWidth: 2,
    borderRadius: 10,
  },
});

export default Home;
