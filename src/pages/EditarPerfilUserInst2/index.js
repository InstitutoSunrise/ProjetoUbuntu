import React, { useState, useEffect } from 'react';

import { Image, Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import MaskInput from 'react-native-mask-input';
import Backbutton from '../../components/Backbutton';


export default function EditarPerfilUserInst2({ navigation }) {

    const [cep, setCep] = useState('');
    const [endereço, setEndereço] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [nolocal, setNolocal] = useState('');
    const [horario, setHorario] = useState('');
    const [voluntario, setVoluntario] = useState('');
    const [descricao, setDescricao] = useState('');

return (
    <View style={styles.container}>
        <Backbutton onClick={() => navigation.goBack()}/>

        <View style={styles.inputsView}>
            <MaskInput
            placeholder="DIGITE SEU CEP" 
            keyboardType={'number-pad'}
            style={styles.TextInput} 
            value={cep}
            onChangeText={(masked, unmasked) => {
                setCep(masked);
            
            }}
            mask={[/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
            />

            <TextInput 
            placeholder="ENDEREÇO" 
            style={styles.TextInput}
            value={endereço} 
            onChangeText={text=>setEndereço(text)} />

            <TextInput 
            placeholder="NUMERO" 
            style={styles.TextInput} 
            value={numero}
            onChangeText={text=>setNumero(text)} 
            keyboardType={'number-pad'} />

            <TextInput 
            placeholder="COMPLEMENTO" 
            style={styles.TextInput} 
            value={complemento}
            onChangeText={text=>setComplemento(text)} />

            <TextInput 
            placeholder="TEM LOCAL PARA BANHO/REFEIÇÃO" 
            style={styles.TextInput} 
            value={nolocal}
            onChangeText={text=>setNolocal(text)} />

            <TextInput 
            placeholder="HORARIO DE FUNCIONAMENTO" 
            style={styles.TextInput} 
            value={horario}
            onChangeText={text=>setHorario(text)} />

            <TextInput 
            placeholder="ACEITAM VOLUNTÁRIOS" 
            style={styles.TextInput} 
            value={voluntario}
            onChangeText={text=>setVoluntario(text)} />

            <TextInput 
            placeholder="DESCRIÇÃO" 
            style={styles.TextInputDesc} 
            value={descricao}
            multiline={true}
            numberOfLines={15}
            maxLength={150}
            onChangeText={text=>setDescricao(text)} />

            
            <TouchableOpacity style={styles.botao}>
                <Text style={styles.textoBotao}>SALVAR</Text>
            </TouchableOpacity>
      </View>
    </View>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'space-between',
    },
    foto:{
        width:130,
        height:130,
        borderRadius:80,
        marginTop:5,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#e8eaea',
      },
    imgPickerContainer:{
        width: '40%',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'center',
    },
    imgEditIcon:{
        alignSelf: 'flex-end',
        marginLeft: -25,
        marginBottom: 3
    },
    imagePicker:{
        width: '100%', 
        height: '100%',
        borderRadius: 80,
    },
    inputsView:{
        width: '100%',
        alignItems: 'center',
    },
    containerInput:{
        justifyContent: "space-between",
        flexDirection: 'row',
        width: '80%',
        marginTop:10,
    },
    Input:{
        backgroundColor:'#e8eaea',
        paddingVertical: 16,
        paddingHorizontal: 25,
        borderRadius:30,
        fontSize:14,
        width:'49%'
    },
    TextInput: {
        width:'80%',
        marginTop:10,
        backgroundColor:'#e8eaea',
        paddingVertical: 16,
        paddingHorizontal: 25,
        borderRadius:30,
        fontSize:14,
    },
    TextInputDesc:{
        width: '80%',
        height: '15%',
        marginTop: 10,
        backgroundColor:'#e8eaea',
        paddingHorizontal: 25,
        borderRadius:30,
        fontSize:14,
    },
    botao:{
        marginVertical:30,
        width: '45%',
        backgroundColor:'#0e52b2',
        padding: 12,
        borderRadius: 30,
    },
    textoBotao:{
        textAlign:'center',
        fontSize:25,
        fontWeight:'800',
        color:'#fff',
        letterSpacing:2
    },
})