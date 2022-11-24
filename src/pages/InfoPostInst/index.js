import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import Backbutton from "../../components/Backbutton/index";
import PostInfo from "../../components/PostInfo/index";
import { getAuth } from "firebase/auth";
import { getDocs, query, collection, where } from "firebase/firestore";
import db from "../../config/configFirebase";
import {
  getDatabase,
  get,
  ref,
  set,
  onValue,
  push,
  update,
} from "firebase/database";

import {
  Ionicons,
  Foundation,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";

export default function InfoPostFisi({ navigation, route }) {
  const [alimento, setAlimento] = useState('');
  const [voluntario, setVoluntario] = useState('');
  const [banho, setBanho] = useState('');
  const [telefone, setTelefone] = useState('');
  const [horario, setHorario] = useState('');
  const [descricao, setDescricao] = useState('');
  const [nome, setNome] = useState(route.params.nome);
  const [endereco, setEndereco] = useState(route.params.endereco);
  const [img, setImg] = useState(route.params.imgUser);
  const [imgUser, setImgUser] = useState("");
  const [numero, setNumero] = useState(route.params.numero);
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState(route.params.userId)

  useEffect(async () => {
    const q = query(collection(db, "Usuários"), where("userId", "==", route.params.userId));
    const querySnapshot = await getDocs(q);
    const getInfos = querySnapshot.forEach((doc) => {
      setDescricao(doc.data().descricao);
      setVoluntario(doc.data().voluntario);
      setBanho(doc.data().banho);
      setTelefone(doc.data().telefone);
      setAlimento(doc.data().alimento);
      setHorario(doc.data().horário);
      setEmail(doc.data().email);
      setImgUser(doc.data().imgUser)
      setImgUser(doc.data().imgUser)
    });
    return getInfos;
  }, [route.params.nome]);

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

  return (
    <View style={styles.container}>
      <Backbutton onClick={() => navigation.goBack()} />

      <Text style={styles.nome}>{nome}</Text>
      <Text style={styles.endereco}>
        <Ionicons name="location" size={24} color="#0e52B2" />
        {endereco}, {numero}
      </Text>
      <View style={styles.imgPerfilContainer}>
        <Image
          source={{ uri: img }}
          style={styles.fotoPerfil}
        />
      </View>

      <Text style={styles.descricao}>{descricao}</Text>

      <View style={styles.infomaçoes}>
        <View style={{ alignItems: "center", flexDirection: "row" }}>
          <Ionicons
            name="time-outline"
            size={24}
            color="#0e52B2"
            style={{ marginRight: 5 }}
          />
          <Text style={styles.textInfo}>{horario}</Text>
        </View>
        <View style={styles.ViewContato}>
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <Foundation
              name="telephone"
              size={24}
              color="#0e52B2"
              style={{ marginRight: 7 }}
            />
            <Text style={styles.textInfo}>{telefone}</Text>
          </View>

          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <MaterialIcons
              name="email"
              size={24}
              color="#0e52B2"
              style={{ marginRight: 7 }}
            />
            <Text style={styles.textInfo}>{email}</Text>
          </View>
        </View>
      </View>
      <View style={styles.containerFuncao}>
        {banho === true ? (
          <View style={styles.funcoesGrid}>
            <View style={styles.btn}>
              <View style={styles.containerIcon}>
                <FontAwesome name="shower" size={40} color="#fff" />
              </View>
              <Text style={styles.textFuncoes}>Banho</Text>
            </View>
          </View>
        ) : undefined}
        {voluntario == true ? (
          <View style={styles.funcoesGrid}>
            <View style={styles.btn}>
              <View style={styles.containerIcon}>
                <FontAwesome name="heart" size={40} color="#fff" />
              </View>
              <Text style={styles.textFuncoes}>Seja voluntário</Text>
            </View>
          </View>
        ) : undefined}
        {alimento == true ? (
          <View style={styles.funcoesGrid}>
            <View style={styles.btn}>
              <View style={styles.containerIcon}>
                <MaterialCommunityIcons
                  name="silverware-fork-knife"
                  size={40}
                  color="#fff"
                />
              </View>
              <Text style={styles.textFuncoes}>alimentação</Text>
            </View>
          </View>
        ) : undefined}
      </View>
      <View style={styles.linha}></View>
      <TouchableOpacity style={styles.button} onPress={addUserToChat}>
        <Text style={styles.text}>ENTRAR EM CONTATO</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  nome: {
    width: "80%",
    fontSize: 35,
    color: "#38b6ff",
    textAlign: "center",
    fontWeight: "700",
    marginTop: 30,
  },
  endereco: {
    color: "#0e52B2",
    fontSize: 25,
    fontWeight: "500",
    // marginTop:2,
    marginBottom: 15,
  },
  imgPerfilContainer: {
    width: 160,
    height: 160,
    alignItems: "center",
    borderStyle: "solid",
    borderRadius: 100,
    borderColor: "#0e52B2",
    marginBottom: 10,
  },
  fotoPerfil: {
    height: "95%",
    width: "95%",
    padding: 10,
    borderRadius: 80,
    borderWidth: 2,
    borderColor: "#0e52B2",
  },
  descricao: {
    width: "80%",
    color: "#0e52B2",
    fontSize: 18,
  },
  infomaçoes: {
    width: "80%",
    marginVertical: 15,
  },
  textInfo: {
    textTransform: "uppercase",
    fontSize: 14,
  },
  ViewContato: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
  containerIcon: {
    width: 75,
    height: 75,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    backgroundColor: "#0e52B2",
    padding: 5,
  },
  textFuncoes: {
    fontSize: 11,
    color: "#0c4a86",
    fontWeight: "700",
    letterSpacing: -0.8,
    textAlign: "center",
    textTransform: "uppercase",
  },
  containerFuncao: {
    width: "90%",
    marginVertical: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  funcoesGrid: {
    flexDirection: "column",
    alignContent: "space-between",
    textAlign: "center",
    width: "23%",
    marginHorizontal: 15,
  },
  btn: {
    alignItems: "center",
  },
  linha: {
    width: "80%",
    height: 2,
    backgroundColor: "#38b6ff",
    marginBottom: 15,
    marginTop: 15,
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
    fontWeight: "800",
    letterSpacing: 1,
  },
  // ViewPost:{
  //     width:'100%'
  // },
});
