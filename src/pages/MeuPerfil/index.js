import React, { useState, useEffect } from 'react';

import { Image, Text, View, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { Ionicons, FontAwesome5, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

import firebase from '../../config/configFirebase';
import { getAuth } from "firebase/auth";
import {doc, getDocs, docSnap, query, collection, where } from "firebase/firestore";
import db from '../../config/configFirebase';


import Backbutton from '../../components/Backbutton';

export default function MeuPerfil({ navigation }) {

    const [image, setImage] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");

    const [nomeCompleto, setNomeCompleto] = useState();
    const [descricao, setDescricao] = useState();    

    const testes = () => {
        const auth = getAuth();
        const user = auth.currentUser;
        console.log(user.displayName)
    }
    
    async function ShowUserInfos(){
        const auth = getAuth();
        const user = auth.currentUser;
        if (user !== null) {
            setImage(user.photoURL);

            const uid = user.uid;

            const q = query(collection(db, 'Usuários'), where("userId", "==", uid));
            const querySnapshot = await getDocs(q);

            const getInfos = querySnapshot.forEach(doc => {
                if(doc.data().tipoUser = "userFisico"){
                    console.log(doc.data().sobrenome)
                    setNomeCompleto(user.displayName)
                    setDescricao(doc.data().descricao);
                    console.log(doc.data().userId, " => ", doc.data()); 
                } else {
                    console.log(doc.data().userId, " => ", doc.data()); 
                    setNomeCompleto(doc.data().nome )
                    setDescricao(doc.data().descricao);
                }
            })
            return getInfos;    
        }
    }

    useEffect(() => {
        //fetch infos sobre users
        ShowUserInfos();  
    });

    return (
        <View style={styles.container}>

            <StatusBar barStyle="dark-content" backgroundColor="#0e52b2" />
            <ScrollView contentContainerStyle={{ width: '100%' }}>

                <Backbutton onClick={() => navigation.goBack()} />

                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.titulo}>MEU PERFIL</Text>

                    <View style={styles.imgPerfilContainer}>
                        <TouchableOpacity style={styles.imgPerfilContainer} onPress={testes}>
                            {image && <Image source={{uri: image}} style={styles.fotoPerfil} />}
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.nome}>{nomeCompleto}</Text>
                    <Text style={styles.endereco}>Cidade Tiradentes, SP</Text>

                    <View style={styles.descricaoContainer}>
                        <Text style={styles.descricao}>{descricao}</Text>
                    </View>
                </View>

                <View style={styles.editPerfilContainer}>
                    <TouchableOpacity style={styles.editPerfilContainer} onPress={(()=> navigation.navigate('EditarDescUserFis'))}>
                        <FontAwesome5
                            name="edit"
                            size={16}
                            color="#0e52b2"
                        />
                        <Text style={styles.editPerfil}> EDITAR TEXTO</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.funcoesContainer}>
                    <View style={styles.funcoesGrid}>
                        <TouchableOpacity style={styles.btn} onPress={(() => navigation.navigate('EditarPerfilUserInst1'))}>
                            <View style={styles.funcoesIconContainer}>
                                <FontAwesome5
                                name="edit"
                                size={40}
                                color="#fff"
                                />
                            </View>
                            <Text style={styles.funcoesTitle}>EDITAR PERFIL</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.funcoesGrid}>
                        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('minhasPubs')}>
                            <View style={styles.funcoesIconContainer}>
                                <AntDesign name="star" size={40} color="#fff" />
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
                                <MaterialCommunityIcons name="hand-heart" size={40} color="#fff" />
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
        borderRadius: 100,
        borderColor: '#0e52B2',
        marginBottom: 10
    },
    fotoPerfil: {
        height: '95%',
        width: '95%',
        padding: 10,
        borderRadius: 60,
        borderWidth: 2,
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