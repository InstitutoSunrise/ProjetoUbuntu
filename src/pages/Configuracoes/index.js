import React, { useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  StatusBar,
  Alert,
  Linking,
  SectionList,
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
  const [userType, setUserType] = useState();

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

  useEffect(() => {

    if (route.params.tipoUser == "Fis") {
      setUserType("EditarInformacoesFis")
    } else {
      setUserType("EditarInformacoesInst")
    }

  })

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

      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate(`${userType}`, { docId: route.params.id, numTel: route.params.telefone, email: route.params.email, dataNasc: route.params.dataNasc })}>
        <Text style={styles.btnText}>EDITAR INFORMAÇÕES</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={Deletar}>
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
    height: "9%",
    width: "65%",
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
});
