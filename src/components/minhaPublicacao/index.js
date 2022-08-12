import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default function MinhaPublicacao({dataHora, descricao}) {
 return (
    <View style={styles.container}>
        <View style={styles.containerPub}>       
            <Text style={styles.dataHora}>{dataHora}</Text>
            <Text style={styles.descricao}>{descricao}</Text>


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
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        marginLeft: 20,
        alignItems: 'center',
        padding: 15,
        marginTop: 25
    },
    botoes:{
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#0e52b2',
        paddingVertical: 5,
        borderRadius: 60,
        width: '35%',
        height: 40,
        margin: 10,
    },
    botoesText:{
        fontWeight:'bold',
        color: 'white',
        fontSize: 16,
        padding: 5
    },
})