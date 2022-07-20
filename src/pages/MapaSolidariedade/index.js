import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

export default function MapaSolidariedade({navigation}) {
 return (
   <View style={styles.container}>
    <Text style={styles.titulo}>MAPA DA SOLIDARIEDADE</Text>

    <Text style={styles.subTitulo}>Encontre instituições perto de você!</Text>
   
    <TouchableOpacity style={styles.imgMapaContainer}  onPress={() => navigation.navigate('DentroMapa')}>
        <Image source={'https://cdn-icons-png.flaticon.com/512/854/854929.png'} style={styles.imgMapa}/>
    </TouchableOpacity>

    <View style={styles.descContainer}>
        <Image source={'https://icons-for-free.com/iconfiles/png/512/svg+map+map+pin+marker+pin+icon-1320184912273635197.png'} style={styles.descIcon}/>
        <Text style={styles.descText}>CLIQUE NO MAPA</Text>
    </View>
   
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
    marginTop: 55,
    textAlign: 'center',
    fontWeight: '700',
},
subTitulo:{
    width: '95%',
    fontSize: 22,
    textAlign: 'center',
    fontWeight: '600',
    color: '#0e52B2',
},
imgMapaContainer:{
    width: '70%',
    height: 350,
    borderRadius: 200,
    marginTop: 40,
    alignItems: 'center'
},
imgMapa:{
    width: '90%',
    height: '90%',  
},
descContainer:{
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginRight: 10
},
descIcon:{
    width: 30,
    height: 30,
},
descText:{
    textAlign: 'center',
    color: '#0e52B2',
    fontSize: 12,
    fontWeight: 'bold',
},
})