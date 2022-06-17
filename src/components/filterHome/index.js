import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';

export default function filterHome({navigation}) {
 return (
   <View style={styles.container}>
       <TouchableOpacity style={styles.filter} >
           <Text style={styles.text}>MINHAS PUBLICAÇÕES</Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.filter}>
           <Text style={styles.text}>INSTITUIÇÕES</Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.filter}>
           <Text style={styles.text}>FILTRO</Text>
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
        padding: 8,
        backgroundColor:"#38B6FF",
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