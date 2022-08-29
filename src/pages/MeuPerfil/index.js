import React, { useState, useEffect } from 'react';

import { Image, Text, View, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

import firebase from '../../config/configFirebase';
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import db from '../../config/configFirebase';
// import { upload } from '../../config/configStorage';


import Backbutton from '../../components/Backbutton';

export default function MeuPerfil({ navigation }) {
    const [nomeUser, setNomeUser] = useState()
    const [sobrenomeUser, setSobrenomeUser] = useState()
    const [nomeCompleto, setNomeCompleto] = useState([], [])
    const [descricao, setDescricao] = useState();
    const [photoURL, setPhotoURL] = useState();

    //useEffect para fetch das infos do firestone, baseado no uid, atribui os states foto/nome/sobrenome/nomecompleto/descricao
    useEffect(() => {
        const showName = async () => {
            const auth = getAuth();
            const user = auth.currentUser;
            if (user !== null) {
                // The user object has basic properties such as display name, email, etc.
                const uid = user.uid;
                setPhotoURL(user.photoURL);

                const docRef = doc(db, "Instituições", uid);
                const docSnap = await getDoc(docRef);

                try {
                    setNomeUser(docSnap.data().nome);
                    setDescricao(docSnap.data().descrição);
                } catch (e) {
                    console.log("Error getting data from doc users:", e);
                }
            }
        }
        showName();
    }, [nomeCompleto]);

    return (
        <View style={styles.container}>

            <StatusBar barStyle="dark-content" backgroundColor="#0e52b2" />
            <ScrollView contentContainerStyle={{ width: '100%' }}>

                <Backbutton onClick={() => navigation.goBack()} />

                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.titulo}>MEU PERFIL</Text>

                    <View style={styles.imgPerfilContainer}>
                        <TouchableOpacity style={styles.imgPerfilContainer}>
                            <Image style={styles.fotoPerfil} source={{ uri: photoURL }} />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.nome}>{nomeUser}</Text>
                    <Text style={styles.endereco}>Cidade Tiradentes, SP</Text>

                    <View style={styles.descricaoContainer}>
                        <Text style={styles.descricao}>{descricao}</Text>
                    </View>
                </View>

                <View style={styles.editPerfilContainer}>
                    <TouchableOpacity style={styles.editPerfilContainer}>
                        <FontAwesome5
                            name="edit"
                            size={16}
                            color="#0e52b2"
                        />
                        <Text style={styles.editPerfil}> EDITAR PERFIL</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.funcoesContainer}>
                    <View style={styles.funcoesGrid}>
                        <TouchableOpacity style={styles.btn}>
                            <View style={styles.funcoesIconContainer}>
                                <Ionicons name="trash" size={40} color="#fff" />
                            </View>
                            <Text style={styles.funcoesTitle}>EXCLUIR CONTA</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.funcoesGrid}>
                        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('minhasPubs')}>
                            <View style={styles.funcoesIconContainer}>
                                <Ionicons name="create" size={40} color="#fff" />
                            </View>
                            <Text style={styles.funcoesTitle}>MINHAS PUBLICAÇÕES</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.funcoesGrid}>
                        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Configurações')}>
                            <View style={styles.funcoesIconContainer}>
                                <Ionicons name="settings" size={40} color="#fff" />
                            </View>
                            <Text style={styles.funcoesTitle}>CONFIGURAÇÕES</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.funcoesGrid}>
                        <TouchableOpacity style={styles.btn}>
                            <View style={styles.funcoesIconContainer}>
                                <Ionicons name="ios-star" size={40} color="#fff" />
                            </View>
                            <Text style={styles.funcoesTitle}>NOS AVALIE</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    titulo: {
        width: '90%',
        fontSize: 35,
        color: '#38b6ff',
        textAlign: 'center',
        fontWeight: '700',
        marginBottom: 20,
        marginTop: -15
    },
    imgPerfilContainer: {
        width: 120,
        height: 120,
        alignItems: 'center',
        borderStyle: 'solid',
        // borderWidth: 1,
        borderRadius: 100,
        borderColor: '#0e52B2',
        marginBottom: 10
    },
    fotoPerfil: {
        height: '95%',
        width: '95%',
        padding: 10,
        borderRadius: 60,
        borderWidth: 1,
        borderColor: '#0e52B2'
    },
    nome: {
        fontSize: 25,
        color: '#38b6ff',
        fontWeight: '700',
        textAlign: 'center',
        textTransform: 'uppercase',
        width: '80%',
        flexShrink: 1,
    },
    endereco: {
        fontSize: 20,
        color: '#0e52B2',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    descricaoContainer: {
        width: '85%',
        paddingHorizontal: 15,
        paddingVertical: 35,
        textAlignVertical: 'center',
        backgroundColor: '#ebeff1',
        marginTop: 65,
        borderRadius: 20,
    },
    descricao: {
        color: '#0e52B2',
        fontSize: 14,
    },
    editPerfilContainer: {
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 30,
        alignSelf: 'flex-end'
    },
    editPerfilIcon: {
        width: 17,
        height: 17,
    },
    editPerfil: {
        fontSize: 13,
        color: '#0e52B2',
        fontWeight: '600',
        marginRight: 25,

    },
    funcoesContainer: {
        width: '100%',
        flexDirection: 'row',
        marginTop: 65,
        justifyContent: 'space-between',
        bottom: 0
    },
    funcoesGrid: {
        flexDirection: 'column',
        alignContent: 'space-between',
        textAlign: 'center',
        width: '23%',
    },
    funcoesIconContainer: {
        width: 75,
        height: 75,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        backgroundColor: '#0e52B2',
        padding: 5
    },
    funcoesTitle: {
        fontSize: 11,
        color: '#0c4a86',
        fontWeight: '700',
        letterSpacing: -0.8,
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    btn: {
        alignItems: 'center'
    }
})