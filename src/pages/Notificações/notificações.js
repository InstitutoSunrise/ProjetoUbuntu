import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';

export default function Notificações() {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ alignItems: 'center', width: '100%' }}>

                <Text style={styles.titulo}>NOTIFICAÇÕES</Text>

                <View style={styles.box_noti}>
                    <Ionicons style={styles.icon} name="heart-circle" size={55} color="#0e52b2" />
                    <View style={styles.descricao}>
                        <Text style={styles.dataHora}>18:00</Text>
                        <Text style={styles.text}>Descubra novas instituições perto de você! Clique aqui para visualizar.</Text>
                    </View>
                </View>
                <View style={styles.box_noti}>
                    <Entypo style={styles.icon} name="chat" size={55} color="#0e52b2" />
                    <View style={styles.descricao}>
                        <Text style={styles.dataHora}>18:00</Text>
                        <Text style={styles.text}>Você recebeu uma nova mensagem. Clique aqui para visualizar.</Text>
                    </View>
                </View>
                <View style={styles.box_noti}>
                    <Entypo style={styles.icon} name="chat" size={55} color="#0e52b2" />
                    <View style={styles.descricao}>
                        <Text style={styles.dataHora}>18:00</Text>
                        <Text style={styles.text}>Você recebeu uma nova mensagem. Clique aqui para visualizar.</Text>
                    </View>
                </View>
                <View style={styles.box_noti}>
                    <Entypo name="star" size={55} color="#0e52b2" />
                    <View style={styles.descricao}>
                        <Text style={styles.dataHora}>18:00</Text>
                        <Text style={styles.text}>Descubra novas instituições perto de você! Clique aqui para visualizar.</Text>
                    </View>
                </View>
                <View style={styles.box_noti}>
                    <Entypo style={styles.icon} name="chat" size={55} color="#0e52b2" />
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
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignContent: 'center'
    },
    titulo: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#38B6FF',
        marginTop: 35,
        textTransform: 'uppercase'
    },
    box_noti: {
        backgroundColor: '#e8eaea',
        width: '90%',
        height: 85,
        borderRadius: 8,
        padding: 5,
        alignItems: 'center',
        marginVertical: 10,
        flexDirection: 'row'
    },
    text: {
        fontSize: 15,
        textAlign: 'left',
        justifyContent: 'center',
        marginLeft: 5,
        // width:'55%',
    },
    descricao: {
        width: '75%',
    },
    dataHora: {
        fontSize: 13,
        fontWeight: '300',
        textAlign: 'right',
        marginVertical: 2,
    },

})