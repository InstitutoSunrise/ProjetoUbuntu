import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';

export default function RedefinirSenha({ navigation }) {
    return (
        <View style={estilos.container}>
            <Text style={estilos.Titulo}>REDEFINIR SENHA</Text>

            <View style={estilos.inputsContainer}>
                <TextInput
                    style={estilos.inputs}
                    placeholder={"DIGITE SUA NOVA SENHA"}
                    placeholderTextColor={"#545454"}
                    secureTextEntry={true}
                />

                <TextInput
                    style={estilos.inputs}
                    placeholder={"CONFIRME SUA SENHA"}
                    placeholderTextColor={"#545454"}
                    secureTextEntry={true}
                />
            </View>

            <TouchableOpacity
                style={estilos.botaoContinuar}
                onPress={() => navigation.navigate('Login')}
            >
                <Text style={estilos.textBotao}>CONTINUAR</Text>
            </TouchableOpacity>

        </View>
    );
}

const estilos = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    Titulo: {
        width: '90%',
        fontSize: 35,
        color: '#38b6ff',
        marginTop: 120,
        textAlign: 'center',
        fontWeight: '700',
        marginBottom: -45,
    },
    inputs: {
        width: '80%',
        height: 52,
        backgroundColor: '#ebeff1',
        borderRadius: 60,
        marginTop: 11,
        textAlign: "left",
        paddingLeft: 20,
    },
    inputsContainer: {
        width: '100%',
        marginVertical: 150,
        alignItems: 'center',
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

    },
})