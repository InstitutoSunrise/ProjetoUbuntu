import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';

export default function filterHome() {
 return (
   <View style={styles.container}>
       <TouchableOpacity style={styles.filter}>
           <Text style={styles.text}>Minhas publicações</Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.filter}>
           <Text style={styles.text}>Instituições</Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.filter}>
           <Text style={styles.text}>Filtro</Text>
       </TouchableOpacity>
   </View>
  );
}

const styles  = StyleSheet.create({
    container:{
        width:'100%',
        padding:15,
        flexDirection:'row',
        justifyContent:'center',
        justifyContent:'space-between'
    },
    filter:{
        padding: 6,
        backgroundColor:"#00c4cc",
        width:'30%',
        borderRadius:25,
        justifyContent:'center'
        
    },
    text:{
        textAlign:'center',
        fontSize:12,
        fontWeight:'bold',
        color:'#fff'
    },
});