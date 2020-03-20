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
  PermissionsAndroid,
  Switch,
  AsyncStorage,
} from 'react-native';

import Geolocation from 'react-native-geolocation-service';

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

  //state to save drafts
  const [chitDrafts, setChitDrafts] = useState([]);

  //state for location
  const [location, setLocation] = useState({longitude: 0, latitude: 0});
  const [locPermission, setLocPermission] = useState(false);

  //state to track count and start for getting shits
  const [count, setCount] = useState(5);
  const [start, setStart] = useState(0);

  useEffect(() => {
    chitHandler();
    getAllChitDrafts();
  }, [storeToken, isComposing, count]); //will depend on more than token - will need updating

  //Updates feed when user clicks on home tab - when home screen
  //is in focus
  useEffect(() => {
    const onFocusListener = props.navigation.addListener(
      'didFocus',
      payload => {
        chitHandler();
      },
    );
    return () => {
      onFocusListener.remove();
    };
  });

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
      await dispatch(chitActions.postChit(storeToken, chitText, location));
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

  const findCoordinates = () => {
    Geolocation.getCurrentPosition(
      position => {
        const loc = JSON.stringify(position);
        console.log(loc);
        setLocation({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
      },
      err => {
        Alert.alert(err.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      },
    ).catch(err => {
      console.log(err);
    });
  };

  async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Chit location permission',
          message: 'This requires access to your location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'Ok',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted.');
        return true;
      } else {
        console.log('Location permission denied');
        return false;
      }
    } catch (err) {
      console.warn(err);
    }
  }

  const switchHandler = () => {
    setLocPermission(!locPermission);
    if (!locPermission) {
      requestLocationPermission();
      findCoordinates();
      console.log('location = ' + location);
    }
  };

  //save drafts by pushing chittext to an array in async storage
  const saveChitDraft = async () => {
    try {
      setChitDrafts(chitDrafts.push(chitText));
      let stringifiedArray = JSON.stringify(chitDrafts);
      await AsyncStorage.setItem('drafts', stringifiedArray);
      console.log(chitText + ' has been saved.');
    } catch (err) {
      console.log(err);
    }
  };

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

  const composeModal = (
    <Modal animationType="slide" transparent={false} visible={isComposing}>
      <View style={styles.composeContainer}>
        {chitText.length > 141 ? chitLengthHandler() : null}
        <View style={styles.switchContainer}>
          <Text>Enable location?</Text>
          <Switch
            value={locPermission}
            onValueChange={val => {
              switchHandler();
            }}
          />
        </View>
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
          title="Save to drafts"
          style={{backgroundColor: Colors.primary}}
          onPress={() => saveChitDraft()}
        />
        <Btn
          title="View drafts"
          style={{backgroundColor: Colors.primary}}
          onPress={() => {
            setIsComposing(false);
            props.navigation.navigate('Drafts', {
              drafts: chitDrafts,
              location: location,
            });
          }}
        />
        <Btn
          title="Cancel"
          style={{backgroundColor: Colors.cancel}}
          onPress={() => setIsComposing(false)}
        />
      </View>
    </Modal>
  );

  const composeBtn = (
    <View>
      {locPermission ? (
        <Btn
          title="View Location"
          onPress={() =>
            props.navigation.navigate('Map', {
              location: location,
            })
          }
        />
      ) : null}

      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => setIsComposing(true)}>
        <Icon name="pen-plus" size={45} color={Colors.primary} />
      </TouchableOpacity>
    </View>
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
  switchContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  composeInput: {
    borderWidth: 2,
    borderBottomWidth: 2,
    borderRadius: 10,
  },
  iconContainer: {
    alignSelf: 'center',
    marginTop: 20,
  },
});

export default Home;
