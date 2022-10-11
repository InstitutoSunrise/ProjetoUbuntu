import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Backbutton from '../../components/Backbutton/index';
import PostInfo from '../../components/PostInfo/index';
import { Ionicons } from '@expo/vector-icons';

import { getDocs, query, collection, where } from "firebase/firestore";
import db from '../../config/configFirebase';

export default function InfoPostFisi({navigation, route}) {

    const [descricao, setDescricao] = useState();

    useEffect(async() => {
        const q = query(collection(db, 'Usuários'), where("userId", "==", route.params.userId));
        const querySnapshot = await getDocs(q);
        const getInfos = querySnapshot.forEach(doc => {
            setDescricao(doc.data().descricao);
        })
        return getInfos;
    }, [route.params.nome]);

 return (
   <View style={styles.container}>
        <Backbutton onClick={() => navigation.goBack()}/>
        <Text style={styles.nome}>{route.params.nome}</Text>
        <Text style={styles.endereco}><Ionicons name="location" size={24} color="#0e52B2" />Barro Branco, SP</Text>
        <View style={styles.imgPerfilContainer}>
            <Image source={{ uri: route.params.imgUser }} style={styles.fotoPerfil} />
        </View>
        <Text style={styles.descricao}>{descricao}</Text>
        <View style={styles.linha}></View>
        <View style={styles.ViewPost}>
            <PostInfo
                tipoAjuda={route.params.tipoAjuda}
                sobreVoce={route.params.sobreVoce}
                // nomeUser={route.params.nome}
                // imgUser={route.params.imgUser}
                imgPost1={route.params.imgPost1}
                imgPost2={route.params.imgPost2}
                imgPost3={route.params.imgPost3}
            />
        </View>
        
   </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fff",
        alignItems:"center",
    },
    nome:{
        width: '80%',
        fontSize: 35,
        color: '#38b6ff',
        textAlign: 'center',
        fontWeight: '700',
        marginTop: 30,
    },
    endereco:{
        color:'#0e52B2',
        fontSize:25,
        fontWeight:'500',
        // marginTop:2,
        marginBottom:15
    },
    imgPerfilContainer: {
        width: 160,
        height: 160,
        alignItems: 'center',
        borderStyle: 'solid',
        borderRadius: 100,
        borderColor: '#0e52B2',
        marginBottom: 10
    },
    fotoPerfil:{
        height: '95%',
        width: '95%',
        padding: 10,
        borderRadius: 80,
        borderWidth: 2,
        borderColor: '#0e52B2'
    },
    descricao:{
        width:'80%',
        color:'#0e52B2',
        fontSize:18,
    },
    linha:{
        width:'80%',
        height:2,
        backgroundColor:'#38b6ff',
        marginBottom:5,
        marginTop:15
    },
    ViewPost:{
        width:'100%'
    },
})