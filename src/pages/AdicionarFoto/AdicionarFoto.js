import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { addDoc, collection } from "firebase/firestore";

import { uploadImageAsync } from '../../config/configStorage';
import * as ImagePicker from 'expo-image-picker';

import db from '../../config/configFirebase';

import Backbutton from '../../components/Backbutton';

export default function AdicionarFoto({ navigation, route }) {

  const [image, setImage] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");

  const [modalVisible, setModalVisible] = useState(false);

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

  const Cadastrar = async () => {
    if (image === "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png") {
      // alert("Adicione uma foto de perfil");
      setModalVisible(!modalVisible)
    } else {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, route.params.email, route.params.senha)
        .then(async (userCredential) => {

          const auth = getAuth();
          const user = auth.currentUser;

          const userPhoto = await uploadImageAsync(image, user.uid)

          updateProfile(auth.currentUser, {
            displayName: route.params.nome
          })

          try {
            const docRef = await addDoc(collection(db, "Usuários"), {
              nome: route.params.nome,
              cnpj: route.params.cnpj,
              telefone: route.params.telefone,
              cep: route.params.cep,
              endereco: route.params.endereco,
              numero: route.params.numero,
              complemento: route.params.complemento,
              horário: route.params.horario,
              voluntario: route.params.voluntario,
              banho: route.params.banho,
              alimento: route.params.alimento,
              descricao: route.params.descricao,
              userId: user.uid,
              email: route.params.email,
              imgUser: userPhoto,
              tipoUser: "userInst",
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }

          subirFotoPerfil();
          alert("Parabéns, cadastro realizado!");

        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode)
          console.log(errorMessage)
          switch (errorCode) {
            case 'auth/admin-restricted-operation':
              alert('Esta operação é restrita apenas a administradores');
              break;
          }
        });
    }
  }

  return (
    <View style={styles.container}>
      <Backbutton onClick={() => navigation.goBack()} />

      <Text style={styles.titulo}>CADASTRE-SE</Text>

      <TouchableOpacity style={styles.foto} onPress={pickImage}>
        {image && <Image source={{ uri: image }} style={styles.imagePicker} />}
      </TouchableOpacity>

      <Text style={styles.texto}>PARA FINALIZAR SEU CADASTRO, ADICIONE UMA FOTO DE PERFIL</Text>

      <TouchableOpacity style={styles.botao} onPress={Cadastrar}>
        <Text style={styles.textoBotao}>SALVAR</Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>
              Para melhor identificação, é recomendado que adicone uma foto sua.
            </Text>
            {/* <Text
              style={{ fontSize: 15, fontWeight: "600", color: "#0e52b2" }}
            >
            </Text> */}
            <View
              style={{
                width:'100%',
                alignItems:'center'
              }}
            >
              <TouchableOpacity
                style={styles.modalBtn}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.modalBtnText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#38B6FF',
    marginTop: 30,
  },
  foto: {
    width: 150,
    height: 150,
    borderRadius: 80,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e8eaea',
  },
  texto: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 30,
    width: '90%'
  },
  botao: {
    marginTop: '30%',
    width: 200,
    backgroundColor: '#0e52b2',
    padding: 12,
    borderRadius: 30,
  },
  textoBotao: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 2
  },
  textoCas: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
    textDecorationLine: "underline",
    color: '#38B6FF',
  },
  imagePicker: {
    width: '100%',
    height: '100%',
    borderRadius: 80
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: "90%",
    borderRadius: 40,
    backgroundColor: "#fff",
    padding: 25,
  },
  modalText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0e52b2",
    textTransform: "uppercase",
  },
  modalBtn: {
    marginTop: 35,
    width: "45%",
    backgroundColor: "#38B6FF",
    padding: 20,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
  },
});