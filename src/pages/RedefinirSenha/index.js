import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import { TextInput } from 'react-native-web';


export default function RedefinirSenha() {
 return (
   <View style={estilos.container}>
    <Text style={estilos.Titulo}>REDEFINIR SENHA</Text>

    <TextInput
     style={estilos.inputsContainer}
     placeholder={"DIGITE SUA NOVA SENHA"}
     placeholderTextColor={"#545454"}
     secureTextEntry={true}
    />

    <TextInput
     style={estilos.inputsContainer}
     placeholder={"CONFIRME SUA SENHA"}
     placeholderTextColor={"#545454"}
     secureTextEntry={true}
    />

    <TouchableOpacity style={estilos.botaoContinuar}>
        <Text style={estilos.textBotao}>CONTINUAR</Text>
    </TouchableOpacity>

   </View>
  );
}

const estilos = StyleSheet.create({
    container:{
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    Titulo:{
        width: '90%',
        fontSize: 35,
        color: '#38b6ff',
        marginTop: 100,
        marginBottom: 140,
        textAlign: 'center',
        fontWeight: 700,
    },
    inputsContainer:{
        width: '80%',
        height: 52,
        backgroundColor: '#ebeff1',
        borderRadius: 60,
        marginTop: 11,
        textAlign: "left",
        paddingLeft: 20,
    },
    textBotao:{
        fontSize: 23,
        fontWeight: 700,
        color: '#fff',
        marginBottom: 2
    },
    botaoContinuar:{
        paddingBottom: 10,
        paddingTop: 10,
        paddingRight: 32,
        paddingLeft: 32,        
        backgroundColor: "#0e52b2",
        borderRadius: 100,
        justifyContent: "center",
        marginTop: 230,
    },
})