import React, { useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  StatusBar,
  Alert,
  Linking,
  Modal,
} from "react-native";

import Backbutton from "../../components/Backbutton";

import { getAuth, signOut, deleteUser } from "firebase/auth";
import {
  doc,
  deleteDoc,
  getDocs,
  query,
  collection,
  where,
} from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import db from "../../config/configFirebase";
import { useEffect } from "react";

export default function Configuracoes({ navigation, route }) {
  const [postList, setPostList] = useState();

  const [modalVisible, setModalVisible] = useState(false);

  function Logout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigation.navigate("Login");
      })
      .catch((error) => {
        // An error happened.
      });
  }

  const siteUbuntu = "https://projetoubuntu.netlify.app/app.html";

  const OpenURLButton = ({ url, children }) => {
    const handlePress = useCallback(async () => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);

    return (
      <TouchableOpacity style={styles.btn} onPress={handlePress}>
        <Text style={styles.btnText}>{children}</Text>
      </TouchableOpacity>
    );
  };

  const Deletar = async () => {
    setModalVisible(!modalVisible);

    const auth = getAuth();
    const user = auth.currentUser;
    const userId = user.uid;

    deleteUser(user)
      .then(() => {
        console.log("Deletado");
      })
      .catch((error) => { });

    await deleteDoc(doc(db, "Usuários", route.params.id));
    console.log("collection deletada");

    const storage = getStorage();

    // Create a reference to the file to delete
    const desertRef = ref(storage, `photoPerfil/${userId}`);

    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        console.log("Foto deletada");
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
  };

  const navegar = () => {
    if (route.params.tipoUser == "Fis") {
      navigation.navigate("EditarInformacoesFis", { docId: route.params.id, numTel: route.params.telefone, email: route.params.email, dataNasc: route.params.dataNasc })
    } else {
      navigation.navigate("EditarInformacoesInst", { docId: route.params.id, telefone: route.params.telefone, email: route.params.email, cnpj: route.params.cnpj, horario: route.params.horario, alimentacao: route.params.alimentacao, banho: route.params.banho, voluntario: route.params.voluntario })
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#0e52b2" />
      <Backbutton onClick={() => navigation.goBack()} />

      <Text style={styles.titulo}>CONFIGURAÇÕES</Text>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("SobreApp")}
      >
        <Text style={styles.btnText}>SOBRE O APP</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={navegar}>
        <Text style={styles.btnText}>EDITAR INFORMAÇÕES</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={() => setModalVisible(!modalVisible)}>
        <Text style={styles.btnText}>EXCLUIR CONTA</Text>
      </TouchableOpacity>

      <OpenURLButton url={siteUbuntu}>AJUDA</OpenURLButton>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          Logout();
        }}
      >
        <Text style={styles.btnText}>SAIR</Text>
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
              Você tem certeza quer deletar essa conta?
            </Text>
            <Text
              style={{ fontSize: 15, fontWeight: "600", color: "#0e52b2" }}
            >
              (Não será possível recupera-lá.)
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                style={styles.modalBtn}
                onPress={Deletar}
              >
                <Text style={styles.modalBtnText}>CONFIRMAR</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalBtn}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.modalBtnText}>CANCELAR</Text>
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
    alignItems: "center",
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#38B6FF",
    marginTop: 30,
    textTransform: "uppercase",
    marginBottom: 50,
  },
  btn: {
    height: "10%",
    width: "70%",
    backgroundColor: "#0e52B2",
    marginVertical: 15,
    justifyContent: "center",
    textAlign: "center",
    borderRadius: 60,
    alignItems: "center",
  },
  btnText: {
    fontWeight: "800",
    fontSize: 25,
    color: "white",
    textAlign: 'center',
    justifyContent: "center",
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
