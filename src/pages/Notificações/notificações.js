import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default function Notificações() {
 return (
   <View style={styles.container}>
        <ScrollView contentContainerStyle={{alignItems:'center',width:'100%'}}>

            <Text style={styles.titulo}>NOTIFICAÇÕES</Text>

            <View style={styles.box_noti}>
                <Ionicons style={styles.icon} name="heart-circle" size={70} color="rgb(14, 82, 178)" />
                <View style={styles.descricao}>
                    <Text style={styles.dataHora}>18:00</Text>
                    <Text style={styles.text}>Descubra novas instituições perto de você! Clique aqui para visualizar.</Text>
                </View>
            </View>
            <View style={styles.box_noti}>
                <Ionicons style={styles.icon} name="chatbubble-ellipses" size={70} color="rgb(14, 82, 178)" />
                <View style={styles.descricao}>
                    <Text style={styles.dataHora}>18:00</Text>
                    <Text style={styles.text}>Você recebeu uma nova mensagem. Clique aqui para visualizar.</Text>
                </View>
            </View>
            <View style={styles.box_noti}>
                <Ionicons style={styles.icon} name="chatbubble-ellipses" size={70} color="rgb(14, 82, 178)" />
                <View style={styles.descricao}>
                    <Text style={styles.dataHora}>18:00</Text>
                    <Text style={styles.text}>Você recebeu uma nova mensagem. Clique aqui para visualizar.</Text>
                </View>
            </View>
            <View style={styles.box_noti}>
                <MaterialIcons name="stars" size={70} color="rgb(10, 82, 178)" />
                <View style={styles.descricao}>
                    <Text style={styles.dataHora}>18:00</Text>
                    <Text style={styles.text}>Descubra novas instituições perto de você! Clique aqui para visualizar.</Text>
                </View>
            </View>
            <View style={styles.box_noti}>
                <Ionicons style={styles.icon} name="chatbubble-ellipses" size={70} color="rgb(14, 82, 178)" />
                <View style={styles.descricao}>
                    <Text style={styles.dataHora}>18:00</Text>
                    <Text style={styles.text}>Você recebeu uma nova mensagem. Clique aqui para visualizar.</Text>
                </View>
            </View>
        </ScrollView>
   </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#fff',
        alignContent:'center'
    },
    titulo:{
        fontSize:40,
        fontWeight:'bold',
        color:'#38B6FF',
        marginTop: 35,
        textTransform:'uppercase'
    },
    box_noti:{
        backgroundColor:'#e8eaea',
        width:'90%',
        height:70,
        borderRadius:8,
        paddingHorizontal:5,
        alignItems:'center',
        marginVertical:10,
        flexDirection:'row'
    },
    text:{
        fontSize:'15',
        textAlign:'left',
        justifyContent:'center',
        // width:'70%',
    },
    descricao:{
        width:'75%',
    },
    dataHora:{
        fontSize: 13,
        fontWeight: '300',
        textAlign:'right',
        marginVertical: 2,
    },

})