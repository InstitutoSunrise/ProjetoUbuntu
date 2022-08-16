import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';



export default function LoginCadastro({navigation}) {

 return (
   <View style={styles.main}>

    <Image 
            style={styles.imggeo}
            source={require('../../assets/figuraGeometrica.png')}/>

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
        onPress={() => navigation.navigate('EscolherTipoCadastro')}
        >
            <Text style={styles.textoBotao}>CADASTRAR</Text>
            </TouchableOpacity>
    </View> 

    <Image 
            style={styles.imggeo2}
            source={require('../../assets/figuraGeometrica2.png')}/>

   </View>
  );
}

    const styles = StyleSheet.create({
        main:{
            flex: 1,
            backgroundColor:'#fff',
            flexDirection:'column', 
            overflow:'hidden',
        },
        container:{
            flex:1,
            justifyContent:'center',
            alignItems:'center'
        },
        img:{
            width: 250,
            height: 250,
            marginBottom:60
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
        imggeo:{
            width: 250,
            height: 250,
            alignSelf:'flex-start',
            top:0,
            marginTop:-80,
            marginLeft:-80
        },
        imggeo2:{
            width: 250,
            height: 250,
            bottom:-80,
            right:-80,
            alignSelf:'flex-end',
        },
    });