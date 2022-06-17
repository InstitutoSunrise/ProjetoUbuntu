import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, ScrollView, StatusBar} from 'react-native';
import Post from '../../components/post/post';
import Filters from '../../components/filterHome/index';
import CarouselCards from '../../components/CarouselCards';

export default function Home({navigation}) {
    return (
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="dark-content" backgroundColor="#fff" />
          
          <ScrollView contentContainerStyle={{alignItems:'center',width:'100%'}}>
          
            <CarouselCards/>

            <Filters/>

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
        alignItems: 'center',
        // justifyContent: 'center',
      },
      contanierTitulo:{
        marginVertical:5
      },
      titulo:{
        fontSize:30,
        fontWeight:'bold',
        color:'#38B6FF',
      },
    });