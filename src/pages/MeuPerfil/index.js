import React, { useState, useEffect, useCallback } from 'react';

import { Image, Text, View, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { Ionicons, FontAwesome5, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

import { getAuth } from "firebase/auth";
import { getDocs, query, collection, where } from "firebase/firestore";
import db from '../../config/configFirebase';


import Backbutton from '../../components/Backbutton';

export default function MeuPerfil({ navigation }) {

    const [image, setImage] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");

    const [nomeCompleto, setNomeCompleto] = useState();
    const [descricao, setDescricao] = useState();
    const [endereco, setEndereco] = useState();
    const [numero, setNumero] = useState();
    const [tipoUser, setTipoUser] = useState();
    const [numTel, setNumTel] = useState();
    const [email, setEmail] = useState();
    const [dataNasc, setDataNascimento] = useState();

    const [nome, setNome] = useState();
    const [sobrenome, setSobrenome] = useState();

    const [cep, setCep] = useState('');
    const [complemento, setComplemento] = useState('');


    const [docId, setDocId] = useState();

    async function ShowUserInfos() {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user !== null) {
            setImage(user.photoURL);

            const uid = user.uid;

            const q = query(collection(db, 'Usuários'), where("userId", "==", uid));
            const querySnapshot = await getDocs(q);
            const getInfos = querySnapshot.forEach(doc => {
                if (doc.data().tipoUser == "userFisico") {

                    setNome(doc.data().nome);
                    setSobrenome(doc.data().sobrenome);

                    setNomeCompleto(user.displayName);
                    setDescricao(doc.data().descricao);
                    setEndereco(doc.data().endereco);
                    setNumero(doc.data().numero);
                    setTipoUser("Fis");
                    setNumTel(doc.data().telefone)
                    setDocId(doc.id);
                    setEmail(doc.data().email)
                    setDataNascimento(doc.data().datanascimento)

                } else {

                    setNomeCompleto(doc.data().nome)
                    setDescricao(doc.data().descricao);
                    setEndereco(doc.data().endereco);
                    setNumero(doc.data().numero);
                    setTipoUser("Inst");
                    setNumTel(doc.data().telefone);
                    setCep(doc.data().cep);
                    setComplemento(doc.data().complemento);
                    setEmail(doc.data().email);

                    setDocId(doc.id);

                }
            })
            return getInfos;
        }
    }

    const VerificarLocalLabel = () => {
        if (numero) {
            return <Text style={styles.endereco}>{endereco}, {numero} </Text>
        } else {
            return <Text style={styles.endereco}>{endereco} </Text>
        }
    }

    const editarPost = () => {
        if (tipoUser == "Fis") {
            navigation.navigate('EditarPerfilUserFis', { id: docId, nome: nome, sobrenome: sobrenome, descricao: descricao, localizacao: endereco })
        } else {
            navigation.navigate('EditarPerfilUserInst1', { id: docId, nome: nomeCompleto, cep: cep, endereco: endereco, numero: numero, complemento: complemento, descricao: descricao })
        }
    }

    useEffect(() => {
        //fetch infos sobre users
        ShowUserInfos();
    });

    return (
        <View style={styles.container}>

            <StatusBar barStyle="dark-content" backgroundColor="#0e52b2" />
            <ScrollView>

                <Backbutton onClick={() => navigation.goBack()} />

                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.titulo}>MEU PERFIL</Text>

                    <View style={styles.imgPerfilContainer}>
                        <TouchableOpacity style={styles.imgPerfilContainer}>
                            {image && <Image source={{ uri: image }} style={styles.fotoPerfil} />}
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.nome}>{nomeCompleto}</Text>

                    {endereco ? <VerificarLocalLabel /> : undefined}

                    <View style={styles.descricaoContainer}>
                        <Text style={styles.descricao}>{descricao}</Text>
                    </View>
                </View>

                <View style={styles.funcoesContainer}>
                    <View style={styles.funcoesGrid}>
                        <TouchableOpacity style={styles.btn} onPress={editarPost}>
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
                        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Configurações', { id: docId, tipoUser: tipoUser, telefone: numTel, email: email, dataNasc: dataNasc })}>
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
        backgroundColor: '#fff'
    },
    titulo: {
        width: '90%',
        fontSize: 35,
        color: '#38b6ff',
        textAlign: 'center',
        fontWeight: '700',
        marginBottom: 20,
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
        marginTop: 60,
        borderRadius: 20,
    },
    descricao: {
        color: '#0e52B2',
        fontSize: 14,
    },
    funcoesContainer: {
        width: '100%',
        flexDirection: 'row',
        marginTop: 130,
        justifyContent: 'space-between',
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