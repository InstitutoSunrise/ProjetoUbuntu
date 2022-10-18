import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { getDatabase, get, ref, onValue, off, update, set } from 'firebase/database';
import { getDocs, query, collection, where, onSnapshot } from "firebase/firestore";
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
  const [time, setTime] = useState();
  const [slavar, setSlavar] = useState([])
  const [roomId, setRoomId] = useState()

  async function ShowUserInfos(idUsuario) {
    if (idUsuario !== null) {
      const q = query(collection(db, 'Usuários'), where("userId", "==", idUsuario));
      const querySnapshot = await getDocs(q);
      console.log("entrou na showuserinfo")
      const getInfos = querySnapshot.forEach(doc => {
        if (doc.data().tipoUser = "userFisico") {
          console.log("entrou no if")
          setNomeCompleto(doc.data().nome)
          console.log(doc.data().userId, " => ", doc.data());
          // return (doc.data().userId, " => ", doc.data())

        } else {
          console.log("entrou no else")
          // return (doc.data().userId, " => ", doc.data())
          console.log(doc.data().userId, " => ", doc.data());
          // setNomeCompleto(doc.data().nome)
        }
      })
    } else {
      return
    }
  }


  // const fetchMessages = useCallback(async () => {
  //   const database = getDatabase();

  //   const snapshot = await get(
  //     ref(database, `chatrooms/${roomId}`),
  //   );

  //   return snapshot.val();
  // }, [roomId]);


  const fetchLastMsg = async (roomId) => {
    const database = getDatabase();
    const snapshot = await get(ref(database, `chatrooms/${roomId}`));
    let sla = snapshot.val();
    return sla;
    // if (snapshot.val().messages == null) {
    //   setLastMsg("Este é o início de sua conversa!")
    //   setTime("")
    //   console.log("fetchlastmsg aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    // } else {
    //   console.log("fetchlastmsg bbbbbbbbbbbbbbbbbbbbbbbbbbbbbb")
    //   console.log(sla.messages)
    //   setSlavar(sla)
    //   console.log(slavar)
    //   console.log(snapshot.val().messages.pop().createdAt)
    //   setTime(snapshot.val().messages.pop().createdAt)
    //   console.log(snapshot.val().messages.pop().text)
    //   setLastMsg(snapshot.val().messages.pop().text)
    //   console.log("----------")
    //   console.log(time)
    //   console.log(lastMsg)
    // }
  }

  // const chatRef = await get(ref(database, `chatrooms/${roomId}`));
  // onValue(chatRef, snapshot => {
  //   const data = snapshot.val();
  //   if (data.messages == null) {
  //     setLastMsg("Este é o início de sua conversa!")
  //     setTime("")
  //     console.log("fetchlastmsg")
  //   } else {
  //     // data.messages.forEach(e => {
  //     //   setLastMsg(e.text)
  //     //   setTime(e.createdAt)
  //     // })

  //       let last = data.messages.pop();
  //       setTime(last.createdAt)
  //       setLastMsg(last.text)
  //       console.log(last.createdAt)
  //       console.log(last.text)

  //   }
  // })
  // }

  const onLoad = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      const database = getDatabase();
      // set friends list change listener
      const myUserRef = ref(database, `users/${user.uid}`);
      onValue(myUserRef, snapshot => {
        const data = snapshot.val();
        if (data == null) {
          return
        } else {
          setUsers(data.friends);
          data.friends.forEach(async element => {
            const hm = await fetchLastMsg(element.chatroomId)
            if (hm.messages == null) {
              setLastMsg("Este é o início de sua conversa!")
              setTime("")
              console.log("fetchlastmsg aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
            } else {
              setRoomId(element.chatroomId)
              var qtdMsg = hm.messages.length
              
              let aaaaaaaaaaa = hm.messages.pop().text
              console.log(hm.messages[1])
              setLastMsg(aaaaaaaaaaa)
              console.log("ultima mensagem1: ",hm.messages.pop().text)
              console.log("ultima mensagem: ", aaaaaaaaaaa)
              // console.log("fetchlastmsg bbbbbbbbbbbbbbbbbbbbbbbbbbbbbb")
              // console.log(hm.messages)
              // setSlavar(hm)
              // console.log(slavar)
              // console.log(hm.messages.pop().createdAt)
              // setTime(hm.messages.pop().createdAt)
              // console.log(hm.messages.pop().text)
              // setLastMsg(hm.messages.pop().text)
              // console.log("----------")
              // console.log(time)
              // console.log(lastMsg)
            }
            ShowUserInfos(element.username)

            Messages.push({ id: element.chatroomId, name: nomeCompleto, userName: element.username, userImg: element.avatar, messageTime: "hm.messages.pop().createdAt", messageText: "hm.messages.pop().text" })
            console.log("mensagens", "=>", Messages)

          });
          setMyData(prevData => ({
            ...prevData,
            friends: data.friends,
          }));
        }
      });

    } catch (error) {
      console.error(error);
    }

  };

  useEffect(() => {
    onLoad();
    console.log("executou")
  }, [])

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