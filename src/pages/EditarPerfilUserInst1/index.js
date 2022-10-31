import React, { useState, useEffect } from 'react';

import { Image, Text, View, StyleSheet, TouchableOpacity, TextInput, ScrollView, Modal } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import * as ImagePicker from 'expo-image-picker';
import MaskInput from 'react-native-mask-input';
import Backbutton from '../../components/Backbutton';

import Editando from '../../components/Carregamento/editando';
import FinalEditando from '../../components/Carregamento/finalEditando';

import firebase from '../../config/configFirebase';
import db from '../../config/configFirebase';
import { getAuth, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { uploadImageAsync } from '../../config/configStorage';

export default function EditarPerfilUserInst1({ route, navigation }) {

    const auth = getAuth();
    const user = auth.currentUser;
    const photoURL = user.photoURL;

    const [modalVisible, setModalVisible] = useState(false)

    const [carregamento, setCarregamento] = useState(false)
    const [finalCarregamento, setFinalCarregamento] = useState(false)

    const [image, setImage] = useState(photoURL);

    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');

    const [cep, setCep] = useState('');
    const [endereco, setEndereco] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');

    const [cepValido, setCepValido] = useState(true);


    const fetchCep = (cep) => {

        cep = cep.replace(/[^\d]+/g, '');
        console.log(cep.length);
        if (cep.length !== 8) {
            setCepValido(false);
        } else {
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then(res => res.json()).then(data => {

                    if (data.erro === "true") {
                        setCepValido(false);
                    } else {
                        setCepValido(true)
                        setEndereco(data.logradouro);
                    }

                })
                .catch((err) => console.log(err));
        }

    }

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
        if (cepValido == false) {
            alert("CEP Inválido")
            setModalVisible(!modalVisible)
        } else {
            setModalVisible(!modalVisible)
            setCarregamento(true)
            const auth = getAuth();
            const user = auth.currentUser;

            if (user.photoURL !== image) {
                updateProfilePic()
            }

            updateProfile(auth.currentUser, {
                displayName: nome
            })

            const userRef = doc(db, "Usuários", route.params.id)

            setDoc(userRef, { nome: nome, cep: cep, endereço: endereco, numero: numero, complemento: complemento, descricao: descricao }, { merge: true })
                .then(refs => {
                    console.log("Dados atualizados com sucesso!");
                })
                .catch(error => {
                    console.log(error);
                })
            setCarregamento(false)
            setFinalCarregamento(true)
        }
    }

    const confirmarMudancas = () => {
        setModalVisible(!modalVisible)
    }

    useEffect(() => {

        setNome(route.params.nome);
        setCep(route.params.cep);
        setEndereco(route.params.endereco)
        setNumero(route.params.numero)
        setComplemento(route.params.complemento)
        setDescricao(route.params.descricao)

    }, [])

    const confirm = () => {
        setFinalCarregamento(false)
        navigation.navigate('Entrar')
    }


    return (
        <ScrollView contentContainerStyle={styles.container}>
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
                    placeholder="NOME DA INSTITUIÇÃO"
                    style={styles.TextInput}
                    value={nome}
                    onChangeText={text => setNome(text)}
                />
                <MaskInput
                    placeholder="DIGITE SEU CEP"
                    keyboardType={'number-pad'}
                    style={cepValido ? styles.TextInput : styles.TextInputError}
                    value={cep}
                    onChangeText={(masked, unmasked) => {
                        setCep(masked);

                    }}
                    onBlur={(() => fetchCep(cep))}
                    mask={[/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
                />

                <TextInput
                    placeholder="ENDEREÇO"
                    style={styles.TextInput}
                    value={endereco}
                    onChangeText={text => setEndereco(text)} />

                <TextInput
                    placeholder="NUMERO"
                    style={styles.TextInput}
                    value={numero}
                    onChangeText={text => setNumero(text)}
                    keyboardType={'number-pad'} />

                <TextInput
                    placeholder="COMPLEMENTO"
                    style={styles.TextInput}
                    value={complemento}
                    onChangeText={text => setComplemento(text)} />

                <TextInput
                    placeholder="DESCRIÇÃO"
                    style={styles.TextInputDesc}
                    value={descricao}
                    multiline={true}
                    numberOfLines={7}
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

        </ScrollView>

    );
}

const styles = StyleSheet.create({
    container: {
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
    TextInput: {
        width: '80%',
        marginTop: 10,
        backgroundColor: '#e8eaea',
        paddingVertical: 16,
        paddingHorizontal: 25,
        borderRadius: 30,
        fontSize: 14,
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
    TextInput: {
        width: '80%',
        marginTop: 15,
        backgroundColor: '#e8eaea',
        paddingVertical: 16,
        paddingHorizontal: 25,
        borderRadius: 30,
        fontSize: 14,
    },
    TextInputError: {
        backgroundColor: '#e8eaea',
        borderColor: '#ff4040',
        borderWidth: 1,
        color: '#ff4040',
        paddingVertical: 16,
        paddingHorizontal: 25,
        borderRadius: 30,
        fontSize: 14,
        width: '80%',
        marginTop: 15,
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