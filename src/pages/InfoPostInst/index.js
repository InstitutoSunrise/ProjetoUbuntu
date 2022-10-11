import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Backbutton from '../../components/Backbutton/index';
import PostInfo from '../../components/PostInfo/index';
import { Ionicons, Foundation, MaterialIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

import { getDocs, query, collection, where } from "firebase/firestore";
import db from '../../config/configFirebase';

export default function InfoPostFisi({navigation, route}) {

    const [descricao, setDescricao] = useState();
    const [telefone, setTelefone] = useState();
    const [horario, setHorario] = useState();


    useEffect(async() => {
        const q = query(collection(db, 'Usuários'), where("userId", "==", route.params.userId));
        const querySnapshot = await getDocs(q);
        const getInfos = querySnapshot.forEach(doc => {
            setDescricao(doc.data().descricao);
            setTelefone(doc.data().telefone);
            setHorario(doc.data().horário);
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

        <View style={styles.infomaçoes}>
            <View style={{alignItems:'center', flexDirection:'row'}}>
                <Ionicons name="time-outline" size={24} color="#0e52B2" style={{marginRight:5}}/>
                <Text style={styles.textInfo}>{horario}</Text>
            </View>
            <View style={styles.ViewContato}>
                <View style={{alignItems:'center', flexDirection:'row'}}>
                    <Foundation name="telephone" size={24} color="#0e52B2" style={{marginRight:7}} />
                    <Text style={styles.textInfo}>{telefone}</Text>
                </View>
                
                <View style={{alignItems:'center', flexDirection:'row'}}>
                    <MaterialIcons name="email" size={24} color="#0e52B2" style={{marginRight:7}} />
                    <Text style={styles.textInfo}>bemquerer@gmail.com</Text>
                </View>
                
            </View>
        </View>
        <View style={styles.containerFuncao}>

                        <View style={styles.funcoesGrid}>
                            <View style={styles.btn}>
                                <View style={styles.containerIcon}>
                                    <FontAwesome name="shower" size={40} color="#fff" />
                                </View>
                                <Text style={styles.textFuncoes}>Banho</Text>
                            </View>
                        </View>
                        <View style={styles.funcoesGrid}>
                            <View style={styles.btn}>
                                <View style={styles.containerIcon}>
                                    <FontAwesome name="heart" size={40} color="#fff" />
                                </View>
                                <Text style={styles.textFuncoes}>Voluntário</Text>
                            </View>
                        </View>
                        <View style={styles.funcoesGrid}>
                            <View style={styles.btn}>
                                <View style={styles.containerIcon}>
                                    <MaterialCommunityIcons name="silverware-fork-knife" size={40} color="#fff" />
                                </View>
                                <Text style={styles.textFuncoes}>alimentação</Text>
                            </View>
                        </View>


                    </View>
        <View style={styles.linha}></View>
        <TouchableOpacity style={styles.button}>
                    <Text style={styles.text}>ENTRAR EM CONTATO</Text>
        </TouchableOpacity>
        {/* <View style={styles.ViewPost}>
            <PostInfo
                tipoAjuda={route.params.tipoAjuda}
                sobreVoce={route.params.sobreVoce}
                // nomeUser={route.params.nome}
                // imgUser={route.params.imgUser}
                imgPost1={route.params.imgPost1}
                imgPost2={route.params.imgPost2}
                imgPost3={route.params.imgPost3}
            />
        </View> */}
        
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
    infomaçoes:{
        width:'80%',
        marginVertical:15
    },
    textInfo:{
        textTransform:'uppercase',
        fontSize:14,
    },
    ViewContato:{
        width:'100%',
        flexDirection:'row',
        flexWrap:'wrap',
        alignItems:'center',
        justifyContent:'space-between'
    },
    containerIcon: {
        width: 75,
        height: 75,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        backgroundColor: '#0e52B2',
        padding: 5
    },
    textFuncoes: {
        fontSize: 11,
        color: '#0c4a86',
        fontWeight: '700',
        letterSpacing: -0.8,
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    containerFuncao: {
        width: '80%',
        marginVertical: 10,
        flexDirection: 'row',
        flexWrap:'wrap',
        justifyContent: 'space-between'
    },
    funcoesGrid: {
        flexDirection: 'column',
        alignContent: 'space-between',
        textAlign: 'center',
        width: '23%',
    },
    btn: {
        alignItems: 'center'
    },
    linha:{
        width:'80%',
        height:2,
        backgroundColor:'#38b6ff',
        marginBottom:15,
        marginTop:15
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
        fontWeight: '800',
        letterSpacing: 1,
    },
    // ViewPost:{
    //     width:'100%'
    // },
})