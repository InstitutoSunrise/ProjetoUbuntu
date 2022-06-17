import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';

export default function Entrar({navigation}) {
 return (
   <View style={styles.container}>
       <StatusBar barStyle="dark-content" backgroundColor="rgb(14, 82, 178)"/>

       <Image 
       style={styles.img}
       source={require('../../assets/ubuntu.jpg')}/>

       <Text style={styles.texto}>"Gerando gestos de solidariedade"</Text>

       <TouchableOpacity 
       style={styles.botao}
       onPress={() => navigation.navigate('LoginCadastro')}
       >
           <Text style={styles.textoBotao}>INICIAR</Text>
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
            height: 250
        },
        texto:{
            fontSize:18,
            fontStyle:'italic',
            paddingVertical:10,
        },
        botao:{
            width:200,
            backgroundColor:'rgb(14, 82, 178)',
            marginTop:'20%',
            padding:12,
            borderRadius:30,
        },
        textoBotao:{
            textAlign:'center',
            fontSize:25,
            fontWeight:'bold',
            color:'#fff',
            letterSpacing:2
        },
    });