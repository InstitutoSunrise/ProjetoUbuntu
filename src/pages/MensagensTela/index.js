import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  getDatabase,
  get,
  ref,
  onValue,
  off,
  update,
  set,
} from "firebase/database";
import {
  getDocs,
  query,
  collection,
  where,
  onSnapshot,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import db from "../../config/configFirebase";
import FriendsMessage from "../../components/friendsMessage";

export default function MensagemTela({ navigation }) {
  const [Messages, setMessages] = useState([]);
  const [load, setLoad] = useState(false);

  async function ShowUserInfos(idUsuario) {
    if (idUsuario !== null) {
      const q = query(
        collection(db, "Usuários"),
        where("userId", "==", idUsuario)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot;
    } else {
      return;
    }
  }

  const fetchLastMsg = async (roomId) => {
    const database = getDatabase();
    const snapshot = await get(ref(database, `chatrooms/${roomId}`));
    let snapshotResult = snapshot.val();
    return snapshotResult;
  };

  const onLoad = async () => {
    setLoad(!load);
    const auth = getAuth();
    const user = auth.currentUser;
    const database = getDatabase();
    // set friends list change listener
    const myUserRef = ref(database, `users/${user.uid}`);
    onValue(myUserRef, (snapshot) => {
      const data = snapshot.val();
      if (data == null) {
        return;
      } else {
        data.friends.forEach(async (element) => {
          const getLastMessage = await fetchLastMsg(element.chatroomId);

          let myId = user.uid;
          let idFriend = getLastMessage.secondUser;
          let userId;
          if (myId == idFriend) {
            userId = getLastMessage.firstUser;
          } else {
            userId = idFriend;
          }

          const fetchNameUser = await ShowUserInfos(userId);
          let nameFriend;
          fetchNameUser.forEach((doc) => {
            if (doc.data().tipoUser === "userFisico") {
              nameFriend = doc.data().nome + " " + doc.data().sobrenome;
              return nameFriend;
            } else {
              nameFriend = doc.data().nome;
              return nameFriend;
            }
          });

          if (getLastMessage.messages == null) {
            let date = new Date().getDate(); //Current Date
            let month = new Date().getMonth() + 1; //Current Month
            let year = new Date().getFullYear(); //Current Year
            let hours = new Date().getHours(); //Current Hours
            let min = new Date().getMinutes(); //Current Minutes

            var dataHora =
              date + "/" + month + "/" + year + " - " + hours + ":" + min;
            console.log(dataHora);
            let newMsg = [
              {
                id: element.chatroomId,
                name: nameFriend,
                userName: element.username,
                userImg: element.avatar,
                messageTime: dataHora,
                messageText: "Inicie uma conversa",
              },
            ];

            let oldArray;
            // oldArray.push(newMsg)

            console.log("Novo =>", newMsg);
            // console.log("Antigo =>", oldArray);

            setMessages(...Messages, newMsg);
            console.log("mensagens", "=>", Messages);
            Messages.map(msgs => console.log(msgs))
          } else {
            let ultimaMsg = getLastMessage.messages.pop().text;
            let horaEnviado = dataHora;

            let newMsg = [
              {
                id: element.chatroomId,
                name: nameFriend,
                userName: element.username,
                userImg: element.avatar,
                messageTime: horaEnviado,
                messageText: ultimaMsg,
              },
            ];
            // let oldArray = Messages;
            // let oldArray = oldArray.push(newMsg)
            console.log("Novo =>", newMsg);
            // console.log("Antigo =>", oldArray);

            setMessages(...Messages, newMsg);
            
          }
        });
      }
    });
  };

  useEffect(() => {
    onLoad();
    console.log("mensagens", "=>", Messages);
  }, []);

  function filterDesc(desc) {
    if (desc.length < 40) {
      return desc;
    }
    return `${desc.substring(0, 35)}...`;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>CONVERSAS</Text>

      <FlatList
        vertical
        data={Messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.containerFlatList}
            onPress={() =>
              navigation.navigate("Mensagem", {
                userName: item.userName,
                chatRoomId: item.id,
                avatar: item.userImg,
                nome: item.name,
              })
            }
          >
            <Image style={styles.img} source={{ uri: item.userImg }} />

            <View style={styles.descricao}>
              <Text style={styles.dataHora}>{item.messageTime}</Text>
              <View style={styles.box}>
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.text}>{item.messageText}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#38B6FF",
    marginBottom: 10,
    marginTop: 35,
    textTransform: "uppercase",
    textAlign: "center",
  },
  containerFlatList: {
    backgroundColor: "#e8eaea",
    borderRadius: 8,
    height: 90,
    padding: 5,
    marginVertical: 5,
    marginHorizontal: 20,
    alignItems: "center",
    flexDirection: "row",
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 5,
  },
  descricao: {
    width: "75%",
  },
  box: {
    justifyContent: "space-between",
    marginLeft: 10,
  },
  userName: {
    fontSize: 20,
    color: "#0c4a86",
  },
  dataHora: {
    fontSize: 13,
    fontWeight: "300",
    textAlign: "right",
  },
  text: {
    fontSize: 15,
    textAlign: "left",
    justifyContent: "center",
    // width:'70%',
  },
});
