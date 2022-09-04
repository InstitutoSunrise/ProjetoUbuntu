import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

export default function MinhaPublicacao({dataHora, descricao}) {
 return (
    <View style={styles.container}>
        <View style={styles.containerPub}>
            <View style={styles.boxData}>
                <Text style={styles.dataHora}>{dataHora}</Text>
            </View>       
            <Text style={styles.descricao}>{descricao}</Text>

            <View style={styles.boxImages}>
                <Image
                    style={styles.img}
                    source={require('../../assets/carrosel-img1.jpg')}
                />
                <Image
                    style={styles.img}
                    source={require('../../assets/carrosel-img1.jpg')}
                />
                <Image
                    style={styles.img}
                    source={require('../../assets/carrosel-img1.jpg')}
                />
            </View>
            <View style={styles.btnView}>
                <TouchableOpacity style={styles.botoes}>
                    <Text style={styles.botoesText}>EDITAR</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.botoes}>
                    <Text style={styles.botoesText}>EXCLUIR</Text>
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
    },
    containerPub:{
        flex: 1,
        backgroundColor: '#e8eaea',
        width: '85%',
        height: 165,
        marginBottom: 25,
        alignContent: 'center',
        borderRadius: 10,
        padding: 10,
        alignItems:'center',
    },
    boxData:{
        width:'100%'
    },
    dataHora:{
        fontSize: 13,
        fontWeight: '300',
        textAlign:'right',
        marginVertical: 2,
    },
    descricao:{
        width: '90%',
        flexShrink: 1,
        fontSize: 15.5,
        marginLeft: 10,
        marginVertical: 5
    },
    btnView:{
        width:'100%',
        flexDirection: 'row',
        padding:5
    },
    botoes:{
        alignItems: 'center',
        justifyContent:"center",
        backgroundColor: '#0e52b2',
        paddingVertical: 10,
        borderRadius: 60,
        width: '40%',
        height: 50,
        margin: 10,
    },
    botoesText:{
        fontWeight:'bold',
        color: 'white',
        fontSize: 16,
        padding: 5
    },
    boxImages:{
        padding:5,
        flexDirection:'row',
    },
    img:{
        width:70,
        height:70,
        margin:10
    }
})