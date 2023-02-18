import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text, Image } from 'react-native';

export default function Carregamento() {
    return (
        <View style={[StyleSheet.absoluteFillObject, styles.container]}>
            <Image style={styles.imgFigu} source={require('../../assets/aplicativo ubuntu.png')}/>
            <View style={styles.viewIndicator}>
                <ActivityIndicator color='#fff' size='large' />
                <Text style={styles.text}>Publicando...</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        zIndex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
    },
    viewIndicator: {
        width: '100%',
        height: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0e52B2',
        zIndex: 2
    },
    text: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
        marginTop: 10,
        textTransform: 'uppercase',
    },
    imgFigu:{
        width:'100%',
        height:150,
        marginBottom:-100
    }
})