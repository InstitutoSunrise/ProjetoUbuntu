import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { addDoc, collection, doc, setDoc } from "firebase/firestore";

import * as ImagePicker from 'expo-image-picker';

import db from '../../config/configFirebase';
import { uploadImageAsync } from '../../config/configStorage';

import Backbutton from '../../components/Backbutton';

export default function AdicionarFotoFis({navigation, route}) {

  const [image, setImage] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [20, 20],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
    };
  };

  const subirFotoPerfil = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    
    await uploadImageAsync(image, user.uid)
    alert("Parabéns, cadastro realizado!")
  }

  const Cadastrar = () => {
    if(image === "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"){
      alert("Adicione uma foto de perfil");
    } else {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, route.params.userEmail, route.params.userSenha)
        .then(async(userCredential) => {
         
          const user = userCredential.user;
          
          updateProfile(auth.currentUser, {
            displayName:  route.params.userNome + " " + route.params.userSobrenome
          })

          await setDoc(doc(db, "Usuários", user.uid), {
            nome: route.params.userNome,
            sobrenome: route.params.userSobrenome,
            datanascimento: route.params.userDatanascimento,
            telefone: route.params.userTelefone,
            descricao: route.params.userDescricao,
            userId: user.uid,
            tipoUser: "userFisico",
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

      <Text style={styles.texto}>PARA FINALIZAR, ADICIONE UMA FOTO DE PERFIL</Text>

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
  imagePicker:{
    width: '100%', 
    height: '100%',
    borderRadius: 80
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
} );