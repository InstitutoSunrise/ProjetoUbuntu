import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Image, RecyclerViewBackedScrollView, Text } from 'react-native';
import Backbutton from '../../components/Backbutton';

import * as ImagePicker from 'expo-image-picker';

import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

export default function EditarPost({ navigation, route }) {

    const [tipoAjuda, setTipoAjuda] = useState(route.params.tipoAjuda);
    const [sobreVoce, setSobreVoce] = useState(route.params.sobreVoce)

    const [image, setImage] = useState();

    useEffect(() => {
        setImage("https://bravo.org.br/wp-content/uploads/2020/09/WhatsApp-Image-2020-09-05-at-15.05.55-e1599345710763.jpeg")
        console.log(image)
    }, [image])
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

    return (
        <View style={styles.container}>
            <Backbutton onClick={() => navigation.goBack()} />

            <View style={styles.descInput}>
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
            </View>

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

            <View style={styles.imgPickerContainer}>
                <TouchableOpacity onPress={pickImage} style={styles.imgPicker}>
                    <MaterialCommunityIcons
                        name="file-image-plus"
                        size={55}
                        color='#0e52b2'
                    />
                </TouchableOpacity>

                <View style={styles.imgPickedContainer}>
                    <View style={styles.image}>
                        <Image source={{ uri: image }} style={styles.imgPicked} />
                        <TouchableOpacity>
                            <AntDesign name="close" size={25} color="#ebeff1" style={{ marginLeft: -25 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.image}>
                        <Image source={{ uri: image }} style={styles.imgPicked} />
                        <TouchableOpacity>
                            <AntDesign name="close" size={25} color="#ebeff1" style={{ marginLeft: -25 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.image}>
                        <Image source={{ uri: image }} style={styles.imgPicked} />
                        <TouchableOpacity>
                            <AntDesign name="close" size={25} color="#ebeff1" style={{ marginLeft: -25 }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <TouchableOpacity style={styles.btnEditar}>
                <Text style={styles.textBtnEditar}>EDITAR</Text>
            </TouchableOpacity>
        </View>
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