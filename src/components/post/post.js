import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';


export default function post({sobreVoce, tipoAjuda, status, nomeUser, imgUser, imgPost1, imgPost2, imgPost3}) {
 return (
   <View style={styles.card}>
       <View style={styles.userDatail}>
            <Image source={{uri: imgUser}} style={styles.fotoPerfil} />
            <View style={styles.userText}>
                <Text style={styles.name}>{nomeUser}</Text>
                <Text style={styles.cidade}>Itaquera, SP</Text>
            </View>
       </View>
       <Text style={styles.status}>{status}</Text>
       <Text style={styles.assunto}>{tipoAjuda}</Text>
       <Text style={styles.description}>{sobreVoce}</Text>
        <View style={styles.boxImages}>
            <Image
                style={styles.img}
                source={imgPost1}
            />
            <Image
                style={styles.img}
                source={imgPost2}
            />
            <Image
                style={styles.img}
                source={imgPost3}
            />
        </View>
        <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>ENTRAR EM CONTATO</Text>
        </TouchableOpacity>
   </View>
  );
}

const styles = StyleSheet.create({
    card:{
        backgroundColor:'#e8eaea',
        width: '100%',
        height:'auto',
        borderRadius:8,
        padding:15,
        alignItems:'center',
        justifyContent:'space-between',
        marginVertical:10,
        // borderColor:'#38B6FF',
        // borderWidth:2
    },
    userDatail:{
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
    },
    userText:{
        alignItems:'center',
        textAlign:'left',
        marginLeft: 5,
        justifyContent:'center'
    },
    name:{
        fontSize: 20,
        fontWeight: 'bold',
        color:'#0e52b2'
    },
    cidade:{
        fontSize:15,
        fontWeight:'bold',
        color:'#0e52b2',
        marginLeft: 15,
    },
    assunto:{
        fontSize:17,
        fontWeight:'bold',
        textAlign:'justify',
        marginBottom:3,
        color:'#0e52b2',
    },
    description:{
        fontSize:16,
        width: '100%',
        padding: 10,
        flexShrink: 1
    },
    button:{
        backgroundColor:'#38B6FF',
        borderRadius:25,
        padding: 15,
    },
    text:{
        fontSize: 18,
        color:'#fff',
        fontWeight:'bold',
        letterSpacing:2,
    },
    status:{
        color:'#38B6FF',
        fontWeight:'bold',
        fontSize:18,
        textDecorationLine:'underline',
        textTransform:'uppercase',
        marginBottom:5
    },
    boxImages:{
        padding:5,
        flexDirection:'row',
    },
    img:{
        width:70,
        height:70,
        margin:10,
    },
    fotoPerfil: {
        width:50,
        height:50,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: '#0e52B2'
    },
});