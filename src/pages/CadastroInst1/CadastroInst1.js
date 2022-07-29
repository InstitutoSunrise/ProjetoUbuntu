import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

import Backbutton from '../../components/Backbutton';

export default function App({navigation}) {


  const [nome, setNome] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  return (
   
 
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#0e52b2"/>
      <Backbutton onClick={()=> navigation.goBack()}/>
     
      <Text style={styles.titulo}>CADASTRE-SE</Text>

        <TextInput placeholder="NOME DA INSTITUIÇÃO" style={styles.TextInput} onChangeText={text=>setNome(text)} />
        <TextInput placeholder="E-MAIL" style={styles.TextInput} onChangeText={text=>setEmail(text)} />

      <View style={styles.containerInput}>
        <TextInput placeholder="CNPJ" style={styles.Input} onChangeNumber={Number=>setCnpj(Number)} keyboardType="numeric" />
        <TextInput placeholder="TELEFONE" style={styles.Input} onChangeNumber={Number=>setTelefone(Number)} keyboardType="numeric" /> 
      </View>

        <TextInput secureTextEntry={true} placeholder="DIGITE SUA SENHA" style={styles.TextInput} />
        <TextInput secureTextEntry={true} placeholder="CONFIRME SUA SENHA" style={styles.TextInput} onChangeText={text=>setSenha(text)} />
        <TextInput placeholder="DESCRIÇÃO" style={styles.TextInputdescrição} onChangeText={text=>setNome(text)} />
      

        <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('CadastroInst2')}>
            <Text style={styles.textoBotao}>CONTINUAR</Text>
        </TouchableOpacity>


    </View>
   
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff',
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
  TextInput:{
    width:'80%',
    marginTop:15,
    backgroundColor:'#e8eaea',
    paddingVertical: 16,
    paddingHorizontal: 25,
    borderRadius:30,
    fontSize:14,
  },
  TextInputdescrição:{
    width: '80%',
    height: 100,
    marginTop:15,
    backgroundColor: `#e8eaea`,
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 25,
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
