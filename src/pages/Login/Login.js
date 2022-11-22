import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';

import Backbutton from '../../components/Backbutton';

import { fetchSignInMethodsForEmail, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebase from '../../config/configFirebase';

import { Ionicons } from '@expo/vector-icons'



export default function Login({ navigation }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [erroAlert, setErroAlert] = useState(false);
    const [msgAlert, setMsgAlert] = useState('');

    const [revealSenha, setRevealSenha] = useState(true);

    const Login = () => {
        // setErroAlert(false);
        if (email === '' || password === '') {
            // alert('Atenção!!! Digite email e senha.')
            setErroAlert(true);
            setMsgAlert('Digite o email e a senha.');
        } else {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    // ...
                    navigation.navigate('Home')
                })
                .catch((error) => {
                    // seterrorLogin(true)
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode)
                    console.log(errorMessage)
                    switch (errorCode) {
                        case 'auth/user-not-found':
                            // alert('Usuário não cadastrado.');
                            setErroAlert(true);
                            setMsgAlert('Usuário não cadastrado.');
                            break;
                        case 'auth/invalid-email':
                            // alert('Email inválido.');
                            setErroAlert(true);
                            setMsgAlert('Email inválido.');
                            break;
                        case 'auth/wrong-password':
                            // alert('Senha inválida.');
                            setErroAlert(true);
                            setMsgAlert('Senha inválida.');
                            break;
                        case 'auth/user-disabled':
                            // alert('Usuário deasbilitado.');
                            setErroAlert(true);
                            setMsgAlert('Usuário deasbilitado.');
                            break;
                    }

                });
        }
    }
    const esqueceuSenha = () => {
        if (email === '') {
            // alert('Digite seu email')
            setErroAlert(true);
            setMsgAlert('Digite seu email.');
        } else {
            const auth = getAuth();
            fetchSignInMethodsForEmail(auth, email)
                .then((result) => {
                    console.log(result);
                    if (result.length == 0) {
                        // alert('Email não cadastrado')
                        setErroAlert(true);
                        setMsgAlert('Email não cadastrado');
                    } else {
                        navigation.navigate('RecuperarSenha', { userEmail: email })
                    }
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode)
                    console.log(errorMessage)
                    switch (errorCode) {
                        case 'auth/invalid-email':
                            setErroAlert(true);
                            setMsgAlert('Email inválido.');
                            break;
                    }
                })

        }
    }

    return (
        <View style={styles.container}>
            <Backbutton onClick={() => navigation.goBack()} />
            <Text style={styles.titulo}>LOGIN</Text>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.input}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    placeholder='ENTRE COM O SEU EMAIL'
                    type="text"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                />
            </View>

            <View style={styles.inputView}>
                <View style={{ width: '95%' }}>
                    <TextInput
                        style={styles.input}
                        placeholder='ENTRE COM A SUA SENHA'
                        secureTextEntry={revealSenha}
                        type='text'
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                    />
                </View>
                <TouchableOpacity style={styles.iconView} onPress={(() => setRevealSenha(!revealSenha))}>
                    {revealSenha ? <Ionicons style={{ marginRight: 5 }} name="eye" size={25} color="grey" /> : <Ionicons style={{ marginRight: 5 }} name="eye-off" size={25} color="grey" />}
                </TouchableOpacity>
            </View>

            {erroAlert == true ?
                <Text style={styles.textAlert}>{msgAlert}</Text>
                : undefined}

            <TouchableOpacity
                style={styles.esqueceu}
                onPress={() => esqueceuSenha()}
            >
                <Text style={styles.textoEsqueceu}>ESQUECEU A SENHA?</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.botao}
                onPress={Login}
            >
                <Text style={styles.textoBotao}>ENTRAR</Text>
            </TouchableOpacity>

            <View style={styles.spanView}>
                <Text style={styles.texto}>AINDA NÃO CRIOU A SUA CONTA?
                    <TouchableOpacity
                        style={{ alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => navigation.navigate('EscolherTipoCadastro')}>
                        <Text style={styles.span}> CLIQUE AQUI</Text>
                    </TouchableOpacity> PARA SE CADASTRAR</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    titulo: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#38B6FF',
        marginTop: 85,
    },
    inputView: {
        width: '80%',
        height: 65,
        alignItems: 'center',
        backgroundColor: '#e8eaea',
        borderRadius: 30,
        marginTop: 15,
        flexDirection: 'row'
    },
    input: {
        marginLeft: 25,
        width: '70%',
        fontSize: 14,
    },
    iconView: {
        position: 'absolute',
        right: 0,
        width: '20%'
    },
    botao: {
        marginTop: '30%',
        width: 200,
        backgroundColor: 'rgb(14, 82, 178)',
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
    texto: {
        fontSize: 12,
        textAlign: 'center',
        marginTop: 8
    },
    esqueceu: {
        alignSelf: 'flex-end',
        marginTop: 8,
        marginRight: 60
    },
    textoEsqueceu: {
        textAlign: 'center',
        fontSize: 14,
        color: "#0c4a86",
        textDecorationLine: "underline",
    },
    span: {
        color: 'rgb(14, 82, 178)',
        marginTop: 5,
        marginBottom: -5,
        fontWeight: 'bold',
        textAlign: 'right',
    },
    textAlert: {
        color: 'red',
        marginTop: 5
    },
});
