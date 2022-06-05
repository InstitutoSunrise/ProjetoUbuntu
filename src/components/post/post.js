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
                color="rgb(14, 82, 178)"
            />
            <View style={styles.userText}>
                <Text style={styles.name}>Danillo Main</Text>
                <Text style={styles.cidade}>Itaquera, SP</Text>
            </View>
       </View>
       <Text styele={styles.description}>
                Estou precisando de cobertores quentes para o frio, quem estiver doando pode me chamar.
        </Text>
        <TouchableOpacity style={styles.button}>
            ENTRAR EM CONTATO
        </TouchableOpacity>
   </View>
  );
}

const styles = StyleSheet.create({
    card:{
        backgroundColor:'lightgrey',
        width:'90%',
        height:200,
        borderRadius:8,
        padding:15,
        alignItems:'center',
        justifyContent:'space-between',
        marginVertical:10
    },
    userDatail:{
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        // marginBottom:10
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
        color:'rgb(14, 82, 178)'
    },
    cidade:{
        fontSize:15,
        fontWeight:'bold',
        color:'rgb(14, 82, 178)',
    },
    description:{
        fontSize:15,
        textAlign:'justify',
    },
    button:{
        backgroundColor:'#00c4cc',
        borderRadius:25,
        padding: 15,
        // marginTop:15,
        fontSize: 18,
        color:'#fff',
        fontWeight:'bold',
        fontStyle:'normal'
    },
});