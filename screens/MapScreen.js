import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

const MapScreen = props => {
  const location = props.navigation.getParam('location');
  const longitude = parseFloat(location.longitude);
  const latitude = parseFloat(location.latitude);
  const locObj = {
    longitude: longitude,
    latitude: latitude,
  };
  return (
    <View style={styles.mapContainer}>
      {console.log('longi = ' + longitude)}
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.002,
          longitudeDelta: 0.002,
        }}
        mapType="standard"
        showsScale
        showsCompass
        showsPointsOfInterest
        showsBuildings>
        <Marker
          coordinate={locObj}
          title="Your location"
          description="Your current location"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default MapScreen;
