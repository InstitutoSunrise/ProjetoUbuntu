import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, ScrollView} from 'react-native';
import Post from '../../components/post/post';
import Filters from '../../components/filterHome/index';

export default function Home({navigation}) {
    return (
        <SafeAreaView style={styles.container}>
          <ScrollView contentContainerStyle={{alignItems:'center'}}>
            {/* <TouchableOpacity onPress={() => navigation.navigate('Sobre')}>
                <Text>Aperte</Text>
            </TouchableOpacity> */}
            <Image 
              style={styles.carrosel}
              source={require('../../assets/carrosel-img1.jpg')}>
            </Image>
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
      carrosel:{
        width:'100%',
        height:200,
      },
      contanierTitulo:{
        marginBottom:15
      },
      titulo:{
        fontSize:30,
        fontWeight:'bold',
        color:'#00c4cc',
      },
    });