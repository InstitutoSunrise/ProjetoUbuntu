import React from 'react';
import { View, StyleSheet, TouchableOpacity,Text } from 'react-native';

export default function Configuracoes() {
 return (
   <View style={styles.container}>

        <Text style={styles.titulo}>CONFIGURAÇÕES</Text>
        <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>SOBRE O APP</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>PERMISSÕES</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>SAIR</Text>
        </TouchableOpacity>
   </View>
  );
}

const styles = StyleSheet.create({
container:{
    flex: 1,
    alignItems: 'center',
    width: '100%',
},
titulo:{
    width: '90%',
    fontSize: 35,
    color: '#38b6ff',
    marginTop: 120,
    textAlign: 'center',
    fontWeight: '700',
    marginBottom: 50,
},
btn:{
    height: '9%',
    width: '65%',
    backgroundColor: '#0e52B2',
    marginVertical: 15,
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 60,
},
btnText:{
    fontWeight: '800',
    fontSize: 25,
    color: "white",
},
})