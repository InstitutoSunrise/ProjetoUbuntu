import React, { useState, useEffect } from 'react';
import { ImageBackground, View, StyleSheet, TextInput } from 'react-native';
import Backbutton from '../../components/Backbutton';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

export default function DentroMapa({ navigation }) {

    const [input, setInput] = useState('');
    const [image, setImage] = useState('https://www.google.com/maps/d/thumbnail?mid=10Y7jwq7YSUDlYxhONy5GVrb8JfI');

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
            console.log(location)
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
            >

            </MapView>
            <TextInput
                style={styles.input}
                onChangeText={setInput}
                value={input}
                placeholder="Pesquisar por Bairro, Cidade ou Estado"
            />

        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#fff'
    },
    imgContainer: {
        width: '90%',
        height: '70%',
        alignItems: 'center',
        marginTop: 20
    },
    input: {
        width: '90%',
        padding: 17,
        fontSize: 13,
        backgroundColor: '#ebeff1',
        borderRadius: 60,
        marginVertical: 15,
        marginLeft: 5
    }
})