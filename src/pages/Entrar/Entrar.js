import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { getAuth, onAuthStateChanged } from "firebase/auth";


export default function Entrar({navigation}) {

    const Entrar = () => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
        if (user) {
        const uid = user.uid;
        navigation.navigate("Home", {idUser: uid})
        // ...
        }else{
            navigation.navigate('LoginCadastro')
        }
        });
    }

 return (
   <View style={styles.main}>
       <Image 
            style={styles.imggeo}
            source={require('../../assets/figuraGeometrica.png')}/>

       <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#0e52b2"/>

            <Image 
            style={styles.img}
            source={require('../../assets/logo_projeto.png')}/>

            <Text style={styles.texto}>"Gerando gestos de solidariedade"</Text>

            <TouchableOpacity 
            style={styles.botao}
            onPress={Entrar}
            >
            <Text style={styles.textoBotao}>INICIAR</Text>
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
            width: 290,
            height: 290,
            marginTop:50
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