import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';


export default function post() {
 return (
   <View style={styles.card}>
       <View style={styles.userDatail}>
            <FontAwesome 
                name="user-circle-o" 
                size={45} 
                color="#0e52b2"
            />
            <View style={styles.userText}>
                <Text style={styles.name}>Danillo Main</Text>
                <Text style={styles.cidade}>Itaquera, SP</Text>
            </View>
       </View>
       <Text style={styles.status}>recebendo</Text>
       <Text style={styles.assunto}>Estou recebendo roupas e alimentos</Text>
       <Text style={styles.description}>
                Estou precisando de cobertores quentes para o frio, quem estiver doando pode me chamar.
        </Text>
        <View style={styles.boxImages}>
            <Image
                style={styles.img}
                source={require('../../assets/carrosel-img1.jpg')}
            />
            <Image
                style={styles.img}
                source={require('../../assets/carrosel-img1.jpg')}
            />
            <Image
                style={styles.img}
                source={require('../../assets/carrosel-img1.jpg')}
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
        width:'90%',
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
        marginLeft: -30,
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
        textAlign:'justify',
    },
    button:{
        backgroundColor:'#38B6FF',
        borderRadius:25,
        padding: 15,
        // marginTop:15,
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
        margin:10
    }
});