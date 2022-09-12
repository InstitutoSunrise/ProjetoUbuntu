import React, {useState} from 'react';
import {  Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { uploadImageAsync } from '../../config/configStorage';
import * as ImagePicker from 'expo-image-picker';

import db from '../../config/configFirebase';

import Backbutton from '../../components/Backbutton';

export default function AdicionarFoto({navigation, route}) {
  
const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [20, 20],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
    };
};

const [image, setImage] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");

  const subirFotoPerfil = async () => {
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    
    await uploadImageAsync(image, userId)
    alert("Parabéns, cadastro realizado!")
  }

const Cadastrar = () => {
  if(image === "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"){
    alert("Adicione uma foto de perfil");
  } else {

    const auth = getAuth();

    updateProfile(auth.currentUser, {
      displayName:  route.params.nome
    })

    createUserWithEmailAndPassword(auth, route.params.email, route.params.senha)
    .then(async(userCredential) => {
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
        voluntario: route.params.voluntario,
        descrição:route.params.descricao,
        tipoUser: "userInst",
      });
      subirFotoPerfil();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode)
      console.log(errorMessage)
      switch (errorCode){
        case 'auth/admin-restricted-operation':
          alert('Esta operação é restrita apenas a administradores');
        break;    
      }
    });
  }
}

  return (
    <View style={styles.container}>
      <Backbutton onClick={()=> navigation.goBack()}/>

      <Text style={styles.titulo}>CADASTRE-SE</Text>

      <TouchableOpacity style={styles.foto} onPress={pickImage}>
      {image && <Image source={{uri: image}} style={styles.imagePicker} />}
      </TouchableOpacity>

      <Text style={styles.texto}>PARA FINALIZAR SEU CADASTRO, ADICIONE UMA FOTO DE PERFIL</Text>

      <TouchableOpacity style={styles.botao} onPress={Cadastrar}>
        <Text style={styles.textoBotao}>SALVAR</Text>
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
    marginTop:30,
    width: '90%'
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
  },
  imagePicker:{
    width: '100%', 
    height: '100%',
    borderRadius: 80
  },
});