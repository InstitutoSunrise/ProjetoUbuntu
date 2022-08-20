import React, {useState} from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert} from 'react-native';

import Backbutton from '../../components/Backbutton';

import { fetchSignInMethodsForEmail, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebase from '../../config/configFirebase';



export default function Login({navigation}) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorLogin, seterrorLogin] = useState("");

    const Login = () => {

        if(email === '' || password === ''){
            alert('Atenção!!! Digite email e senha.')
            // Alert.alert(
            //     "Atenção",
            //     "Digite email e senha",
            // );
        }else{
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
                switch (errorCode){
                    case 'auth/user-not-found':
                        alert('Usuário não cadastrado.');
                    break;
                    case 'auth/invalid-email':
                        alert('Email inválido.');
                    break;
                    case 'auth/wrong-password':
                        alert('Senha inválida.');
                    break;
                    case 'auth/user-disabled':
                        alert('Usuário deasbilitado.');
                    break;
                }
                
            });
        }
    }
    const esqueceuSenha = () => {
        if(email === ''){
            alert('Digite seu email')
        } else {
            const auth = getAuth();
            fetchSignInMethodsForEmail(auth, email)
            .then((result) => {
                console.log(result);
                if(result.length == 0) {
                    alert('Email não cadastrado')
                } else {
                    navigation.navigate('RecuperarSenha', {userEmail: email})
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode)
                console.log(errorMessage)
                switch (errorCode){
                    case 'auth/invalid-email':
                        alert('Digite seu email');
                    break;
                }
            })
            
        }
    }

 return (
   <View style={styles.container}>
    <Backbutton onClick={() => navigation.goBack()}/>
        <Text style={styles.titulo}>LOGIN</Text>

        <TextInput 
        style={styles.input} 
        placeholder='ENTRE COM O SEU EMAIL'
        type="text"
        onChangeText={(text) => setEmail(text)}
        value={email}
        />

        <TextInput
        style={styles.input}
        placeholder='ENTRE COM A SUA SENHA'
        secureTextEntry={true}
        type='text'
        onChangeText={(text) => setPassword(text)}
        value={password}
        />

        {errorLogin === true
        ?
            <View style={styles.containerAlert}>
                <Text style={styles.textAlert}>Digite email e senha</Text>
            </View>
        :
            <View/>
        }
        
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

        <Text style={styles.texto}>AINDA NÃO CRIOU A SUA CONTA? 
        <TouchableOpacity 
        style={{alignItems:'center',justifyContent:'center'}} 
        onPress={() => navigation.navigate('EscolherTipoCadastro')}>
        
            <Text style={styles.span}> CLIQUE AQUI</Text>
        
        
        </TouchableOpacity> PARA SE CADASTRAR</Text>
   </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems:'center',
        backgroundColor:'#fff',
    },
    titulo:{
        fontSize:50,
        fontWeight:'bold',
        color:'#38B6FF',
        marginTop: 30,
    },
    input:{
        width:'80%',
        marginTop:15,
        backgroundColor:'#e8eaea',
        paddingVertical: 16,
        paddingHorizontal: 25,
        borderRadius:30,
        fontSize:14,
    },
    botao:{
        marginTop:'30%',
        width:200,
        backgroundColor:'rgb(14, 82, 178)',
        padding:12,
        borderRadius:30,
    },
    textoBotao:{
        textAlign:'center',
        fontSize:25,
        fontWeight:'800',
        color:'#fff',
        letterSpacing:2
    },
    texto:{
        fontSize:12,
        textAlign:'center',
        marginTop:8
    },
    esqueceu:{
        alignSelf: 'flex-end',
        marginTop: 8,
        marginRight: 60
    },
    textoEsqueceu:{
        textAlign: 'center',
        fontSize: 14,
        color: "#0c4a86",
        textDecorationLine: "underline",


    },
    span:{
        color:'rgb(14, 82, 178)',
        marginTop: 5,
        marginBottom: -5,
        fontWeight:'bold',
        textAlign: 'right',
    },
    textAlert:{
        color:'red',
        marginTop:5
    }
});
