import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';

export default function FriendsMessage({ userImg, name, messageTime, messageText }) {
    function filterDesc(desc) {
        if (desc.length < 50) {
            return desc;
        }
        return `${desc.substring(0, 45)}...`;
    }
    console.log("sla")
    return (
        <TouchableOpacity style={styles.containerFlatList} >
            <Image style={styles.img} source={{ uri: userImg }} />

            <View style={styles.descricao}>
                <View style={styles.box}>
                    <Text style={styles.userName}>{name}</Text>
                    <Text style={styles.dataHora}>{messageTime}</Text>
                </View>

                <Text style={styles.text}>{filterDesc(messageText)}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    containerFlatList: {
        backgroundColor: '#e8eaea',
        borderRadius: 8,
        height: 90,
        width: '90%',
        padding: 5,
        marginVertical: 5,
        marginHorizontal: 20,
        alignItems: 'center',
        flexDirection: 'row',
    },
    img: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 5,
    },
    descricao: {
        width: '70%'
    },
    box: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    userName: {
        fontSize: 20,
        color: '#0c4a86',
    },
    dataHora: {
        fontSize: 13,
        fontWeight: '300',
        textAlign: 'right',
    },
    text: {
        fontSize: 15,
        textAlign: 'left',
        justifyContent: 'center',
        // width:'70%',
    },
});