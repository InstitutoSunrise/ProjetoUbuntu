import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Backbutton from '../../components/Backbutton';

export default function App({navigation}) {
  return (
    <View style={styles.container}>
      <Backbutton onClick={()=> navigation.goBack()}/>

      <Text style={styles.titulo}>CADASTRE-SE</Text>

      <TouchableOpacity style={styles.foto}>
        <Feather name="user" size={75} color="black" />
      </TouchableOpacity>

      <Text style={styles.texto}>PARA FINALIZAR, ADICIONE UMA FOTO DE PERFIL</Text>

      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.textoBotao}>SALVAR</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    backgroundColor:'#fff',
  },
  titulo:{
    fontSize:50,
    fontWeight:'bold',
    color:'#38B6FF',
    marginTop: 30,
  },
  foto:{
    width:150,
    height:150,
    borderRadius:80,
    marginTop:30,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#e8eaea',
  },
  texto:{
    fontSize:15,
    textAlign:'center',
    marginTop:30
  },
  botao:{
    marginTop:'30%',
    width:200,
    backgroundColor:'#0e52b2',
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
    
} );
