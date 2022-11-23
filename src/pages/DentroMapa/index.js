import React, { useState, useEffect } from "react";
import { ImageBackground, View, StyleSheet, TextInput } from "react-native";
import Backbutton from "../../components/Backbutton";
import MapView from "react-native-maps";
import { requireNativeComponent } from 'react-native';
import * as Location from "expo-location";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import config from "../../config/configGoogleApi/config.json";

export default function DentroMapa({ navigation }) {
  const [input, setInput] = useState("");
  const [image, setImage] = useState(
    "https://www.google.com/maps/d/thumbnail?mid=10Y7jwq7YSUDlYxhONy5GVrb8JfI"
  );

  const [destination, setDestination] = useState(null);
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
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      console.log(location);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Backbutton onClick={() => navigation.goBack()} />

      <MapView
        style={styles.imgContainer}
        initialRegion={location}
        showsUserLocation={true}
        zoomEnabled={true}
        loadingEnabled={true}
      ></MapView>

      <GooglePlacesAutocomplete
        placeholder="Busque uma institutição"
        minLength={2}
        autoFocus={false}
        onPress={(data, details = null) => {
          setDestination({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
          console.log(destination);
        }}
        query={{
          key: config.googleApi,
          language: "pt-br",
        }}
        enablePoweredByContainer={false}
        fetchDetails={true}
        styles={{
          textInputContainer: {
            width: '100%',
            backgroundColor: 'transparent',
            padding: 5,
            alignItems: 'center',
            zIndex: 1
          },
          textInput: {
            backgroundColor: '#FFFFFF',
            borderWidth: 2,
            borderColor: 'rgb(14, 82, 178)',
            height: 40,
            borderRadius: 5,
            paddingVertical: 5,
            paddingHorizontal: 10,
            fontSize: 15,
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          },

        }}
      />

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imgContainer: {
    width: '100%',
    height: '70%',
    marginTop: 10,
  },
});
