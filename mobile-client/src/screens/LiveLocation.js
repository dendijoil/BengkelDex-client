import { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import MapViewDirections from "react-native-maps-directions";
// import imagePath from "../constants/imagePath";
import * as Location from "expo-location";

export default function LiveLocation({route}) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // console.log(route.params.data.location.coordinates[0])
  // console.log(route.params.data.location.coordinates[1])
  
  // Initial
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      setState({
        ...state,
        endLoc: {
          latitude: route.params.data.location.coordinates[1],
          longitude: route.params.data.location.coordinates[0],
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
        currentLoc: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
        startLoc: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
      });
    })();
  }, []);

  // Live tracking
  useEffect(() => {
    const interval = setInterval(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        setState({
          ...state,
          currentLoc: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
        });
      })();
    }, 4000);
    return () => clearInterval(interval);
  });

  const [state, setState] = useState({
    startLoc: {
      latitude: null,
      longitude: null,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    currentLoc: {
      latitude: 30.7046,
      longitude: 76.7179,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    endLoc: {
      latitude: null,
      longitude: null,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  });

  const mapRef = useRef();

  const { startLoc, currentLoc, endLoc } = state;

  if (state.endLoc.latitude === null) {
    return (
      <Text>Loading Map...</Text>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <MapView
          ref={mapRef}
          style={StyleSheet.absoluteFill}
          initialRegion={currentLoc}
        >
          <Marker
            coordinate={currentLoc}
            // image={imagePath.icCurrentLocation}
            anchor={{x: 0.5, y: 0.5}}
          />
          <Marker
            coordinate={endLoc}
            // image={imagePath.icGreenMarker}
          />

          <MapViewDirections
            origin={currentLoc}
            destination={endLoc}
            apikey="AIzaSyAAjzQFBz9jwJrx5p9CAgOLZgHoqfK7Wa8"
            strokeWidth={3}
            strokeColor="#32CD32"
            optimizeWaypoints={true}
            
          />
          <MapViewDirections
            origin={startLoc}
            destination={endLoc}
            apikey="AIzaSyAAjzQFBz9jwJrx5p9CAgOLZgHoqfK7Wa8"
            strokeWidth={3}
            strokeColor="gray"
            optimizeWaypoints={true}
            onReady={(result) => {
              // console.log(result.distance, result.duration)
              mapRef.current.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: 30,
                  bottom: 100,
                  left: 30,
                  top: 100,
                },
              });
            }}
          />
        </MapView>
      </View>
      <View style={styles.bottomCard}>
        <Text>Where are you going</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomCard: {
    backgroundColor: "white",
    width: "100%",
    padding: 30,
  },
});