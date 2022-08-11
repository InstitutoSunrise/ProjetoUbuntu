import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

import db from '../../config/configFirebase';
import Backbutton from '../../components/Backbutton';

export default function Pagess({navigation}) {

  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [datanascimento, setDataNascimento] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const Cadastrar = () => {

    if(email === '' || senha === '' || nome === '' || sobrenome === '' || datanascimento === '' || telefone === ''){
      alert('Preencha os campos');
    }else{
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, senha)
        .then(async(userCredential) => {
          // Signed in
          const user = userCredential.user;
          await setDoc(doc(db, "users", user.uid), {
            nome: nome,
            sobrenome: sobrenome,
            datanascimento: datanascimento,
            telefone: telefone
          });
          navigation.navigate('AdicionarFoto')
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }
  }

  return (


    <View style={styles.container}>

      <Backbutton onClick={() => navigation.goBack()}/>
      <StatusBar barStyle="dark-content" backgroundColor="#0e52b2"/>

      <Text style={styles.titulo}>CADASTRE-SE</Text>

        <TextInput 
        placeholder="DIGITE SEU NOME" 
        style={styles.TextInput} 
        value={nome}
        onChangeText={text => setNome(text)} />

        <TextInput 
        placeholder="SOBRENOME" 
        style={styles.TextInput} 
        value={sobrenome}
        onChangeText={text => setSobrenome(text)} />

        <View style={styles.containerInput}>
          <TextInput 
          placeholder="DATA DE NASCIMENTO" 
          style={styles.Input} 
          value={datanascimento}
          onChangeText={text => setDataNascimento(text)} />
          
          <TextInput 
          placeholder="TELEFONE" 
          style={styles.Input} 
          value={telefone}
          onChangeText={text => setTelefone(text)}
          />
        </View>

        <TextInput 
        placeholder="E-MAIL" 
        style={styles.TextInput} 
        value={email}
        onChangeText={text => setEmail(text)} />

        <TextInput 
        secureTextEntry={true} 
        placeholder="DIGITE SUA SENHA" 
        style={styles.TextInput} />

        <TextInput 
        secureTextEntry={true} 
        placeholder="CONFIRME SUA SENHA" 
        style={styles.TextInput} 
        value={senha}
        onChangeText={text => setSenha(text)} />

          <TouchableOpacity style={styles.botao} onPress={Cadastrar}>
            <Text style={styles.textoBotao}>CONTINUAR</Text>
          </TouchableOpacity>

    </View>
   
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#fff',
    flex:1,
    alignItems:'center',
  },
  titulo:{
    fontSize:50,
    fontWeight:'bold',
    color:'#38B6FF',
    marginTop: 30,
  },
  containerInput:{
    justifyContent: "space-between",
    flexDirection: 'row',
    width: '80%',
    marginTop:15,
  },
  Input:{
    backgroundColor:'#e8eaea',
    paddingVertical: 16,
    paddingHorizontal: 25,
    borderRadius:30,
    fontSize:14,
    width:'49%'
  },
  TextInput: {
    width:'80%',
    marginTop:15,
    backgroundColor:'#e8eaea',
    paddingVertical: 16,
    paddingHorizontal: 25,
    borderRadius:30,
    fontSize:14,
  },
  botao:{
    marginTop:30,
    width:200,
    backgroundColor:'#0e52b2',
    padding:12,
    borderRadius:30,
  },
  textoBotao:{
    textAlign:'center',
    fontSize:25,
    fontWeight:'800',
    color:'#fff',
    letterSpacing:2
  },

});