import React, {useState} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getStorage, ref, getDownloadURL } from "firebase/storage";

export default function postInstituicao({nome, endereco, numero, telefone,horario, userId, navigation, descricao, email, banho, alimento, voluntario}) {

    const [img, setImg] = useState('')
    
    const storage = getStorage();
    const starsRef = ref(storage, `photoPerfil/${userId}`);

    // Get the download URL
    getDownloadURL(starsRef)
    .then((url) => {
        // Insert url into an <img> tag to "download"
        setImg(url)
    })
    .catch((error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
        case 'storage/object-not-found':
            // File doesn't exist
            break;
        case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
        case 'storage/canceled':
            // User canceled the upload
            break;
        case 'storage/unknown':
            // Unknown error occurred, inspect the server response
            break;
        }
    });
    return (
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('InstituiçãoDetalhe', {nomeInst:nome, endereco: endereco, numero:numero, telefone:telefone, horario:horario, descricao:descricao, img:img, email:email, banho:banho, voluntario:voluntario, alimento:alimento })}>
            <Ionicons style={styles.icon} name="bookmark" size={50} color="rgb(14, 82, 178)" />

            <View style={styles.box}>
                <Text style={styles.nomeInst}>{nome}</Text>
                <View style={styles.boxImg}>
                    <Image
                        style={styles.img}
                        source={{uri:img}} />
                </View>
            </View>
            <Text style={styles.endereco}>{endereco}, {numero}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        height: 180,
        backgroundColor: '#e8eaea',
        borderRadius: 8,
        marginVertical: 10,
        marginHorizontal: 20,
        paddingHorizontal: 5,
        // alignItems:'center'
    },
    icon: {
        alignItems: 'flex-start'
    },
    box: {
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    nomeInst: {
        width:'60%',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#38B6FF',
        marginRight: 8,
        textTransform: 'uppercase'
    },
    boxImg: {
        width:'30%',
        marginTop: -30
    },
    img: {
        width: 100,
        height: 100,
        borderRadius: 50,
        
    },
    endereco: {
        marginTop: 17,
        color: 'rgb(14, 82, 178)',
        textAlign: 'center',
        fontSize: 13,
        textTransform: 'uppercase'
    },
})