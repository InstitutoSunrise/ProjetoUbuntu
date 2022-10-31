import React, { useState, useEffect } from 'react';

import { Image, Text, View, StyleSheet, TouchableOpacity, TextInput, Modal } from 'react-native';
import { FontAwesome5, Entypo } from '@expo/vector-icons';

import * as ImagePicker from 'expo-image-picker';
import Backbutton from '../../components/Backbutton';

import Editando from '../../components/Carregamento/editando';
import FinalEditando from '../../components/Carregamento/finalEditando';

import firebase from '../../config/configFirebase';
import { getAuth, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import db from '../../config/configFirebase';

import { uploadImageAsync } from '../../config/configStorage';

export default function EditarPerfilUserFis({ navigation, route }) {

    const auth = getAuth();
    const user = auth.currentUser;
    const photoURL = user.photoURL;

    const [modalVisible, setModalVisible] = useState(false)

    const [carregamento, setCarregamento] = useState(false)
    const [finalCarregamento, setFinalCarregamento] = useState(false)

    const [image, setImage] = useState(photoURL);

    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [localizacao, setLocalizacao] = useState('')
    const [descricao, setDescricao] = useState('');


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1,
        });
        if (!result.cancelled) {
            setImage(result.uri);
        };
    };

    const updateProfilePic = async () => {
        const auth = getAuth();
        const user = auth.currentUser;

        await uploadImageAsync(image, user.uid)
    }

    const editarPerfil = async () => {
        setModalVisible(!modalVisible)
        setCarregamento(true)
        const auth = getAuth();
        const user = auth.currentUser;

        if (user.photoURL !== image) {
            updateProfilePic()
        }

        updateProfile(auth.currentUser, {
            displayName: nome + " " + sobrenome
        })

        const userRef = doc(db, "Usuários", route.params.id)

        setDoc(userRef, { nome: nome, sobrenome: sobrenome, endereco: localizacao, descricao: descricao }, { merge: true })
            .then(refs => {
                console.log("Dados atualizados com sucesso!");
            })
            .catch(error => {
                console.log(error);
            })
        setCarregamento(false)
        setFinalCarregamento(true)
    }

    const confirmarMudancas = () => {
        setModalVisible(!modalVisible)
    }

    useEffect(() => {

        setNome(route.params.nome);
        setSobrenome(route.params.sobrenome);
        setDescricao(route.params.descricao);
        if (route.params.localizacao) {
            setLocalizacao(route.params.localizacao);
        } else {
            return
        }

    }, [])

    const confirm = () => {
        setFinalCarregamento(false)
        navigation.navigate('Entrar')
    }

    return (
        <View style={styles.container}>
            <Backbutton onClick={() => navigation.goBack()} />

            <TouchableOpacity style={styles.imgPickerContainer} onPress={pickImage}>
                <View style={styles.foto}>
                    {image && <Image source={{ uri: image }} style={styles.imagePicker} />}
                </View>
                <View style={styles.imgEditIcon}>
                    <FontAwesome5
                        name="edit"
                        size={20}
                        color="#0e52b2"
                    />
                </View>
            </TouchableOpacity>

            <View style={styles.inputsView}>
                <TextInput
                    placeholder="NOME"
                    style={styles.TextInput}
                    value={nome}
                    onChangeText={text => setNome(text)} />

                <TextInput
                    placeholder="SOBRENOME"
                    style={styles.TextInput}
                    value={sobrenome}
                    onChangeText={text => setSobrenome(text)} />


                <View style={styles.localizacaoInputContainer}>
                    <TextInput
                        placeholder="LOCALIZAÇÃO"
                        style={styles.localizacaoInput}
                        value={localizacao}
                        onChangeText={text => setLocalizacao(text)}
                    />
                    <Entypo name="location-pin" size={24} color="#636363" />
                </View>

                <TextInput
                    placeholder="DESCRIÇÃO"
                    style={styles.TextInputDesc}
                    value={descricao}
                    multiline={true}
                    numberOfLines={6}
                    onChangeText={text => setDescricao(text)}
                />

            </View>

            <TouchableOpacity style={styles.botao} onPress={confirmarMudancas}>
                <Text style={styles.textoBotao}>SALVAR</Text>
            </TouchableOpacity>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalView}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalText}>Você tem certeza que deseja fazer essas atualizações?</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TouchableOpacity style={styles.modalBtn} onPress={editarPerfil}>
                                <Text style={styles.modalBtnText}>CONFIRMAR</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalBtn} onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.modalBtnText}>CANCELAR</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {carregamento ?
                <Editando />
                : undefined}
            {finalCarregamento ?
                <FinalEditando
                    onClick={confirm}
                />
                : undefined}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'space-between',
    },
    foto: {
        width: 130,
        height: 130,
        borderRadius: 80,
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e8eaea',
    },
    imgPickerContainer: {
        width: '40%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imgEditIcon: {
        alignSelf: 'flex-end',
        marginLeft: -25,
        marginBottom: 3
    },
    imagePicker: {
        width: '100%',
        height: '100%',
        borderRadius: 80,
    },
    inputsView: {
        width: '100%',
        alignItems: 'center',
    },
    containerInput: {
        justifyContent: "space-between",
        flexDirection: 'row',
        width: '80%',
        marginTop: 10,
    },
    Input: {
        backgroundColor: '#e8eaea',
        paddingVertical: 16,
        paddingHorizontal: 25,
        borderRadius: 30,
        fontSize: 14,
        width: '49%'
    },
    localizacaoInput: {
        fontSize: 14,
        width: '90%',
    },
    localizacaoInputContainer: {
        width: '80%',
        paddingVertical: 16,
        paddingHorizontal: 25,
        borderRadius: 30,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e8eaea',
    },
    TextInputDesc: {
        width: '80%',
        marginTop: 10,
        backgroundColor: '#e8eaea',
        paddingVertical: 16,
        paddingHorizontal: 25,
        borderRadius: 30,
        fontSize: 14,
    },
    TextInput: {
        width: '80%',
        marginTop: 10,
        backgroundColor: '#e8eaea',
        paddingVertical: 16,
        paddingHorizontal: 25,
        borderRadius: 30,
        fontSize: 14,
    },
    botao: {
        marginVertical: 30,
        width: '45%',
        backgroundColor: '#0e52b2',
        padding: 12,
        borderRadius: 30,
    },
    textoBotao: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: '800',
        color: '#fff',
        letterSpacing: 2
    },
    modalView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#rgba(0,0,0,0.5)',
    },
    modalContainer: {
        width: '90%',
        height: '30%',
        borderRadius: 40,
        backgroundColor: '#fff',
        padding: 25
    },
    modalText: {
        fontSize: 20,
        fontWeight: '700',
        color: '#0e52b2',
        textTransform: "uppercase",
    },
    modalBtn: {
        marginTop: 35,
        width: '45%',
        backgroundColor: '#0e52b2',
        padding: 20,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBtnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '800',
    }
})