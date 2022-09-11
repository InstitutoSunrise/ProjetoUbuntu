import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Form } from 'react-native';
import MaskInput from 'react-native-mask-input';

import Backbutton from '../../components/Backbutton';

export default function App({navigation, route}) {

  const [cep, setCep] = useState('');
  const [endereço, setEndereço] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [nolocal, setNolocal] = useState('');
  const [horario, setHorario] = useState('');
  const [voluntario, setVoluntario] = useState('');

  const [cepValido, setCepValido] = useState(true);

  const fetchCpf = (cep) => {

    cep = cep.replace(/[^\d]+/g,'');
    console.log(cep.length);
    if (cep.length !== 8){
      setCepValido(false);
    } else {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(res => res.json()).then(data => { 

          if (data.erro === "true") {
            setCepValido(false);
          } else {
            setCepValido(true)
            setEndereço(data.logradouro);
          }

        })
        .catch((err) => console.log(err));
    }
  }

  const PassarValores = () => {

    if(cep === '' || endereço === '' || numero === '' || complemento === '' || nolocal === '' || horario === ''){

      alert('Preencha os campos');

    } else if(cepValido === false){
      alert('CEP Inválido')
    } else {
      navigation.navigate('AdicionarFoto', {cep:cep, endereço:endereço, numero: numero, complemento:complemento, nolocal:nolocal, horario:horario, voluntario:voluntario,  email:route.params.email, senha:route.params.senha, cnpj:route.params.cnpj, telefone:route.params.telefone, descricao:route.params.descricao, nome:route.params.nome})
    }

  }

  return (
    <View style={styles.container}>

      <Backbutton onClick={() => navigation.goBack()}/>
     
      <Text style={styles.titulo}>CADASTRE-SE</Text>

      <MaskInput
      placeholder="DIGITE SEU CEP" 
      keyboardType={'number-pad'}
      style={cepValido ? styles.TextInput : styles.TextInputError} 
      value={cep}
      onChangeText={(masked, unmasked) => {
        setCep(masked);
      
      }}
      onBlur={(() => fetchCpf(cep))}
      mask={[/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
      />

      <TextInput 
      placeholder="ENDEREÇO" 
      style={styles.TextInput}
      value={endereço} 
      onChangeText={text=>setEndereço(text)} />

      <TextInput 
      placeholder="NUMERO" 
      style={styles.TextInput} 
      value={numero}
      onChangeText={text=>setNumero(text)} 
      keyboardType={'number-pad'} />

      <TextInput 
      placeholder="COMPLEMENTO" 
      style={styles.TextInput} 
      value={complemento}
      onChangeText={text=>setComplemento(text)} />

      <TextInput 
      placeholder="TEM LOCAL PARA BANHO/REFEIÇÃO" 
      style={styles.TextInput} 
      value={nolocal}
      onChangeText={text=>setNolocal(text)} />

      <TextInput 
      placeholder="HORARIO DE FUNCIONAMENTO" 
      style={styles.TextInput} 
      value={horario}
      onChangeText={text=>setHorario(text)} />

      <TextInput 
      placeholder="ACEITA VOLUNTÁRIOS" 
      style={styles.TextInput} 
      value={voluntario}
      onChangeText={text=>setVoluntario(text)} />

      
      <TouchableOpacity style={styles.botao} onPress={PassarValores}>
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
  TextInputError:{
    backgroundColor:'#e8eaea',
    borderColor:'#ff4040',
    borderWidth: 1,
    color: '#ff4040',
    paddingVertical: 16,
    paddingHorizontal: 25,
    borderRadius:30,
    fontSize:14,
    width:'80%',
    marginTop:15,
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
