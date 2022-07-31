import React from 'react';

import { Image, Text, View, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

import Backbutton from '../../components/Backbutton';

export default function MeuPerfil({navigation}) {
 return (
   <View style={styles.container}>

    <StatusBar barStyle="dark-content" backgroundColor="#0e52b2"/>
    <ScrollView contentContainerStyle={{alignItems:'center',width:'100%'}}>

            <Backbutton onClick={() => navigation.goBack()}/>

    <Text style={styles.titulo}>MEU PERFIL</Text>

    <View style={styles.imgPerfilContainer}>
        <TouchableOpacity style={styles.imgPerfilContainer}>
            <Image
                style={styles.fotoPerfil}
                source={{
                uri: 'https://cdn.icon-icons.com/icons2/2506/PNG/512/user_icon_150670.png',
                }}
            />
        </TouchableOpacity>
    </View>

    <Text style={styles.nome}>Maria Aparecida</Text>
    <Text style={styles.endereco}>Cidade Tiradentes, SP</Text>
   
    <View style={styles.descricaoContainer}>
        <Text style={styles.descricao}>Meu nome é Maria, tenho 45 anos. Tinha algumas coisas guardadas em casa para doar, então entrei no Ubuntu.</Text>
    </View>

    <View style={styles.editPerfilContainer}>
        <TouchableOpacity style={styles.editPerfilContainer}>
            <Image
                style={styles.editPerfilIcon}
                source={{
                uri: 'https://icon-library.com/images/edit-icon-png/edit-icon-png-0.jpg',
                }}
            />
            <Text style={styles.editPerfil}> EDITAR PERFIL</Text>
        </TouchableOpacity>
    </View>

    <View style={styles.funcoesContainer}>
            <View style={styles.funcoesGrid}>
                <TouchableOpacity style={styles.btn}>
                    <View style={styles.funcoesIconContainer}>
                        <Ionicons name="trash" size={40} color="#fff" />
                    </View>
                    <Text style={styles.funcoesTitle}>EXCLUIR CONTA</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.funcoesGrid}>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('minhasPubs')}>
                    <View style={styles.funcoesIconContainer}>
                        <Ionicons name="create" size={40} color="#fff" />
                    </View>
                    <Text style={styles.funcoesTitle}>MINHAS PUBLICAÇÕES</Text>
                    </TouchableOpacity>
            </View>

            <View style={styles.funcoesGrid}>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Configurações')}>
                    <View style={styles.funcoesIconContainer}>
                        <Ionicons name="settings" size={40} color="#fff" />
                    </View>
                    <Text style={styles.funcoesTitle}>CONFIGURAÇÕES</Text>
                </TouchableOpacity>
            </View>
            
            <View style={styles.funcoesGrid}>
                <TouchableOpacity style={styles.btn}>
                    <View style={styles.funcoesIconContainer}>
                        <Ionicons name="ios-star" size={40} color="#fff" />
                    </View>
                    <Text style={styles.funcoesTitle}>NOS AVALIE</Text>
                </TouchableOpacity>
            </View>
        </View>
    </ScrollView>
   </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        backgroundColor:'#fff'
    },
    titulo:{
        width: '90%',
        fontSize: 35,
        color: '#38b6ff',
        textAlign: 'center',
        fontWeight: '700',
        marginBottom: 20,
        marginTop: -15
    },
    imgPerfilContainer:{
        width: 125,
        height: 125,
        alignItems: 'center',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 100,
        borderColor: '#0e52B2',
        marginBottom: 10
    },
    fotoPerfil:{
        height: '90%',
        width: '90%',
    },
    nome:{
        fontSize: 25,
        color: '#38b6ff',
        fontWeight: '700',
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    endereco:{
        fontSize: 20,
        color: '#0e52B2',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    descricaoContainer:{
        width: '85%',
        paddingHorizontal: 15,
        paddingVertical: 45,
        textAlignVertical:'center',
        backgroundColor: '#ebeff1',
        marginTop: 65,
        borderRadius: 20,
    },
    descricao:{
        width: '90%',
        color: '#0e52B2',
        fontSize: 14,
    },
    editPerfilContainer:{
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 30,
        alignSelf:'flex-end'
        },
    editPerfilIcon:{
        width: 17,
        height: 17,
    },
    editPerfil:{
        fontSize: 13,
        color:'#0e52B2',
        fontWeight: '600',
        marginRight: 10,
    },
    funcoesContainer:{
        width: '100%',
        flexDirection: 'row',
        marginTop: 65,
        justifyContent:'space-between'
    },
    funcoesGrid:{
        flexDirection: 'column',
        alignContent:'space-between',
        textAlign: 'center',
        width: '23%',
    },
    funcoesIconContainer:{
        width: 75,
        height: 75,
        alignItems: 'center',
        justifyContent:'center',
        borderRadius: 100,
        backgroundColor: '#0e52B2',
        padding:5
    },
    funcoesTitle:{
        fontSize: 11,
        color:'#0c4a86',
        fontWeight: '700',
        letterSpacing: -0.8,
        textAlign: 'center',
        textTransform:'uppercase',
    },
    btn:{
        alignItems:'center'
    }
})