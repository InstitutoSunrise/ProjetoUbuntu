import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Form } from 'react-native';

import Backbutton from '../../components/Backbutton';

export default function App({navigation}) {

  const [cep, setCep] = useState('');
  const [endereço, setEndereço] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [nolocal, setNolocal] = useState('');
  const [horario, setHorario] = useState('');

  return (
   
 
    <View style={styles.container}>

      <Backbutton onClick={() => navigation.goBack()}/>
     
      <Text style={styles.titulo}>CADASTRE-SE</Text>

      <TextInput placeholder="DIGITE SEU CEP" style={styles.TextInput} onChangeNumber={Number=>setCep(Number)} keyboardType="numeric"/>

      <TextInput placeholder="ENDEREÇO" style={styles.TextInput} onChangeText={text=>setEndereço(text)} />

      <TextInput placeholder="NUMERO" style={styles.TextInput} onChangeNumber={Number=>setNumero(Number)} keyboardType="numeric" />

      <TextInput placeholder="COMPLEMENTO" style={styles.TextInput} onChangeText={text=>setComplemento(text)} />

      <TextInput placeholder="TEM LOCAL PARA BANHO/REFEIÇÃO" style={styles.TextInput} onChangeText={text=>setNolocal(text)} />

      <TextInput placeholder="HORARIO DE FUNCIONAMENTO" style={styles.TextInput} onChangeText={text=>setHorario(text)} />

      
      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('AdicionarFoto')}>
          <Text style={styles.textoBotao}>Cadastrar</Text>
      </TouchableOpacity>


    </View>
   
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff',
    alignItems:'center'
  },
  titulo:{
    fontSize:50,
    fontWeight:'bold',
    color:'#38B6FF',
    marginTop: 30,
  },
  TextInput:{
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
    letterSpacing:2,
    textTransform:'uppercase'
  },
});
