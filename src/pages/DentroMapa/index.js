import React, { useState, useEffect, useRef } from "react";
import { ImageBackground, View, StyleSheet, TextInput, Text } from "react-native";
import Backbutton from "../../components/Backbutton";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import config from "../../config/configGoogleApi/config.json";
import MapViewDirections from 'react-native-maps-directions';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function DentroMapa({ navigation }) {

  const [input, setInput] = useState("");
  const [image, setImage] = useState(
    "https://www.google.com/maps/d/thumbnail?mid=10Y7jwq7YSUDlYxhONy5GVrb8JfI"
  );



  const [destination, setDestination] = useState(null);
  const [distance, setDistance] = useState(null);
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
      <MapView
        style={styles.imgContainer}
        initialRegion={location}
        showsUserLocation={true}
        showsMyLocationButton={false}
        zoomEnabled={true}
        loadingEnabled={true}
      >

        {destination &&
          <MapViewDirections
            origin={location}
            destination={destination}
            apikey={config.googleApi}
            strokeWidth={3}
            strokeColor="#38b6ff"
            onReady={result => {
              setDistance(result.distance);
            }}
          />
        }
      </MapView>

      <View style={{ width: '85%', height: '50%', position: 'absolute', alignSelf: 'flex-start', marginTop: 16 }}>
        <GooglePlacesAutocomplete
          placeholder="Busque uma institutição"
          minLength={2}
          autoFocus={false}
          onPress={(data, details = null) => {
            console.log(data, details);
            setDestination({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            });
          }}
          query={{
            key: config.googleApi,
            language: "pt-br",
          }}
          enablePoweredByContainer={false}
          fetchDetails={true}
          styles={{
            container: {
              flex: 1
            },
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
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imgContainer: {
    width: windowWidth,
    height: windowHeight,
    marginTop: 10,
  },
});
