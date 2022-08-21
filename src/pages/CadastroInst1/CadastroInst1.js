import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import MaskInput from 'react-native-mask-input';

import Backbutton from '../../components/Backbutton';

export default function App({navigation}) {

  const [nome, setNome] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [senha1, setSenha1] = useState('');
  const [senha2, setSenha2] = useState('');
  const [descricao, seDescricao] = useState('');

  const PassarValores = () => {
    if(email === '' || senha1 === '' || senha2 === '' || nome === '' || cnpj === '' || telefone === ''){

      alert('Preencha os campos');
  
    }else if(senha1 === senha2){
  
      navigation.navigate('CadastroInst2', {nome:nome, cnpj:cnpj, telefone:telefone, email:email, senha:senha2, descricao:descricao})

    }else{
  
      alert('Verifique se a senha está correta');
  
    }
  }

  return (
   
 
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#0e52b2"/>
      <Backbutton onClick={()=> navigation.goBack()}/>
     
      <Text style={styles.titulo}>CADASTRE-SE</Text>

        <TextInput 
        placeholder="NOME DA INSTITUIÇÃO" 
        style={styles.TextInput} 
        value={nome}
        onChangeText={text=>setNome(text)} />

        <TextInput 
        placeholder="E-MAIL" 
        style={styles.TextInput}
        value={email} 
        onChangeText={text=>setEmail(text)} />

      <View style={styles.containerInput}>
        <MaskInput 
        placeholder="CNPJ" 
        keyboardType={'number-pad'}
        style={styles.Input} 
        value={cnpj}
        onChangeText={(masked, unmasked) => {
          setCnpj(masked);
        
        }}
        mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
        />

        <MaskInput
        placeholder="TELEFONE" 
        keyboardType={'number-pad'}
        style={styles.Input} 
        value={telefone}
        onChangeText={(masked, unmasked) => {
          setTelefone(masked);
        
        }}
        mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]} 
        /> 
      </View>

        <TextInput 
        secureTextEntry={true} 
        placeholder="DIGITE SUA SENHA" 
        style={styles.TextInput} 
        value={senha1}
        onChangeText={text=>setSenha1(text)}
        />

        <TextInput 
        secureTextEntry={true} 
        placeholder="CONFIRME SUA SENHA" 
        style={styles.TextInput}
        value={senha2} 
        onChangeText={text=>setSenha2(text)} 
        />

        <TextInput 
        placeholder="DESCRIÇÃO" 
        style={styles.TextInputdescrição} 
        value={descricao}
        onChangeText={text=>seDescricao(text)} 
        />
      

        <TouchableOpacity style={styles.botao} onPress={PassarValores}>
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
