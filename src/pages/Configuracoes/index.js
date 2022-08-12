import React from 'react';
import { View, StyleSheet, TouchableOpacity,Text, StatusBar } from 'react-native';

import Backbutton from '../../components/Backbutton';
import { getAuth, signOut } from "firebase/auth";

export default function Configuracoes({navigation}) {

    function Logout(){
        const auth = getAuth();
        signOut(auth).then(() => {
          // Sign-out successful.
          navigation.navigate("Login")
        }).catch((error) => {
          // An error happened.
        });
      }

 return (
   <View style={styles.container}>
    <StatusBar barStyle="dark-content" backgroundColor="#0e52b2"/>
    <Backbutton onClick={() => navigation.goBack()}/>

        <Text style={styles.titulo}>CONFIGURAÇÕES</Text>

        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('SobreApp')}>
            <Text style={styles.btnText}>SOBRE O APP</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>PERMISSÕES</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={() => {Logout()}}>
            <Text style={styles.btnText}>SAIR</Text>
        </TouchableOpacity>
   </View>
  );
}

const styles = StyleSheet.create({
container:{
    flex: 1,
    alignItems: 'center',
    backgroundColor:'#fff'
},
titulo:{
    fontSize:35,
    fontWeight:'bold',
    color:'#38B6FF',
    marginTop: 30,
    textTransform:'uppercase',
    marginBottom:50
},
btn:{
    height: '9%',
    width: '65%',
    backgroundColor: '#0e52B2',
    marginVertical: 15,
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 60,
    alignItems: 'center'
},
btnText:{
    fontWeight: '800',
    fontSize: 25,
    color: "white",
},
})