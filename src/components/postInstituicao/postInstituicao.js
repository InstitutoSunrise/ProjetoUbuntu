import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function postInstituicao({onClick}) {
 return (
   <TouchableOpacity style={styles.card} onPress={onClick}>
        <Ionicons style={styles.icon} name="bookmark" size={50} color="rgb(14, 82, 178)"/>

        <View style={styles.box}>
            <Text style={styles.nomeInst}>Instituição paulo gustavo</Text>
            <Image 
            style={styles.img}
            source={require('../../assets/maos.jpg')}/>
        </View>
        <Text style={styles.endereco}>rua da sorte, 482 - cidade tiradentes sp  (09757-785)</Text>
   </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    card:{
        width:'90%',
        height:180,
        backgroundColor:'#e8eaea',
        borderRadius:8,
        marginVertical:10,
        paddingHorizontal:5,
        // alignItems:'center'
    },
    icon:{
        alignItems:'flex-start'
    },
    box:{
        width:'100%',
        justifyContent:'center',
        flexDirection:'row'
    },
    nomeInst:{
        fontSize:25,
        fontWeight:'bold',
        textAlign:'center',
        color:'#38B6FF',
        marginRight:8,
        textTransform:'uppercase'
    },
    img:{
        width:100,
        height:100,
        borderRadius:50,
        marginTop:-30
    },
    endereco:{
        marginTop:15,
        color:'rgb(14, 82, 178)',
        textAlign:'center',
        fontSize:13,
        textTransform:'uppercase'
    },
})