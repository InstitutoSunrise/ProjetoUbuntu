import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Backbutton from '../../components/Backbutton/index';
import { Ionicons, Foundation, MaterialIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';


export default function InstituiçãoDestalhe({ navigation, route }) {
    const [alimento, setAlimento] = useState(route.params.alimento);
    const [voluntario, setVoluntario] = useState(route.params.voluntario);
    const [banho, setBanho] = useState(route.params.banho);
    
    console.log(banho);

    return (
        <View style={styles.container}>
            <Backbutton onClick={() => navigation.goBack()} />
            <ScrollView contentContainerStyle={{ alignItems: 'center', width: '100%' }}>
                <View style={styles.containerInst}>
                    <Text style={styles.titulo}>{route.params.nomeInst}</Text>

                    <Image
                        style={styles.img}
                        source={{ uri: route.params.img }}
                    />

                    <Text style={styles.textDescricao}>{route.params.descricao}</Text>

                    <View style={styles.infomaçoes}>

                        <View style={styles.viewInfo}>
                            <Ionicons name="location" size={24} color="#0e52B2" style={{ marginRight: 5 }} />
                            <Text style={styles.textInfo}>{route.params.endereco}, {route.params.numero}</Text>
                        </View>
                        <View style={styles.viewInfo}>
                            <Ionicons name="time-outline" size={24} color="#0e52B2" style={{ marginRight: 5 }} />
                            <Text style={styles.textInfo}>{route.params.horario}</Text>
                        </View>

                        <View style={styles.ViewContato}>
                            <View style={styles.viewInfo}>
                                <Foundation name="telephone" size={24} color="#0e52B2" style={{ marginRight: 7 }} />
                                <Text style={styles.textInfo}>{route.params.telefone}</Text>
                            </View>

                            <View style={styles.viewInfo}>
                                <MaterialIcons name="email" size={24} color="#0e52B2" style={{ marginRight: 7 }} />
                                <Text style={styles.textInfo}>{route.params.email}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.containerFuncao}>

                        {banho === true ? <View style={styles.funcoesGrid}>
                            <View style={styles.btn}>
                                <View style={styles.containerIcon}>
                                    <FontAwesome name="shower" size={40} color="#fff" />
                                </View>
                                <Text style={styles.textFuncoes}>Banho</Text>
                            </View>
                        </View> : undefined}
                        {voluntario == true ? <View style={styles.funcoesGrid}>
                            <View style={styles.btn}>
                                <View style={styles.containerIcon}>
                                    <FontAwesome name="heart" size={40} color="#fff" />
                                </View>
                                <Text style={styles.textFuncoes}>Seja voluntário</Text>
                            </View>
                        </View> : undefined}
                        {alimento == true ? <View style={styles.funcoesGrid}>
                            <View style={styles.btn}>
                                <View style={styles.containerIcon}>
                                    <MaterialCommunityIcons name="silverware-fork-knife" size={40} color="#fff" />
                                </View>
                                <Text style={styles.textFuncoes}>alimentação</Text>
                            </View>
                        </View> : undefined}


                    </View>


                </View>
            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems:'center',
    },
    containerInst: {
        alignItems: 'center',
        backgroundColor: '#e8eaea',
        width: '90%',
        height: 'auto',
        borderRadius: 8,
        marginVertical: 15,
    },
    titulo: {
        textAlign: 'center',
        color: '#38B6FF',
        fontSize: 25,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginTop: 10
    },
    img: {
        width: '90%',
        height: 250,
        marginVertical: 15
    },
    textDescricao: {
        width: '80%',
        textAlign: 'center',
        color: "#0e52B2",
        fontSize: 18,
        marginVertical: 5
    },
    infomaçoes: {
        width: '80%',
        marginVertical: 15
    },
    viewInfo: {
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 5,
    },
    textInfo: {
        textTransform: 'uppercase',
        fontSize: 14,
    },
    ViewContato: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    containerIcon: {
        width: 75,
        height: 75,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        backgroundColor: '#0e52B2',
        padding: 5
    },
    textFuncoes: {
        fontSize: 11,
        color: '#0c4a86',
        fontWeight: '700',
        letterSpacing: -0.8,
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    containerFuncao: {
        width: '90%',
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    funcoesGrid: {
        flexDirection: 'column',
        alignContent: 'space-between',
        textAlign: 'center',
        width: '23%',
        marginHorizontal: 15,
    },
    btn: {
        alignItems: 'center'
    }

})