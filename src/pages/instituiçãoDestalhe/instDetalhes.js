import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Backbutton from '../../components/Backbutton/index';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

export default function InstituiçãoDestalhe({navigation}) {
 return (
   <View style={styles.container}>
        <Backbutton onClick={() => navigation.goBack()}/>
        <ScrollView contentContainerStyle={{alignItems:'center',width:'100%'}}>
            <View style={styles.containerInst}>
                <Text style={styles.titulo}>Instituição paulo gustavo </Text>

                <Image
                    style={styles.img}
                    source={require('../../assets/carrosel-img1.jpg')}
                />

                <View style={styles.descricao}>
                    <Text style={styles.nomeInfo}>Endereço:</Text>
                    <Text style={styles.info}>rua da sorte, 482 - cidade tiradentes sp  (09757-785)</Text>
                </View>
                <View style={styles.descricao}>
                    <Text style={styles.nomeInfo}>Horário de atendimento:</Text>
                    <Text style={styles.info}>sex á sab das 9h ás 18h</Text>
                </View>
                <View style={styles.descricao}>
                    <Text style={styles.nomeInfo}>Telefone:</Text>
                    <Text style={styles.info}>(55) 9999-9999</Text>
                </View>
                <View style={styles.descricao}>
                    <Text style={styles.nomeInfo}>Email:</Text>
                    <Text style={styles.info}>instpaulogustavo@gmail.com </Text>
                </View>

                <Text style={styles.texto}>“Cada pequeno esforço voluntário, quando é feito com amor, transforma qualquer coisa, até mesmo a mais difícil.”</Text>


                <View style={styles.containerFuncao}>

                    <View style={styles.funcoesGrid}>
                        <View style={styles.btn}>
                            <View style={styles.containerIcon}>
                                <FontAwesome name="shower" size={40} color="#fff" />
                            </View>
                            <Text style={styles.textFuncoes}>Banho</Text>
                        </View>
                    </View>
                    <View style={styles.funcoesGrid}>
                        <View style={styles.btn}>
                            <View style={styles.containerIcon}>
                                <FontAwesome name="heart" size={40} color="#fff" />
                            </View>
                            <Text style={styles.textFuncoes}>Seja voluntário</Text>
                        </View>
                    </View>
                    <View style={styles.funcoesGrid}>
                        <View style={styles.btn}>
                            <View style={styles.containerIcon}>
                                <MaterialCommunityIcons name="silverware-fork-knife" size={40} color="#fff" />
                            </View>
                            <Text style={styles.textFuncoes}>alimentação</Text>
                        </View>
                    </View>
                    
                    
                </View>
                

            </View>
        </ScrollView>
        
   </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        alignItems:'center',
    },
    containerInst:{
        alignItems:'center',
        backgroundColor:'#e8eaea',
        width:'90%',
        height:'auto',
        borderRadius:8,
        marginVertical:15,
    },
    titulo:{
        // color:'#0a52B2',
        textAlign:'center',
        color:'#38B6FF',
        fontSize:25,
        fontWeight:'bold',
        textTransform:'uppercase',
        marginTop:10
    },
    img:{
        width:'90%',
        height:200,
        marginVertical:15
    },
    descricao:{
        flexDirection:'row',
        width:'90%',
        marginVertical:2
    },
    nomeInfo:{
        marginRight:3,
        color:'#38B6FF',
        textTransform:'uppercase',
        fontWeight:'bold',
    },
    info:{
        fontSize:15,
        color:'#0c4a86',
        textTransform:'uppercase',
    },
    texto:{
        width:'90%',
        fontStyle:'italic',
        textAlign:'center',
        marginVertical:30,
    },
    containerIcon:{
        width: 75,
        height: 75,
        alignItems: 'center',
        justifyContent:'center',
        borderRadius: 100,
        backgroundColor: '#0e52B2',
        padding:5
    },
    textFuncoes:{
        fontSize: 11,
        color:'#0c4a86',
        fontWeight: '700',
        letterSpacing: -0.8,
        textAlign: 'center',
        textTransform:'uppercase',
    },
    containerFuncao:{
        width:'90%',
        marginVertical:10,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    funcoesGrid:{
        flexDirection: 'column',
        alignContent:'space-between',
        textAlign: 'center',
        width: '23%',
    },
    btn:{
        alignItems:'center'
    }

})