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
       <Text style={styles.description}>
                Estou precisando de cobertores quentes para o frio, quem estiver doando pode me chamar.
        </Text>
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
        height:240,
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
});