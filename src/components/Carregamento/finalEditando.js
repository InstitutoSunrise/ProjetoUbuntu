import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text, TouchableOpacity, Image } from 'react-native';

export default function FinalEditando({ onClick }) {
    return (
        <View style={[StyleSheet.absoluteFillObject, styles.container]}>
            <Image style={styles.imgFigu} source={require('../../assets/aplicativo ubuntu.png')} />
            <View style={styles.viewIndicator}>
                {/* <ActivityIndicator color='#fff' size='large' /> */}
                <Image style={styles.img} source={require('../../assets/marca-de-verificacao.png')} />
                <Text style={styles.text}>Atualizado com sucesso!</Text>
                <TouchableOpacity onPress={onClick}>
                    <Text style={styles.btnText}>OK</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        zIndex: 2,
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
    },
    viewIndicator: {
        width: '100%',
        height: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0e52B2',
        zIndex: 3
    },
    text: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
        marginTop: 10,
        textTransform: 'uppercase',
    },
    btnText: {
        fontSize: 15,
        fontWeight: '700',
        textDecorationLine: "underline",
        marginTop: 8,
        color: '#38B6FF',
    },
    img: {
        width: 100,
        height: 100
    },
    imgFigu: {
        width: '100%',
        height: 150,
        marginBottom: -100
    }
})