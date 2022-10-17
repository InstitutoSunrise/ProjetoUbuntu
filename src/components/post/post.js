import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import CarouselPost from '../CarouselPost';
import { useEffect } from 'react';
import db from '../../config/configFirebase';
import { getAuth } from 'firebase/auth';
import {
    getDatabase,
    get,
    ref,
    set,
    onValue,
    push,
    update,
} from 'firebase/database';


export default function post({ sobreVoce, tipoAjuda, nomeUser, imgUser, imgPost1, imgPost2, imgPost3, tipoUser, userId, navigation }) {



    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes

    const [dataHoraPost, setDataHoraPost] = useState(date + '/' + month + '/' + year
        + ' - ' + hours + ':' + min)

    const [imagesPost, setImagesPost] = useState([])

    const [username, setUsername] = useState(null);
    const [users, setUsers] = useState([]);
    const [userToAdd, setUserToAdd] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [myData, setMyData] = useState(null);
    const [myId, setMyId] = useState(null);
    const [myAvatar, setMyAvatar] = useState(null)

    const addUserToChat = async () => {
        const auth = getAuth();
        const user = auth.currentUser;
        const database = getDatabase();
        setMyId(user.uid)
        setMyAvatar(user.photoURL)
        console.log(myAvatar)
        console.log(myId)

        const userInfo = await findUser(user.uid)
        console.log(userInfo)

        if (userInfo == null) {
            const newUserObj = {
                username: user.uid,
                avatar: user.photoURL,
                friends: [],
            };
            set(ref(database, `users/${user.uid}`), newUserObj);
            console.log(newUserObj)

        } else {
            if (user.uid === userId) {
                // don't let user add himself
                return;
            }

            if (
                userInfo.friends &&
                userInfo.friends.findIndex(f => userId === userInfo.username) > 0
            ) {
                // don't let user add a user twice
                return;
            }
        }


        const newChatroomRef = push(ref(database, 'chatrooms'), {
            firstUser: user.uid,
            secondUser: userId,
            messages: [],
        });

        const newChatroomId = newChatroomRef.key;
        //join myself to this user friend list
        if (userInfo == null) {
            update(ref(database, `users/${userId}`), {
                friends: [
                    {
                        username: user.uid,
                        avatar: user.photoURL,
                        chatroomId: newChatroomId,
                    },
                ],
            });
        } else {
            console.log(userInfo.friends)
            const userFriends = userInfo.friends || [];
            console.log(userFriends)
            console.log("ala tem amigos kkkkk", userFriends)
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

        const otherUserInfo = await findUser(userId)
        if (otherUserInfo == null) {
            const newUserObj = {
                username: userId,
                avatar: imgUser,
                friends: [],
            };
            set(ref(database, `users/${userId}`), newUserObj);
            console.log(newUserObj)
        }

        const myFriends = otherUserInfo.friends || [];
        console.log(otherUserInfo)
        // add this user to my friend list
        if (otherUserInfo == null) {
            console.log(otherUserInfo)
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
            console.log(userInfo)
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

    const findUser = async id => {
        const database = getDatabase();

        const mySnapshot = await get(ref(database, `users/${id}`));

        return mySnapshot.val();
    };

    const getImages = () => {
        let newArray = imagesPost
        newArray = [imgPost1, imgPost2, imgPost3]
        setImagesPost([...newArray])
    }

    useEffect(() => {
        getImages()
    }, [imgPost3])

    const showInfoPost = () => {
        if (tipoUser == "Fisico") {
            navigation.navigate('InfoPostFisi', { nome: nomeUser, imgUser: imgUser, sobreVoce: sobreVoce, tipoAjuda: tipoAjuda, imgPost1: imgPost1, imgPost2: imgPost2, imgPost3: imgPost3, userId: userId });
        } else {
            navigation.navigate('InfoPostInst', { nome: nomeUser, imgUser: imgUser, sobreVoce: sobreVoce, tipoAjuda: tipoAjuda, imgPost1: imgPost1, imgPost2: imgPost2, imgPost3: imgPost3, userId: userId });
        }
    }

    return (
        <TouchableOpacity onPress={showInfoPost} style={styles.card}>
            <Text style={styles.dataPost}>{dataHoraPost}</Text>
            <View style={styles.userDatail}>
                <Image source={{ uri: imgUser }} style={styles.fotoPerfil} />
                <View style={styles.userText}>
                    <Text style={styles.name}>{nomeUser}</Text>
                    <Text style={styles.cidade}>Itaquera, SP</Text>
                </View>
            </View>
            <Text style={styles.titulo}>{tipoAjuda}</Text>
            <Text style={styles.description}>{sobreVoce}</Text>
            <View style={styles.boxImages}>
                <CarouselPost
                    data={imagesPost}
                />
            </View>
            <View style={styles.ViewBtn}>
                <TouchableOpacity style={styles.button} onPress={addUserToChat}>
                    <Text style={styles.text}>ENTRAR EM CONTATO</Text>
                </TouchableOpacity>
            </View>

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#e8eaea',
        height: 'auto',
        borderRadius: 8,
        padding: 15,
        justifyContent: 'space-between',
        marginVertical: 10,
        marginHorizontal: 10
    },
    dataPost: {
        fontSize: 13,
        fontWeight: '300',
        textAlign: 'right',
        marginVertical: 2,
    },
    userDatail: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    userText: {
        marginLeft: 10,
        justifyContent: 'center'
    },
    name: {
        textTransform: 'uppercase',
        color: '#0e52b2',
        fontSize: 16,
        fontWeight: '800'
    },
    cidade: {
        textTransform: 'capitalize',
        color: '#0e52b2',
        fontSize: 16,
        fontWeight: '700'
    },
    titulo: {
        fontSize: 18,
        fontWeight: '700',
        textTransform: 'uppercase',
        marginVertical: 5
    },
    description: {
        width: '100%'
    },
    fotoPerfil: {
        width: 50,
        height: 50,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: '#0e52B2'
    },
    ViewBtn: {
        width: '100%',
        alignItems: 'center'
    },
    button: {
        width: '70%',
        backgroundColor: '#38B6FF',
        borderRadius: 25,
        padding: 15,
        alignItems: 'center'
    },
    text: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    status: {
        color: '#38B6FF',
        fontWeight: 'bold',
        fontSize: 18,
        textDecorationLine: 'underline',
        textTransform: 'uppercase',
        marginBottom: 5
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