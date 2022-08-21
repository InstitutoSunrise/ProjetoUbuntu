import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

import db from '../../config/configFirebase';

import Backbutton from '../../components/Backbutton';

export default function App({navigation, route}) {

  const Cadastrar = () => {
    console.log(route.params.email)
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, route.params.email, route.params.senha)
        .then(async(userCredential) => {
          // Signed in
          const user = userCredential.user;
          await setDoc(doc(db, "Instituições", user.uid), {
            nome: route.params.nome,
            cnpj: route.params.cnpj,
            telefone: route.params.telefone,
            cep: route.params.cep,
            endereço: route.params.endereço,
            numero: route.params.numero,
            complemento: route.params.complemento,
            noLocal: route.params.nolocal,
            horário: route.params.horario,
            descrição:route.params.descricao
          });
          navigation.navigate('Login')
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
            case 'auth/admin-restricted-operation':
                alert('Esta operação é restrita apenas a administradores');
            break;    
          }
        });
  }

  return (
    <View style={styles.container}>
      <Backbutton onClick={()=> navigation.goBack()}/>

      <Text style={styles.titulo}>CADASTRE-SE</Text>

      <TouchableOpacity style={styles.foto}>
        <Feather name="user" size={75} color="black" />
      </TouchableOpacity>

      <Text style={styles.texto}>PARA FINALIZAR, ADICIONE UMA FOTO DE PERFIL</Text>

      <TouchableOpacity style={styles.botao}>
        <Text style={styles.textoBotao}>SALVAR</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={Cadastrar}>
        <Text style={styles.textoCas}>Mais tarde</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    backgroundColor:'#fff',
  },
  titulo:{
    fontSize:50,
    fontWeight:'bold',
    color:'#38B6FF',
    marginTop: 30,
  },
  foto:{
    width:150,
    height:150,
    borderRadius:80,
    marginTop:30,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#e8eaea',
  },
  texto:{
    fontSize:15,
    textAlign:'center',
    marginTop:30
  },
  botao:{
    marginTop:'30%',
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
  textoCas:{
    fontSize:20,
    textAlign:'center',
    marginTop:20,
    textDecorationLine: "underline",
    color:'#38B6FF',
  }
    
} );
