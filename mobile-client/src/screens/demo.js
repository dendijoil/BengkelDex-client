import { StatusBar } from "expo-status-bar";
import { useState, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import MapViewDirections from "react-native-maps-directions";
import * as Location from 'expo-location';


export default function App() {
  const [state, setState] = useState({
    pickupCords: {
      latitude: 30.7046,
      longitude: 76.7179,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    droplocationCords: {
      latitude: 30.7333,
      longitude: 76.7749,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  });

  const mapRef = useRef()

  const { pickupCords, droplocationCords } = state;

  return (
    <SafeAreaView style={styles.container}>
      <MapView ref={mapRef} style={StyleSheet.absoluteFill} initialRegion={pickupCords}>
        <Marker 
          coordinate={pickupCords}
        />
        <Marker 
          coordinate={droplocationCords}
        />
        <MapViewDirections
          origin={pickupCords}
          destination={droplocationCords}
          apikey="AIzaSyAAjzQFBz9jwJrx5p9CAgOLZgHoqfK7Wa8"
          strokeWidth={3}
          strokeColor="hotpink"
          optimizeWaypoints={true}
          onReady={result => {
            mapRef.current.fitToCoordinates(result.coordinates, {
              edgePadding: {
                right: 30,
                bottom: 300,
                left: 30,
                top: 100
              }
            })
          }}
        />
      </MapView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
