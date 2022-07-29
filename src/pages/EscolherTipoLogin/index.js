import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import Backbutton from '../../components/Backbutton';

export default function EscolherTipoLogin({navigation}) {
 return (
    <View style={estilos.main}>
        <Backbutton onClick={() => navigation.goBack()}/>
        {/* <Image 
            style={estilos.imggeo}
            source={require('../../assets/figuraGeometrica.png')}/> */}

        <View style={estilos.container}>

            <Image
            style={estilos.imagem}
            source={require('../../assets/escolherTipo_.png')}
            />

            <Text style={estilos.descricao}>
                PARA SE CADASTRAR, PRECISAMOS SABER SE VOCÊ É UMA INSTITUIÇÃO OU PESSOA FÍSICA? 
            </Text>

            <TouchableOpacity style={estilos.botao} onPress={() => navigation.navigate('CadastroFisi')}>
                <Text style={estilos.textBotao}>PESSOA FISICA</Text>
            </TouchableOpacity>

            <TouchableOpacity style={estilos.botao} onPress={() => navigation.navigate('CadastroInst1')}>
                <Text style={estilos.textBotao}>INSTITUIÇÃO</Text>
            </TouchableOpacity>
    
        </View>

        <Image 
            style={estilos.imggeo2}
            source={require('../../assets/figuraGeometrica2.png')}/>

    </View>
   
  );
}

const estilos = StyleSheet.create({
    main:{
        flex: 1,
        backgroundColor:'#fff',
        flexDirection:'column', 
        overflow:'hidden',
    },
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    imagem:{
        height: 300,
        width: 300,
        marginTop:30
    },
    descricao:{
        width: '85%',
        fontSize: 14.5,
        textAlign: 'center',
        marginTop: -45,
        marginBottom: 30,
        fontWeight: '400' 
    },
    botao:{
        height: 65,
        width: '75%',
        marginTop: 22,
        backgroundColor: '#0e52b2',
        borderRadius: 60,
        justifyContent: 'center',
    },
    textBotao:{
        fontSize:25,
        fontWeight: '800',
        color: '#fff',
        textAlign: 'center',
        marginBottom:5
    },
    imggeo:{
        width: 250,
        height: 250,
        alignSelf:'flex-start',
        top:0,
        marginTop:-80,
        marginLeft:-80
    },
    imggeo2:{
        width: 250,
        height: 250,
        bottom:-80,
        right:-80,
        alignSelf:'flex-end',
    },
});