import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { getDatabase, get, ref, onValue, off, update, set } from 'firebase/database';
import { getDocs, query, collection, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import db from '../../config/configFirebase';

// const [Message, setMessages] = useState({})
const Messages = []

export default function MensagemTela({ navigation }) {
  const [users, setUsers] = useState(null);
  const [myData, setMyData] = useState();
  const [load, setLoad] = useState(false);
  const [friendsId, setFriendsId] = useState(null)

  const [nomeCompleto, setNomeCompleto] = useState();
  const [imgPerfil, setImgPerfil] = useState();
  const [lastMsg, setLastMsg] = useState("");
  const [time, setTime] = useState()

  async function ShowUserInfos(idUsuario) {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user !== null) {
      const uid = user.uid;

      const q = query(collection(db, 'Usuários'), where("userId", "==", idUsuario));
      const querySnapshot = await getDocs(q);

      const getInfos = querySnapshot.forEach(doc => {
        if (doc.data().tipoUser == "userFisico") {
          setNomeCompleto(doc.data().nome + " " + doc.data().sobrenome)
        } else {
          setNomeCompleto(doc.data().nome)
        }
      })
      return getInfos;
    }
  }

  const fetchLastMsg = (roomId) => {
    try {
      console.log("room id: " + roomId)
      const database = getDatabase();
      const chatRef = ref(database, `chatrooms/${roomId}`);
      onValue(chatRef, snapshot => {
        const data = snapshot.val();
        if (data.messages == null) {
          setLastMsg("Este é o início de sua conversa!")
          setTime("")
        } else {
          data.messages.forEach(e => {
            setLastMsg(e.text)
            setTime(e.createdAt)
          })
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  const onLoad = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      const database = getDatabase();
      //first check if the user registered before
      const findUsers = await findUser(user.uid);
      // set friends list change listener
      const myUserRef = ref(database, `users/${user.uid}`);
      onValue(myUserRef, snapshot => {
        const data = snapshot.val();
        if (data == null) {
          return
        } else {
          setUsers(data.friends);
          data.friends.forEach(element => {
            fetchLastMsg(element.chatroomId)
            ShowUserInfos(element.username)
            Messages.push({ id: element.chatroomId, name: nomeCompleto, userName: element.username, userImg: element.avatar, messageTime: time, messageText: lastMsg })
            console.log("---------------------------" + { id: element.chatroomId, name: nomeCompleto, userName: element.username, userImg: element.avatar, messageTime: time, messageText: lastMsg })
          });
          setMyData(prevData => ({
            ...prevData,
            friends: data.friends,
          }));
        }
      });

      setLoad(!true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {

    onLoad();
    console.log("sla")
    console.log(Messages)
  }, [load])

  const findUser = async id => {
    const database = getDatabase();
    // console.log(id)
    const mySnapshot = await get(ref(database, `users/${id}`));
    // console.log(mySnapshot.val())
    return mySnapshot.val();
  };

  function filterDesc(desc) {
    if (desc.length < 50) {
      return desc;
    }
    return `${desc.substring(0, 45)}...`;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Mensagem</Text>

      {Messages ?
        <FlatList
          contentContainerStyle={{ alignItems: 'center' }}
          vertical
          data={Messages}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.containerFlatList} onPress={() => navigation.navigate('Mensagem', { userName: item.userName, chatRoomId: item.id, avatar: item.userImg, nome: item.name })}>

              <Image style={styles.img} source={{ uri: item.userImg }} />

              <View style={styles.descricao}>
                <View style={styles.box}>
                  <Text style={styles.userName}>{item.name}</Text>
                  <Text style={styles.dataHora}>{item.messageTime}</Text>
                </View>

                <Text style={styles.text}>{filterDesc(item.messageText)}</Text>
              </View>

            </TouchableOpacity>
          )}
        />
        : undefined}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#38B6FF',
    marginBottom: 10,
    marginTop: 35,
    textTransform: 'uppercase',
    textAlign: 'center'
  },
  containerFlatList: {
    backgroundColor: '#e8eaea',
    borderRadius: 8,
    height: 90,
    width: '90%',
    padding: 5,
    marginVertical: 5,
    marginHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 5,
  },
  descricao: {
    width: '70%'
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  userName: {
    fontSize: 20,
    color: '#0c4a86',
  },
  dataHora: {
    fontSize: 13,
    fontWeight: '300',
    textAlign: 'right',
  },
  text: {
    fontSize: 15,
    textAlign: 'left',
    justifyContent: 'center',
    // width:'70%',
  },
});