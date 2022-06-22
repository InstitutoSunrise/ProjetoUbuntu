import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';

export default function LoginCadastro({navigation}) {
 return (
   <View style={styles.container}>
       <StatusBar barStyle="dark-content" backgroundColor="rgb(14, 82, 178)"/>
       
       <Image 
       style={styles.img}
       source={require('../../assets/figura1.png')}/>


       <TouchableOpacity 
       style={styles.botao}
       onPress={() => navigation.navigate('Login')}
       >
           <Text style={styles.textoBotao}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity 
       style={styles.botao}
       onPress={() => navigation.navigate('Home')}
       >
           <Text style={styles.textoBotao}>CADASTRAR</Text>
        </TouchableOpacity>
   </View>
  );
}

    const styles = StyleSheet.create({
        container:{
            flex: 1,
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:'#fff'
        },
        img:{
            width: 250,
            height: 250,
            marginBottom:'20%'
        },
        botao:{
            backgroundColor:'rgb(14, 82, 178)',
            width:250,
            paddingVertical: 18,
            borderRadius:35,
            margin:10
        },
        textoBotao:{
            textAlign:'center',
            fontSize:25,
            fontWeight:'800',
            color:'#fff',
            letterSpacing:2
        },
    });