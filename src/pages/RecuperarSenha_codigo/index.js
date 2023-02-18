import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, } from 'react-native';
import Backbutton from '../../components/Backbutton';
import InputCodigos from '../../components/inputCodigos';

export default function RecuperarSenha_Codigo({ navigation }) {

    //declarando variáveis apenas para teste de frontend, depois colocar em funções requisitando bd
    const [email, setEmail] = useState("issoeumteste@gmail.com");
    const [numeroTel, setNumerotel] = useState("(11)94002-8922");

    return (
        <View style={estilos.Container}>
            <Backbutton onClick={() => navigation.goBack()} />
            <Text style={estilos.Titulo}>DIGITE O CÓDIGO</Text>

            <Text style={estilos.Subtitulo}>ENVIAMOS UM CÓDIGO DE 6 DÍGITOS PARA: {email} OU {numeroTel}</Text>

            <View>
                <InputCodigos></InputCodigos>
            </View>

            <TouchableOpacity
                style={estilos.botaoContinuar}
                onPress={() => navigation.navigate('RedefinirSenha')}
            >
                <Text style={estilos.textBotao}>CONTINUAR</Text>
            </TouchableOpacity>

            <TouchableOpacity style={estilos.reenviar}>
                <Text style={estilos.reenviarText}>REENVIAR CÓDIGO</Text>
            </TouchableOpacity>
        </View>
    );
}


const estilos = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    Titulo: {
        width: '100%',
        fontSize: 35,
        color: '#38b6ff',
        marginTop: 30,
        marginBottom: 10,
        textAlign: 'center',
        fontWeight: '700',
    },
    Subtitulo: {
        width: '80%',
        fontSize: 14.5,
        textAlign: 'center',
        marginBottom: 70,
    },
    textBotao: {
        fontSize: 23,
        fontWeight: '800',
        color: '#fff',
        marginBottom: 2
    },
    botaoContinuar: {
        paddingVertical: 10,
        paddingHorizontal: 40,
        backgroundColor: "#0e52b2",
        borderRadius: 100,
        justifyContent: "center",
        marginBottom: 3,
        marginTop: 230,
    },
    reenviar: {
        width: "50%",
        marginBottom: 100,
        marginTop: 3,
    },
    reenviarText: {
        fontSize: 15,
        color: "#0c4a86",
        textAlign: "center",
        textDecorationLine: "underline",
    },
})