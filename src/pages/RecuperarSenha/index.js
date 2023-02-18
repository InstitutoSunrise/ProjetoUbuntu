import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import Backbutton from '../../components/Backbutton';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

export default function RecuperarSenha({ route, navigation }) {

  const redefinirSenha = () => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, route.params.userEmail)
      .then(() => {
        alert('Enviamos um email para a recuperação da senha no endereço: ' + route.params.userEmail)
        navigation.goBack()
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }
  return (
    <View style={estilos.main}>
      <View style={estilos.Container}>

        <Backbutton onClick={() => navigation.goBack()} />
        <Text style={estilos.Titulo}>RECUPERAR SENHA</Text>
        <Text style={estilos.SubTitulo}>CLIQUE NO BOTÃO E RECEBA UM EMAIL PARA RECUPERAÇÃO DE SENHA</Text>

        <TouchableOpacity
          style={estilos.Botoes}
          onPress={() => redefinirSenha()}
        >
          <Text style={estilos.BotoesText}>RECEBER EMAIL </Text>
        </TouchableOpacity>


      </View>
      <Image
        style={estilos.imggeo2}
        source={require('../../assets/figuraGeometrica2.png')} />
    </View>
  );
}

const estilos = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  // container:{
  //     flex:1,
  //     justifyContent:'center',
  //     alignItems:'center'
  // },
  Container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  Titulo: {
    width: '100%',
    fontSize: 35,
    color: '#38b6ff',
    marginTop: 30,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: '700',
  },
  SubTitulo: {
    width: '75%',
    marginBottom: 60,
    textAlign: 'center',
    fontSize: 14.5,
  },
  Botoes: {
    width: '85%',
    paddingVertical: 25,
    textAlign: 'center',
    alignContent: 'center',
    backgroundColor: '#e8eaea',
    marginTop: 5,
    borderRadius: 60,
  },
  BotoesText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
  },
  imggeo2: {
    width: 250,
    height: 250,
    bottom: -70,
    right: -70,
    alignSelf: 'flex-end',
  },
});