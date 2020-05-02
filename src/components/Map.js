import React, { useContext, useRef } from 'react';
import {
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import MapView, { Polyline, Circle } from 'react-native-maps';
import { Context as LocationContext } from '../context/LocationContext';
import { MaterialIcons } from '@expo/vector-icons';

const Map = () => {
  const {
    state: { currentLocation, locations }
  } = useContext(LocationContext);

  let mapRef = useRef(null);

  if (!currentLocation) {
    return <ActivityIndicator size="large" style={{ marginTop: 200 }} />;
  }

  return (
    <MapView
      ref={mapRef}
      style={styles.map}
      initialRegion={{
        ...currentLocation.coords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      }}
      //   region={{
      //     ...currentLocation.coords,
      //     latitudeDelta: 0.01,
      //     longitudeDelta: 0.01
      //   }}
    >
      <Circle
        center={currentLocation.coords}
        radius={30}
        strokeColor="rgba(158, 158, 255, 1.0)"
        fillColor="rgba(158, 158, 255, 0.3)"
      />
      <Polyline coordinates={locations.map(loc => loc.coords)} />
      <TouchableOpacity
        style={styles.mapIcon}
        onPress={() => {
          mapRef.current.animateToRegion({
            ...currentLocation.coords,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
          });
        }}
      >
        <MaterialIcons name="my-location" style={styles.icon} />
      </TouchableOpacity>
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 300
  },
  mapIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    borderRadius: 50,
    padding: 5,
    alignContent: 'center'
    // borderWidth: 1,
    // borderColor: 'red'
  },
  icon: {
    fontSize: 30,
    color: 'black',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignSelf: 'center'
    // borderWidth: 1,
    // borderColor: 'black'
  }
});

export default Map;
