import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Image, Modal, Text } from 'react-native';
import Backbutton from '../../components/Backbutton';
import Carregamento from '../../components/Carregamento/EditarPost';
import FinalCarregamento from '../../components/Carregamento/EditarPostFinal';

import { uploadImagePost } from '../../config/configStorage';
import { getStorage, ref, deleteObject } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import db from '../../config/configFirebase';

import * as ImagePicker from 'expo-image-picker';

import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

export default function EditarPost({ navigation, route }) {

    const [tipoAjuda, setTipoAjuda] = useState(route.params.tipoAjuda);
    const [sobreVoce, setSobreVoce] = useState(route.params.sobreVoce);
    const [status, setStatus] = useState(route.params.status);
    const [idPost, setIdPost] = useState(route.params.idPost);

    const [carregamento, setCarregamento] = useState(false)
    const [finalCarregamento, setFinalCarregamento] = useState(false)
    const [atualizarImg, setAtualizarImg] = useState(false);
    const [newImg, setNewImg] = useState(false)
    const [image, setImage] = useState([route.params.imgPost1, route.params.imgPost2, route.params.imgPost3]);
    const [image1, setImage1] = useState(route.params.imgPost1);
    const [image2, setImage2] = useState(route.params.imgPost2);
    const [image3, setImage3] = useState(route.params.imgPost3);

    useEffect(() => {

    }, [atualizarImg])

    const Excluir = () => {
        image.splice(image.indexOf(image[0]), 1)
        setAtualizarImg(!atualizarImg);
    }

    const Excluir2 = () => {
        image.splice(image.indexOf(image[1]), 1)
        setAtualizarImg(!atualizarImg);
    }

    const Excluir3 = () => {
        image.splice(image.indexOf(image[2]), 1)
        setAtualizarImg(!atualizarImg);
    }

    function addImgIndex(imgUri) {

        if (image.length < 3) {
            let newArray = image
            newArray[newArray.length] = imgUri
            setImage(newArray)
            setNewImg(!newImg)
        } else {
            let newArray = image
            newArray[2] = imgUri
            setImage(newArray)
            setNewImg(!newImg)
        }

    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            addImgIndex(result.uri)
        };
    }

    const Editar = async () => {
        setCarregamento(true)
        if (status === 'Doando') {

            const auth = getAuth();
            const userId = auth.currentUser.uid;
            const urlImg1 = await uploadImagePost(image[0], userId);
            const urlImg2 = await uploadImagePost(image[1], userId);
            const urlImg3 = await uploadImagePost(image[2], userId);

            const updateRef = doc(db, "posts", idPost);

            await updateDoc(updateRef, {
                sobreVoce: sobreVoce,
                imgPost1: urlImg1,
                imgPost2: urlImg2,
                imgPost3: urlImg3,
            });

            const storage = getStorage();

            // Create a reference to the file to delete
            const desertRef = ref(storage, image1);
            const desertRef2 = ref(storage, image2);
            const desertRef3 = ref(storage, image3);

            deleteObject(desertRef)
                .then(() => {
                })
                .catch((error) => {
                });

            deleteObject(desertRef2)
                .then(() => {
                })
                .catch((error) => {
                });

            deleteObject(desertRef3)
                .then(() => {
                })
                .catch((error) => {
                });

        } else {
            const updateRef = doc(db, "posts", idPost);

            await updateDoc(updateRef, {
                tipoAjuda: tipoAjuda,
                sobreVoce: sobreVoce,
            });
        }
        setCarregamento(false)
        setFinalCarregamento(true)
    }

    return (
        <>
            <View style={styles.container}>
                <Backbutton onClick={() => navigation.goBack()} />

                {status === 'Recebendo' ? <View style={styles.descInput}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={setTipoAjuda}
                        value={tipoAjuda}
                        placeholder="Que tipo de ajuda você precisa no momento?"
                        multiline
                        numberOfLines={5}
                        autoCapitalize={'sentences'}
                        autoCorrect
                        maxLength={200}
                        textBreakStrategy={'highQuality'}
                    />
                </View> : undefined}

                <View style={styles.aboutInput}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={setSobreVoce}
                        value={sobreVoce}
                        placeholder="Fale um pouco sobre você..."
                        multiline
                        numberOfLines={8}
                        autoCapitalize={'sentences'}
                        autoCorrect
                        maxLength={350}
                    />
                </View>


                {status === 'Doando' ? <View style={styles.imgPickerContainer}>
                    <TouchableOpacity onPress={pickImage} style={styles.imgPicker}>
                        <MaterialCommunityIcons
                            name="file-image-plus"
                            size={55}
                            color='#0e52b2'
                        />
                    </TouchableOpacity>

                    <View style={styles.imgPickedContainer}>
                        <View style={styles.image}>
                            <Image source={{ uri: image[0] }} style={styles.imgPicked} />
                            <TouchableOpacity onPress={Excluir}>
                                <AntDesign name="close" size={25} color="#ebeff1" style={{ marginLeft: -25 }} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.image}>
                            <Image source={{ uri: image[1] }} style={styles.imgPicked} />
                            <TouchableOpacity onPress={Excluir2}>
                                <AntDesign name="close" size={25} color="#ebeff1" style={{ marginLeft: -25 }} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.image}>
                            <Image source={{ uri: image[2] }} style={styles.imgPicked} />
                            <TouchableOpacity onPress={Excluir3}>
                                <AntDesign name="close" size={25} color="#ebeff1" style={{ marginLeft: -25 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View> : undefined}
                <TouchableOpacity style={styles.btnEditar} onPress={Editar}>
                    <Text style={styles.textBtnEditar}>PRONTO</Text>
                </TouchableOpacity>
            </View>
            {carregamento ?
                <Carregamento />
                : undefined}
            {finalCarregamento ?
                <FinalCarregamento
                    onClick={() => setFinalCarregamento(false)}
                />
                : undefined}
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    textInput: {
        fontSize: 15,
        color: '#545454',
        fontWeight: '700',
        padding: 10,
        marginTop: -20,
        width: '100%',
        alignContent: 'flex-start',
        alignContent: 'flex-start',
        alignItems: 'flex-start',
        alignSelf: 'flex-start'
    },
    descInput: {
        paddingVertical: 15,
        width: '85%',
        backgroundColor: '#ebeff1',
        marginTop: 15,
        borderRadius: 20,
    },
    aboutInput: {
        paddingVertical: 15,
        width: '85%',
        backgroundColor: '#ebeff1',
        marginTop: 15,
        borderRadius: 20,
    },
    imgPickerContainer: {
        width: '85%',
        alignContent: 'center',
        marginVertical: 20,
    },
    imgPicker: {
        width: '20%'
    },
    imgPickedContainer: {
        flexDirection: 'row',
        width: '90%',
        marginTop: 15,
    },
    imgPicked: {
        width: 90,
        height: 90,
        marginLeft: 15,
    },
    image: {
        flexDirection: 'row'
    },
    btnEditar: {
        width: '40%',
        paddingVertical: 12,
        textAlign: 'center',
        borderRadius: 60,
        backgroundColor: '#0e52B2',
        marginTop: 30,
    },
    textBtnEditar: {
        fontSize: 25,
        fontWeight: '800',
        textAlign: 'center',
        color: '#fff'
    }
})