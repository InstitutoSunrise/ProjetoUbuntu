import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import CarouselPost from "../CarouselPost";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { doc, deleteDoc } from "firebase/firestore";
import db from "../../config/configFirebase";

export default function MinhaPublicacao({
  sobreVoce,
  tipoAjuda,
  imgPost1,
  imgPost2,
  imgPost3,
  status,
  dataHoraPost,
  navigation,
  idPost,
}) {
  const [isStatus, setStatus] = useState(status);
  const [imagesPost, setImagesPost] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const deletarPost = async () => {
    const storage = getStorage();

    // Create a reference to the file to delete
    const desertRef = ref(storage, imgPost1);
    const desertRef2 = ref(storage, imgPost2);
    const desertRef3 = ref(storage, imgPost3);

    if (isStatus == false) {
      await deleteDoc(doc(db, "posts", idPost));
      console.log("Deletado com sucesso");
      setModalVisible(!modalVisible);
    } else {
      // Delete the file
      deleteObject(desertRef)
        .then(() => {
          // File deleted successfully
        })
        .catch((error) => {
          // Uh-oh, an error occurred!
        });

      deleteObject(desertRef2)
        .then(() => {
          // File deleted successfully
        })
        .catch((error) => {
          // Uh-oh, an error occurred!
        });

      deleteObject(desertRef3)
        .then(() => {
          // File deleted successfully
        })
        .catch((error) => {
          // Uh-oh, an error occurred!
        });

      await deleteDoc(doc(db, "posts", idPost));
      console.log("Deletado com sucesso");
      setModalVisible(!modalVisible);
    }
  };

  const getImages = () => {
    let newArray = imagesPost;
    newArray = [imgPost1, imgPost2, imgPost3];
    setImagesPost([...newArray]);
  };

  useEffect(() => {
    getImages();
  }, [imgPost3]);

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.viewAlert}>
            <Text style={styles.textAlert}>
              Tem certeza que vai deletar essa publicação?
            </Text>
            <View style={styles.viewBtnAlert}>
              <TouchableOpacity
                style={styles.btnAlert}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.btnTextAlert}>Agora não</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.btnAlert} 
                onPress={deletarPost}
              >
                <Text style={styles.btnTextAlert}>Deletar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.card}>
        <View style={styles.viewInfo}>
          <Text style={styles.dataPost}>{dataHoraPost}</Text>

          {isStatus ? (
            <Text style={styles.status}>Você esta doando</Text>
          ) : (
            <Text style={styles.status}>Você esta Recebendo</Text>
          )}

          <Text style={styles.titulo}>{tipoAjuda}</Text>
          <Text style={styles.description}>{sobreVoce}</Text>
        </View>

        {isStatus ? (
          <View style={styles.boxImages}>
            <CarouselPost data={imagesPost} />
          </View>
        ) : undefined}

        <View style={styles.ViewBtn}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.text}>EXCLUIR</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate("EditarPost", {
                sobreVoce: sobreVoce,
                tipoAjuda: tipoAjuda,
              })
            }
          >
            <Text style={styles.text}>EDITAR</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#rgba(0,0,0,0.5)",
  },
  viewAlert: {
    width: "70%",
    backgroundColor: "#fff",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  textAlert: {
    width: "100%",
    fontSize: 15,
    fontWeight:'500',
    color: "#0e52B2",
  },
  viewBtnAlert: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop:15,
  },
  btnAlert: {
    width: '40%',
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#38B6FF",
    alignItems:'center'
  },
  btnTextAlert:{
      color:'#fff',
      fontSize:'13',
      fontWeight:'500'
  },
  card: {
    backgroundColor: "#e8eaea",
    height: "auto",
    borderRadius: 8,
    padding: 15,
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 10,
  },
  viewInfo: {
    width: "100%",
  },
  dataPost: {
    fontSize: 13,
    fontWeight: "300",
    textAlign: "right",
    marginVertical: 2,
  },
  titulo: {
    fontSize: 18,
    fontWeight: "700",
    textTransform: "uppercase",
    marginVertical: 5,
  },
  description: {
    width: "100%",
    marginBottom: 10,
  },
  fotoPerfil: {
    width: 50,
    height: 50,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#0e52B2",
  },
  ViewBtn: {
    width: "80%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    width: "40%",
    backgroundColor: "#38B6FF",
    borderRadius: 25,
    padding: 15,
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "800",
    letterSpacing: 1,
  },
  status: {
    color: "#38B6FF",
    fontWeight: "bold",
    fontSize: 18,
    textDecorationLine: "underline",
    textTransform: "uppercase",
    marginBottom: 5,
  },
  boxImages: {
    width: "100%",
    padding: 5,
  },
  img: {
    width: 70,
    height: 70,
    margin: 10,
  },
});
