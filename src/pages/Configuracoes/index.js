import React, {useCallback} from 'react';
import { View, StyleSheet, TouchableOpacity,Text, StatusBar, Alert, Linking } from 'react-native';

import Backbutton from '../../components/Backbutton';
import { getAuth, signOut } from "firebase/auth";


export default function Configuracoes({navigation}) {

    function Logout(){
        const auth = getAuth();
        signOut(auth).then(() => {
          // Sign-out successful.
          navigation.navigate("Login")
        }).catch((error) => {
          // An error happened.
        });
      }

    const siteUbuntu = "https://projetoubuntu.netlify.app/app.html";

    const OpenURLButton = ({ url, children }) => {
    const handlePress = useCallback(async () => {
        // Checking if the link is supported for links with custom URL scheme.
        const supported = await Linking.canOpenURL(url);

        if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(url);
        } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }, [url]);

    return <TouchableOpacity style={styles.btn} onPress={handlePress}><Text style={styles.btnText}>{children}</Text></TouchableOpacity>;
    };

 return (
   <View style={styles.container}>
    <StatusBar barStyle="dark-content" backgroundColor="#0e52b2"/>
    <Backbutton onClick={() => navigation.goBack()}/>

        <Text style={styles.titulo}>CONFIGURAÇÕES</Text>

        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('SobreApp')}>
            <Text style={styles.btnText}>SOBRE O APP</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>EXCLUIR CONTA</Text>
        </TouchableOpacity>

        <OpenURLButton url={siteUbuntu}>AJUDA</OpenURLButton>

        <TouchableOpacity style={styles.btn} onPress={() => {Logout()}}>
            <Text style={styles.btnText}>SAIR</Text>
        </TouchableOpacity>
   </View>
  );
}

const styles = StyleSheet.create({
container:{
    flex: 1,
    alignItems: 'center',
    backgroundColor:'#fff'
},
titulo:{
    fontSize:35,
    fontWeight:'bold',
    color:'#38B6FF',
    marginTop: 30,
    textTransform:'uppercase',
    marginBottom:50
},
btn:{
    height: '9%',
    width: '65%',
    backgroundColor: '#0e52B2',
    marginVertical: 15,
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 60,
    alignItems: 'center'
},
btnText:{
    fontWeight: '800',
    fontSize: 25,
    color: "white",
},
})