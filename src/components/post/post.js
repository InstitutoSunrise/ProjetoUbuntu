import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import CarouselPost from "../CarouselPost";
import db from "../../config/configFirebase";
import { getAuth } from "firebase/auth";
import {
  getDatabase,
  get,
  ref,
  set,
  onValue,
  push,
  update,
} from "firebase/database";
import { getDocs, query, collection, where } from "firebase/firestore";

export default function post({
  sobreVoce,
  tipoAjuda,
  imgPost1,
  imgPost2,
  imgPost3,
  tipoUser,
  userId,
  dataHoraPost,
  status,
  navigation,
}) {
  const [isStatus, setStatus] = useState(status);
  const [imagesPost, setImagesPost] = useState([]);
  const [btn, setBtn] = useState(false);
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [imgUser, setImgUser] = useState("");
  const [descricao, setDescricao] = useState();
  const [alimento, setAlimento] = useState();
  const [voluntario, setVoluntario] = useState();
  const [banho, setBanho] = useState();
  const [telefone, setTelefone] = useState();
  const [horario, setHorario] = useState();


  const fetchInfos = async () => {
    const q = query(collection(db, "Usuários"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const getInfos = querySnapshot.forEach((doc) => {
      if (tipoUser === "userFisico") {
        setNome(doc.data().nome);
        setImgUser(doc.data().imgUser)
        setEndereco(doc.data().endereco);
        setSobrenome(doc.data().sobrenome);
        setNumero(doc.data().numero);
      } else {
        setNome(doc.data().nome);
        setImgUser(doc.data().imgUser)
        setEndereco(doc.data().endereco);
        setNumero(doc.data().numero);
      }
    });
    return getInfos;
  }

  useEffect(() => {
    fetchInfos()
  }, [imgUser]);

  const addUserToChat = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const database = getDatabase();

    const userInfo = await findUser(user.uid);

    if (userId == user.uid) {
      return;
    }

    if (userInfo !== null) {
      let usernames = userInfo.friends;
      if (usernames.findIndex((friends) => friends.username === userId) > -1) {
        console.log("usuário repetido");
        return;
      }
    }

    const newChatroomRef = push(ref(database, "chatrooms"), {
      firstUser: user.uid,
      secondUser: userId,
      messages: [],
    });

    const newChatroomId = newChatroomRef.key;

    if (userInfo == null) {
      console.log(userInfo, "é nulo");
      const newUserObj = {
        username: user.uid,
        avatar: user.photoURL,
        friends: [
          {
            username: userId,
            avatar: imgUser,
            chatroomId: newChatroomId,
          },
        ],
      };
      set(ref(database, `users/${user.uid}`), newUserObj);

      console.log(newUserObj);
    } else {
      if (userInfo.friends == null) {
        console.log(otherUserInfo);
        // console.log(myFriends)

        update(ref(database, `users/${user.uid}`), {
          friends: [
            {
              username: userId,
              avatar: imgUser,
              chatroomId: newChatroomId,
            },
          ],
        });
      } else {
        console.log(otherUserInfo);
        const myFriends = userInfo.friends || [];
        console.log(myFriends);
        update(ref(database, `users/${user.uid}`), {
          friends: [
            ...userInfo.friends,
            {
              username: userId,
              avatar: imgUser,
              chatroomId: newChatroomId,
            },
          ],
        });
      }
    }

    const otherUserInfo = await findUser(userId);
    //join myself to this user friend list
    if (otherUserInfo == null) {
      const newOtherUserObj = {
        username: userId,
        avatar: imgUser,
        friends: [
          {
            username: user.uid,
            avatar: user.photoURL,
            chatroomId: newChatroomId,
          },
        ],
      };
      set(ref(database, `users/${userId}`), newOtherUserObj);
    } else {
      const userFriends = otherUserInfo.friends || [];
      update(ref(database, `users/${userId}`), {
        friends: [
          ...userFriends,
          {
            username: user.uid,
            avatar: user.photoURL,
            chatroomId: newChatroomId,
          },
        ],
      });
    }
  };

  const findUser = async (id) => {
    const database = getDatabase();

    const mySnapshot = await get(ref(database, `users/${id}`));

    return mySnapshot.val();
  };

  const getImages = () => {
    let newArray = imagesPost;
    newArray = [imgPost1, imgPost2, imgPost3];
    setImagesPost([...newArray]);
  };

  const showBtn = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user.uid === userId) {
      setBtn(false);
    } else {
      setBtn(true);
    }
  };

  useEffect(() => {
    getImages();
    showBtn();
  }, [imgPost3]);

  const showInfoPost = () => {
    if (tipoUser == "userFisico") {
      navigation.navigate("InfoPostFisi", {
        imgUser: imgUser,
        nome: nome,
        sobrenome: sobrenome,
        endereco: endereco,
        numero: numero,
        sobreVoce: sobreVoce,
        tipoAjuda: tipoAjuda,
        imgPost1: imgPost1,
        imgPost2: imgPost2,
        imgPost3: imgPost3,
        userId: userId,
        status: status,
        dataHoraPost: dataHoraPost,
      });
    } else {
      navigation.navigate("InfoPostInst", {
        imgUser: imgUser,
        nome: nome,
        endereco: endereco,
        numero: numero,
        sobreVoce: sobreVoce,
        tipoAjuda: tipoAjuda,
        imgPost1: imgPost1,
        imgPost2: imgPost2,
        imgPost3: imgPost3,
        userId: userId,
        status: status,
        dataHoraPost: dataHoraPost,
      });
    }
  };

  const VerificarLocalLabel = () => {
    if (numero) {
      return <Text style={styles.cidade}>{endereco}, {numero} </Text>
    } else {
      return <Text style={styles.cidade}>{endereco} </Text>
    }
  }

  return (
    <View style={styles.card}>
      <Text style={styles.dataPost}>{dataHoraPost}</Text>

      <View style={styles.userDatail}>
        <Image source={{ uri: imgUser }} style={styles.fotoPerfil} />
        <View style={styles.userText}>
          <Text style={styles.name}>{nome} {sobrenome}</Text>
          {endereco ? <VerificarLocalLabel /> : undefined}
        </View>
      </View>

      <Text style={styles.titulo}>{tipoAjuda}</Text>
      <Text style={styles.description}>{sobreVoce}</Text>

      <TouchableOpacity
        style={styles.btnDetalhes}
        onPress={showInfoPost}
      >
        <Text style={styles.textDetalhes}>Ver Detalhes</Text>
      </TouchableOpacity>

      {isStatus === "Doando" ? (
        <View style={styles.boxImages}>
          <CarouselPost data={imagesPost} />
        </View>
      ) : undefined}
      {btn === true ? (
        <View style={styles.ViewBtn}>
          <TouchableOpacity style={styles.button} onPress={addUserToChat}>
            <Text style={styles.text}>ENTRAR EM CONTATO</Text>
          </TouchableOpacity>
        </View>
      ) : undefined}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#e8eaea",
    height: "auto",
    borderRadius: 8,
    padding: 15,
    justifyContent: "space-between",
    marginVertical: 10,
    marginHorizontal: 10,
  },
  dataPost: {
    fontSize: 13,
    fontWeight: "300",
    textAlign: "right",
    marginVertical: 2,
  },
  userDatail: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  userText: {
    marginLeft: 10,
    justifyContent: "center",
  },
  name: {
    textTransform: "uppercase",
    color: "#0e52b2",
    fontSize: 16,
    fontWeight: "800",
  },
  cidade: {
    textTransform: "capitalize",
    color: "#0e52b2",
    fontSize: 16,
    fontWeight: "700",
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
  textDetalhes: {
    width: '100%',
    color: "#0e52b2",
    fontSize: 15,
    textTransform:'uppercase',
    textDecorationLine: "underline",
  },
  fotoPerfil: {
    width: 50,
    height: 50,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#0e52B2",
  },
  ViewBtn: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    width: "70%",
    backgroundColor: "#38B6FF",
    borderRadius: 25,
    padding: 15,
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
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
    padding: 5,
  },
  img: {
    width: 70,
    height: 70,
    margin: 10,
  },
});
