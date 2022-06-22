import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';


export default function EscolherTipoLogin() {
 return (
   <View style={estilos.container}>
        <Image
        style={estilos.imagem}
        source={require('../../assets/escolherTipo_.png')}
        />

        <Text style={estilos.descricao}>
            PARA SE CADASTRAR, PRECISAMOS SABER SE VOCÊ É UMA INSTITUIÇÃO OU PESSOA FÍSICA? 
        </Text>

        <TouchableOpacity style={estilos.botao}>
            <Text style={estilos.textBotao}>PESSOA FISICA</Text>
        </TouchableOpacity>

        <TouchableOpacity style={estilos.botao}>
            <Text style={estilos.textBotao}>INSTITUIÇÃO</Text>
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
    imagem:{
        height: 300,
        width: 300,
        marginTop: 70
    },
    descricao:{
        width: '85%',
        fontSize: 14.5,
        textAlign: 'center',
        marginTop: -45,
        marginBottom: 30,
        fontWeight: '400' 
    },
    botao:{
        height: 65,
        width: '75%',
        marginTop: 22,
        backgroundColor: '#0e52b2',
        borderRadius: 60,
        justifyContent: 'center',
    },
    textBotao:{
        fontSize:25,
        fontWeight: '800',
        color: '#fff',
        textAlign: 'center',
        marginBottom:5
    }
})