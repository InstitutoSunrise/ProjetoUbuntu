import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function backbutton({onClick}) {
 return (
   <View style={styles.container}>
        <TouchableOpacity 
        style={styles.btn} 
        onPress={onClick}>
            <Ionicons 
                name="md-arrow-undo-sharp" 
                size={25} 
                color="#0e52b2"
                />
            <Text style={styles.texto}>VOLTAR</Text>
        </TouchableOpacity>
   </View>
  );
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        top:10,
        left:0,
        paddingVertical:20,
        paddingHorizontal: 0,
    },
    btn:{
        flexDirection:'row',
        alignItems:'center',
    },
    texto:{
        fontSize:18,
        fontWeight:'bold',
        color:'#0e52b2',
        marginLeft: 10,
        letterSpacing:2
    },
});