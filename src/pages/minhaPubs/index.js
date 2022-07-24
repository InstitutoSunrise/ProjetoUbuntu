import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';


import MinhaPublicacao from '../../components/minhaPublicacao';
import Backbutton from '../../components/Backbutton';

const DATA = [
    {
      id: '1',
      dataHora: '27/07/22 - 12:30',
      descricao: 'Estou doando 3 calças de moletom para o frio, alguém precisando?',
    },
    {
        id: '2',
        dataHora: '12/06/22 - 12:30',
        descricao: 'Preciso de leite para os meus filhos',
      },
      {
        id: '3',
        dataHora: '04/06/22 - 12:30',
        descricao: 'Procuro cesta básica',
      },
      {
        id: '4',
        dataHora: '05/05/22 - 12:30',
        descricao: 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum',
      },
  ];



export default function MinhaPubs({navigation}) {
 return (
    
   <View style={styles.container}> 
   <Backbutton onClick={() => navigation.goBack()}/>
    <Text style={styles.titulo}>
        MINHAS PUBLICAÇÕES
    </Text>

    <FlatList 
            vertical={true}
            data={DATA}
            keyExtractor = {(item)=> item.id}
            renderItem = { ({item}) => (

              <MinhaPublicacao
                  dataHora = {item.dataHora}
                  descricao = {item.descricao}
              />
            )}
      />


   </View>
   
  );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: '100%',
        alignItems: 'center',
        backgroundColor:'#fff'
    },
    titulo:{
        width: '90%',
        fontSize: 40,
        color: '#38b6ff',
        marginTop: 30,
        textAlign: 'center',
        fontWeight: '700',
        marginBottom: 50,
    },
})