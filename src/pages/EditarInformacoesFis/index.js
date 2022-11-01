import React, { useState, useEffect } from 'react';

import { Image, Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import MaskInput from 'react-native-mask-input';
import Backbutton from '../../components/Backbutton';
import telefone_validation from '../../config/inputsValidations/telNumberValidation';


export default function EditarInformacoesFis({ navigation }) {


    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmeSenha, setConfirmeSenha] = useState('');

    const [errorTel, setErrorTel] = useState();

    async function editarInformacoes() {

    }

    return (
        <View style={styles.container}>
            <Backbutton onClick={() => navigation.goBack()} />

            <Text style={styles.titulo}>EDITAR INFORMAÇÕES</Text>

            <View style={styles.inputsView}>

                <MaskInput
                    placeholder="TELEFONE"
                    keyboardType={'number-pad'}
                    style={errorTel ? styles.InputError : styles.TextInput}
                    value={telefone}
                    onChangeText={(masked, unmasked) => {
                        setTelefone(masked);
                    }}
                    onBlur={() => telefone_validation(telefone) ? setErrorTel(false) : setErrorTel(true)}
                    mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                />

                <TextInput
                    placeholder="E-MAIL"
                    style={styles.TextInput}
                    value={email}
                    onChangeText={text => setEmail(text)}
                />

                <TextInput
                    placeholder="DIGITE SUA SENHA"
                    style={styles.TextInput}
                    value={senha}
                    onChangeText={text => setSenha(text)} />
                <TextInput
                    placeholder="CONFIRME SUA SENHA"
                    style={styles.TextInput}
                    value={confirmeSenha}
                    onChangeText={text => setConfirmeSenha(text)} />
            </View>

            <TouchableOpacity style={styles.botao}>
                <Text style={styles.textoBotao}>SALVAR</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        alignContent: 'space-between'
    },
    titulo: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#38B6FF',
        marginTop: 30,
        textAlign: 'center',
        alignSelf: 'center'
      },
    inputsView: {
        width: '100%',
        alignItems: 'center',
        marginVertical: 30
    },
    containerInput: {
        justifyContent: "space-between",
        flexDirection: 'row',
        width: '80%',
        marginTop: 10,
    },
    TextInput: {
        width: '80%',
        marginTop: 10,
        backgroundColor: '#e8eaea',
        paddingVertical: 16,
        paddingHorizontal: 25,
        borderRadius: 30,
        fontSize: 14,
    },
    botao: {
        marginVertical: 30,
        width: '45%',
        backgroundColor: '#0e52b2',
        padding: 12,
        borderRadius: 30,
    },
    textoBotao: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: '800',
        color: '#fff',
        letterSpacing: 2
    },
    InputError: {
        backgroundColor: '#e8eaea',
        borderColor: '#ff4040',
        borderWidth: 1,
        color: '#ff4040',
        paddingVertical: 16,
        paddingHorizontal: 25,
        borderRadius: 30,
        fontSize: 14,
        width: '80%'
    },
})