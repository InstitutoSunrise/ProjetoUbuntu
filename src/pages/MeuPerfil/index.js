import React from 'react';

import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Backbutton from '../../components/backbutton/backbutton';

export default function MeuPerfil({navigation}) {
 return (
   <View style={styles.container}>

    <View style={{marginTop: 10, alignSelf: 'flex-start'}}>
        <Backbutton onClick={() => navigation.goBack()}/>
    </View>

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
            <TouchableOpacity>
                <View style={styles.funcoesIconContainer}>
                    <Image
                    style={styles.funcoesIcon}
                    source={{
                    uri: 'https://cdn-icons-png.flaticon.com/512/1345/1345823.png',
                    }}
                    />
                </View>
                <Text style={styles.funcoesTitle}>EXCLUIR CONTA</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.funcoesGrid}>
            <TouchableOpacity>
                <View style={styles.funcoesIconContainer}>
                    <Image
                        style={styles.funcoesIcon}
                        source={{
                        uri: 'https://cdn.icon-icons.com/icons2/2768/PNG/512/star_icon_176624.png',
                        }}
                    />
                </View>
                <Text style={styles.funcoesTitle}>MINHAS PUBLICAÇÕES</Text>
                </TouchableOpacity>
        </View>

        <View style={styles.funcoesGrid}>
            <TouchableOpacity>
                <View style={styles.funcoesIconContainer}>
                    <Image
                        style={styles.funcoesIcon}
                        source={{
                        uri: 'https://icon-library.com/images/settings-icon/settings-icon-1.jpg',
                        }}
                    />
                </View>
                <Text style={styles.funcoesTitle}>CONFIGURAÇÕES</Text>
            </TouchableOpacity>
        </View>
        
        <View style={styles.funcoesGrid}>
            <TouchableOpacity>
                <View style={styles.funcoesIconContainer}>
                    <Image
                        style={styles.funcoesIcon}
                        source={{
                        uri: 'https://cdn-icons-png.flaticon.com/512/4087/4087743.png',
                        }}
                    />
                </View>
                <Text style={styles.funcoesTitle}>NOS AVALIE</Text>
            </TouchableOpacity>
        </View>
    </View>
   </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        width: '100%',
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
    },
    funcoesGrid:{
        flexDirection: 'column',
        alignContent:'space-between',
        textAlign: 'center',
        width: '23%',
        marginLeft: 5,
    },
    funcoesIconContainer:{
        width: 75,
        height: 75,
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: '#0e52B2',
    },
    funcoesIcon:{
        width: '60%',
        height: '60%',
        marginTop: 15
    },
    funcoesTitle:{
        width: '90%',
        fontSize: 11,
        color:'#0e52B2',
        fontWeight: '700',
        letterSpacing: -0.8,
        textAlign: 'center',
    }
})