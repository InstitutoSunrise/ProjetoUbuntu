import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import MaskInput from 'react-native-mask-input';
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
  const [senha1, setSenha1] = useState('');
  const [senha2, setSenha2] = useState('');

  const Cadastrar = () => {

    if(email === '' || senha1 === '' || senha2 === '' || nome === '' || sobrenome === '' || datanascimento === '' || telefone === ''){

      alert('Preencha os campos');

    }else if(senha1 === senha2){

      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, senha2)
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
          console.log(errorCode)
          console.log(errorMessage)
          switch (errorCode){
            case 'auth/email-already-in-use':
              alert('O endereço de e-mail já está em uso por outra conta.');
            break;
            case 'auth/weak-password':
                alert('A senha deve ter 6 caracteres ou mais.');
            break;  
          }
        });
        
    }else{
      alert('Verifique se a senha está correta');
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
          <MaskInput 
          placeholder="DATA DE NASCIMENTO" 
          keyboarType={'number-pad'}
          style={styles.Input} 
          value={datanascimento}
          onChangeText={(masked, unmasked) => {
            setDataNascimento(masked);
          
          }}
          mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
          />
          
          <MaskInput 
          placeholder="TELEFONE" 
          keyboarType={'number-pad'}
          style={styles.Input} 
          value={telefone}
          onChangeText={(masked, unmasked) => {
            setTelefone(masked);
          
          }}
          mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
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
        style={styles.TextInput} 
        value={senha1}
        onChangeText={text => setSenha1(text)} 
        />

        <TextInput 
        secureTextEntry={true} 
        placeholder="CONFIRME SUA SENHA" 
        style={styles.TextInput} 
        value={senha2}
        onChangeText={text => setSenha2(text)} />

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