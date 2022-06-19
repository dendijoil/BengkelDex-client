import { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import MapViewDirections from "react-native-maps-directions";
import imagePath from "../constants/imagePath";
import * as Location from "expo-location";

export default function Home() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

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
        pickupCords: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
      });
    })();
  }, []);

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
          pickupCords: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
          droplocationCords: {
            latitude: -6.374737,
            longitude: 106.958507,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
        });
      })();
    }, 5000);
    return () => clearInterval(interval);
  });

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

  useEffect(() => {}, []);

  // const getLiveLocation = async () => {
  //   const locPermissionDenied = await locationPermission()
  //   if (locPermissionDenied) {
  //     const res = await getCurrentLocation()
  //     console.log("res =>", res)
  //   }
  // }

  const mapRef = useRef();

  const { pickupCords, droplocationCords } = state;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <MapView
          ref={mapRef}
          style={StyleSheet.absoluteFill}
          initialRegion={pickupCords}
        >
          <Marker
            coordinate={pickupCords}
            image={imagePath.icCurrentLocation}
          />
          <Marker
            coordinate={droplocationCords}
            image={imagePath.icGreenMarker}
          />
          <MapViewDirections
            origin={pickupCords}
            destination={droplocationCords}
            apikey="AIzaSyAAjzQFBz9jwJrx5p9CAgOLZgHoqfK7Wa8"
            strokeWidth={3}
            strokeColor="hotpink"
            optimizeWaypoints={true}
            onReady={(result) => {
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
