import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import CarouselPost from '../CarouselPost';

export default function MinhaPublicacao({sobreVoce, tipoAjuda, imgPost1, imgPost2, imgPost3}) {
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
        <View style={styles.card}>
            <View style={styles.viewInfo}>
                <Text style={styles.dataPost}>{dataHoraPost}</Text>
                <Text style={styles.status}>Você esta doando</Text>
                <Text style={styles.titulo}>{tipoAjuda}</Text>
                <Text style={styles.description}>{sobreVoce}</Text>
            </View>
            
            <View style={styles.boxImages}>
                <CarouselPost
                    data={imagesPost}
                />
            </View>
            <View style={styles.ViewBtn}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.text}>EXCLUIR</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.text}>EDITAR</Text>
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
        alignItems:'center',
        marginVertical: 10,
        marginHorizontal: 10
    },
    viewInfo:{
        width:'100%'
    },
    dataPost: {
        fontSize: 13,
        fontWeight: '300',
        textAlign: 'right',
        marginVertical: 2,
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
        width: '80%',
        alignItems: 'center',
        flexDirection:'row',
        justifyContent:'space-between',
    },
    button: {
        width: '40%',
        backgroundColor: '#38B6FF',
        borderRadius: 25,
        padding: 15,
        alignItems: 'center'
    },
    text: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '800',
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
        width:'100%',
        padding: 5,
    },
    img: {
        width: 70,
        height: 70,
        margin: 10,
    },

});