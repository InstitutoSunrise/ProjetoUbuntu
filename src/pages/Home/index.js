import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, ScrollView, StatusBar} from 'react-native';
import Post from '../../components/post/post';

import CarouselCards from '../../components/CarouselCards';
import { Ionicons } from '@expo/vector-icons';

export default function Home({navigation}) {
    return (
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="dark-content" backgroundColor="#fff" />
          
          <ScrollView contentContainerStyle={{alignItems:'center',width:'100%'}}>
          
            <CarouselCards/>

            <View style={styles.containerFilter}>
                <TouchableOpacity style={styles.filter} onPress={() => navigation.navigate('minhasPubs')}>
                    <Text style={styles.text}>MINHAS PUBLICAÇÕES</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filter} onPress={() => navigation.navigate('instituicoes')}>
                    <Text style={styles.text}>INSTITUIÇÕES</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filter}>
                    <Ionicons style={{marginRight:5}} name="filter" size={25} color="#fff" />
                    <Text style={styles.text}>FILTRO</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.contanierTitulo}>
              <Text style={styles.titulo}>PUBLICAÇÕES</Text>
            </View>

            <Post/>
            <Post/>

          </ScrollView>
        </SafeAreaView>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
      },
      contanierTitulo:{
        marginVertical:5
      },
      titulo:{
        fontSize:30,
        fontWeight:'bold',
        color:'#38B6FF',
      },
      containerFilter:{
        width:'100%',
        padding:15,
        flexDirection:'row',
        justifyContent:'center',
        justifyContent:'space-between'
      },
      filter:{
          padding: 8,
          backgroundColor:"#38B6FF",
          width:'30%',
          borderRadius:25,
          justifyContent:'center',
          alignItems:'center',
          flexDirection:'row'
          
      },
      text:{
          textAlign:'center',
          fontSize:12,
          fontWeight:'bold',
          color:'#fff'
      },
    });