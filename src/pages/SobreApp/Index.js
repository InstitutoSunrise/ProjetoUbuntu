import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import CarouselCardsEquipe from '../../components/CarouselCardsEquipe';
import Backbutton from '../../components/Backbutton/index'

export default function SobreApp({navigation}) {
 return (
   <View style={styles.conteiner}>
    <StatusBar barStyle="dark-content" backgroundColor="#0e52b2"/>
    <ScrollView contentContainerStyle={{alignItems:'center',width:'100%'}}>
    <Backbutton onClick={() => navigation.goBack()}/>

    <Text style={styles.titulo}>Sobre o App</Text>
    <View style={styles.containerText}>
      <Text style={styles.text}>A UBUNTU consiste em um aplicativo mobile, no qual famílias necessitadas encontrarão  a ajuda que necessitam no momento.
      Um projeto sem fins lucrativos e com enorme vontade de ajudar aqueles que necessitam.</Text>

      <TouchableOpacity style={{marginTop:25,flexDirection:'row', alignItems:'center'}}>
        <Entypo style={{marginRight:3}}name="instagram-with-circle" size={30} color="#0e52b2" />
        <Text style={styles.textInsta}>@ubuntu_sunrise</Text>
      </TouchableOpacity>
      
    </View>

    <TouchableOpacity 
        style={styles.botao}
        >
        <Text style={styles.textoBotao}>Conheça o nosso site</Text>
    </TouchableOpacity>
    <Text style={styles.SubTitulo}>Nossa equipe</Text>
    <CarouselCardsEquipe/>

    </ScrollView>
   </View>
  );
}

const styles = StyleSheet.create({
  conteiner:{
    flex:1,
    backgroundColor:'#fff'
  },
  titulo:{
    fontSize:50,
    fontWeight:'bold',
    color:'#38B6FF',
    marginTop: 30,
    textTransform:'uppercase'
  },
  SubTitulo:{
    fontSize:50,
    fontWeight:'bold',
    color:'#38B6FF',
    marginVertical:25,
  },
  containerText:{
    width:'90%',
    backgroundColor:'#e8eaea',
    padding:15,
    marginVertical:30,
    borderRadius:10
  },
  text:{
    fontSize:15,
    fontStyle:'italic',
    color:'#0e52b2',
    textAlign:'justify'
  },
  botao:{
    // width:200,
    backgroundColor:'rgb(14, 82, 178)',
    paddingHorizontal:15,
    paddingVertical:20,
    borderRadius:30,
  },
  textoBotao:{
      textAlign:'center',
      fontSize:20,
      fontWeight:'800',
      color:'#fff',
      letterSpacing:2,
      textTransform:'uppercase'
  },
})