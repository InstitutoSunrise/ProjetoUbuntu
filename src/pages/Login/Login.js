import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet} from 'react-native';
import Backbutton from '../../components/Backbutton';


export default function Login({navigation}) {
 return (
   <View style={styles.container}>
    <Backbutton onClick={() => navigation.goBack()}/>
        <Text style={styles.titulo}>LOGIN</Text>
        <TextInput style={styles.input} placeholder='ENTRE COM O SEU EMAIL'></TextInput>
        <TextInput style={styles.input} placeholder='ENTRE COM A SUA SENHA'></TextInput>
        
        <TouchableOpacity 
        style={styles.esqueceu}
        onPress={() => navigation.navigate('RecuperarSenha')}
        >
        <Text style={styles.textoEsqueceu}>ESQUECEU A SENHA?</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
        style={styles.botao}
        onPress={() => navigation.navigate('Home')}
        >
        <Text style={styles.textoBotao}>ENTRAR</Text>
        </TouchableOpacity>

        <Text style={styles.texto}>AINDA NÃO CRIOU A SUA CONTA? 
        <TouchableOpacity style={{alignItems:'center',justifyContent:'center'}}><Text style={styles.span}>CLIQUE AQUI</Text></TouchableOpacity> PARA SE CADASTRAR</Text>
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
        fontWeight:'bold'
    },
});
