import React, { useState, useEffect } from 'react';

import { Image, Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { FontAwesome5, Entypo } from '@expo/vector-icons';

import * as ImagePicker from 'expo-image-picker';
import MaskInput from 'react-native-mask-input';
import Backbutton from '../../components/Backbutton';

import firebase from '../../config/configFirebase';
import { getAuth } from "firebase/auth";

export default function EditarPerfilUserInst1({ navigation }) {

    const auth = getAuth();
    const user = auth.currentUser;
    const photoURL = user.photoURL;


    const [image, setImage] = useState(photoURL);


    const [nome, setNome] = useState('');
    const [localizacao, setLocalizacao] = useState('');
    const [descricao, setDescricao] = useState('');


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1,
        });
        if (!result.cancelled) {
            setImage(result.uri);
        };
    };

    return (
        <View style={styles.container}>
            <Backbutton onClick={() => navigation.goBack()} />

            <TouchableOpacity style={styles.imgPickerContainer} onPress={pickImage}>
                <View style={styles.foto}>
                    {image && <Image source={{ uri: image }} style={styles.imagePicker} />}
                </View>
                <View style={styles.imgEditIcon}>
                    <FontAwesome5
                        name="edit"
                        size={20}
                        color="#0e52b2"
                    />
                </View>
            </TouchableOpacity>

            <View style={styles.inputsView}>
                <TextInput
                    placeholder="NOME DA INSTITUIÇÃO"
                    style={styles.TextInput}
                    value={nome}
                    onChangeText={text => setNome(text)}
                />
                <View style={styles.localizacaoInputContainer}>
                    <TextInput
                        placeholder="LOCALIZAÇÃO"
                        style={styles.localizacaoInput}
                        value={localizacao}
                        onChangeText={text => setLocalizacao(text)}
                    />
                    <Entypo name="location-pin" size={24} color="#636363" />
                </View>

                <TextInput
                    placeholder="DESCRIÇÃO"
                    style={styles.TextInputDesc}
                    value={descricao}
                    multiline={true}
                    numberOfLines={6}
                    onChangeText={text => setDescricao(text)}
                />

            </View>
            <TouchableOpacity style={styles.botao} onPress={(() => navigation.navigate('EditarPerfilUserInst2'))}>
                <Text style={styles.textoBotao}>CONTINUAR</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'space-between',
    },
    foto: {
        width: 130,
        height: 130,
        borderRadius: 80,
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e8eaea',
    },
    imgPickerContainer: {
        width: '40%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imgEditIcon: {
        alignSelf: 'flex-end',
        marginLeft: -25,
        marginBottom: 3
    },
    imagePicker: {
        width: '100%',
        height: '100%',
        borderRadius: 80,
    },
    inputsView: {
        width: '100%',
        alignItems: 'center',
    },
    containerInput: {
        justifyContent: "space-between",
        flexDirection: 'row',
        width: '80%',
        marginTop: 10,
    },
    Input: {
        backgroundColor: '#e8eaea',
        paddingVertical: 16,
        paddingHorizontal: 25,
        borderRadius: 30,
        fontSize: 14,
        width: '49%'
    },
    localizacaoInput: {
        fontSize: 14,
        width: '90%',
    },
    localizacaoInputContainer: {
        width: '80%',
        paddingVertical: 16,
        paddingHorizontal: 25,
        borderRadius: 30,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e8eaea',
    },
    TextInput: {
        width: '80%',
        marginTop: 10,
        backgroundColor: '#e8eaea',
        paddingVertical: 16,
        paddingHorizontal: 25,
        borderRadius: 30,
        fontSize: 14,
    },
    TextInputDesc: {
        width: '80%',
        marginTop: 10,
        backgroundColor: '#e8eaea',
        paddingVertical: 16,
        paddingHorizontal: 25,
        borderRadius: 30,
        fontSize: 14,
    },
    botao: {
        marginVertical: 30,
        width: '45%',
        backgroundColor: '#0e52b2',
        padding: 12,
        borderRadius: 30,
    },
    textoBotao: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: '800',
        color: '#fff',
        letterSpacing: 2
    },
})