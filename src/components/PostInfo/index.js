import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import CarouselPost from '../CarouselPost';
import { useEffect } from 'react';


export default function post({ sobreVoce, tipoAjuda, nomeUser, imgUser, imgPost1, imgPost2, imgPost3, onClick }) {

    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes

    const [dataHoraPost, setDataHoraPost] = useState(date + '/' + month + '/' + year
        + ' - ' + hours + ':' + min)

    const [imagesPost, setImagesPost] = useState([])


    const getImages = () => {
        let newArray = imagesPost
        newArray = [imgPost1, imgPost2, imgPost3]
        setImagesPost([...newArray])
    }

    useEffect(() => {
        getImages()
    }, [imgPost3])

    return (
        <View onPress={onClick} style={styles.card}>
            <Text style={styles.dataPost}>{dataHoraPost}</Text>
            {/* <View style={styles.userDatail}>
                <Image source={{ uri: imgUser }} style={styles.fotoPerfil} />
                <View style={styles.userText}>
                    <Text style={styles.name}>{nomeUser}</Text>
                    <Text style={styles.cidade}>Itaquera, SP</Text>
                </View>
            </View> */}
            <Text style={styles.titulo}>{tipoAjuda}</Text>
            <Text style={styles.description}>{sobreVoce}</Text>
            <View style={styles.boxImages}>
                <CarouselPost
                    data={imagesPost}
                />
            </View>
            <View style={styles.ViewBtn}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.text}>ENTRAR EM CONTATO</Text>
                </TouchableOpacity>
            </View>

        </View>
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
    // userDatail: {
    //     width: '100%',
    //     flexDirection: 'row',
    //     alignItems: 'center',
    // },
    // userText: {
    //     marginLeft: 10,
    //     justifyContent: 'center'
    // },
    // name: {
    //     textTransform: 'uppercase',
    //     color: '#0e52b2',
    //     fontSize: 16,
    //     fontWeight: '800'
    // },
    // cidade: {
    //     textTransform: 'capitalize',
    //     color: '#0e52b2',
    //     fontSize: 16,
    //     fontWeight: '700'
    // },
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