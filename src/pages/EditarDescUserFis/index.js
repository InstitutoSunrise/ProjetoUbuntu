import React, {useState} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import Backbutton from '../../components/Backbutton';


export default function EditarDescUserFis({navigation}) {
    const [text, onChangeText] = React.useState("");
 return (
   <View style={styles.container}>
        <Backbutton onClick={() => navigation.goBack()} />

        <View style={styles.editContainer}>
        <TextInput
            style={styles.textEdit}
            onChangeText={onChangeText}
            value={text}
            multiline={true}
            numberOfLines={15}
            maxLength={150}
            placeholder="Digite a nova descrição"
        />
        </View>

        <TouchableOpacity style={styles.btnSalvar}>
            <Text style={styles.salvar}>SALVAR</Text>
        </TouchableOpacity>
   </View>
  );
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    editContainer:{
        width: '85%',
        padding: 10,
        backgroundColor: '#ebeff1',
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 40
    },
    textEdit:{
        fontSize: 20,
        color: '#545454',
        padding: 5
    },
    btnSalvar:{
        width: '55%',
        padding: 15,
        backgroundColor: '#0e52B2',
        borderRadius: 60,
        marginTop: 45,
        marginBottom:20,
    },
    salvar:{
        fontSize: 26,
        fontWeight: '800',
        textAlign: 'center',
        color: '#fff'
    },
})