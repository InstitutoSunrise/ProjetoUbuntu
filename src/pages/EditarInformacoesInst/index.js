import React, { useState, useEffect } from 'react';

import { Image, Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import MaskInput from 'react-native-mask-input';
import Backbutton from '../../components/Backbutton';


export default function EditarInformacoesInst({ navigation }) {

    async function editarInformacoes(){

    }

    return (
        <View style={styles.container}>
            <Backbutton onClick={() => navigation.goBack()} />

            <View style={styles.inputsView}>
 

                <TouchableOpacity style={styles.botao}>
                    <Text style={styles.textoBotao}>SALVAR</Text>
                </TouchableOpacity>
            </View>
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
    TextInput: {
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