import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function RecuperarSenha() {
    return (
      <View style={estilos.Container}>
          <Text style={estilos.Titulo}>RECUPERAR SENHA</Text>
          <Text style={estilos.SubTitulo}>ESCOLHA COMO VOCÊ QUER RECEBER O CÓDIGO PARA REDIFINIR SUA SENHA:</Text>

          <TouchableOpacity style={estilos.Botoes}>
              <Text style={estilos.BotoesText}>RECEBER CODIGO PELO TELEFONE </Text>
          </TouchableOpacity>
          <TouchableOpacity style={estilos.Botoes}>
              <Text style={estilos.BotoesText}>RECEBER CODIGO PELO E-MAIL</Text>
          </TouchableOpacity>
      </View>
     );
   }

const estilos = StyleSheet.create({
    Container:{
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    Titulo:{
        width: '100%',
        fontSize:35,
        color: '#38b6ff',
        marginTop: 125,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: '700',
    },
    SubTitulo:{
        width: '75%',
        marginBottom: 60,
        textAlign: 'center',
        fontSize: 14.5,        
    },
    Botoes:{
        width: '85%',
        paddingVertical: 25,
        textAlign: 'center',
        alignContent: 'center',
        backgroundColor: '#e8eaea',
        marginBottom: 25,
        borderRadius: 60,
    },
    BotoesText:{
        textAlign: 'center',
        fontSize: 16.5,
        fontWeight: '700',
    }
});