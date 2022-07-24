import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Backbutton from '../../components/Backbutton/index';
import PostInstituicao from '../../components/postInstituicao/postInstituicao';

export default function Instituicoes({navigation}) {
 return (
   <View style={styles.container}>
        <Backbutton onClick={() => navigation.goBack()}/>
        <ScrollView contentContainerStyle={{alignItems:'center',width:'100%'}}>
            <Text style={styles.titulo}>INSTITUIÇÕES</Text>
            <Text style={styles.subTitulo}>Clique no nome da instituição e saiba mais informações sobre ela</Text>

            <PostInstituicao onClick={() => navigation.navigate('instituiçãoDetalhe')}/>
            <PostInstituicao onClick={() => navigation.navigate('instituiçãoDetalhe')}/>
            <PostInstituicao onClick={() => navigation.navigate('instituiçãoDetalhe')}/>
            <PostInstituicao onClick={() => navigation.navigate('instituiçãoDetalhe')}/>

        </ScrollView>
        
   </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    },
    titulo:{
        fontSize:40,
        fontWeight:'bold',
        color:'#38B6FF',
        marginTop: 20,
    },
    subTitulo:{
        fontSize:17,
        color:'#0c4a86',
        textAlign:'center',
        textTransform:'uppercase'
    },
})