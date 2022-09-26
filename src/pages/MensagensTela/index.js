import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

const Messages = [
  {
    id: '1',
    userName: 'Jenny Doe',
    userImg: 'maos.jpg',
    messageTime: '4 mins ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '2',
    userName: 'John Doe',
    userImg: 'maos.jpg',
    messageTime: '2 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '3',
    userName: 'Ken William',
    userImg: 'maos.jpg',
    messageTime: '1 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '4',
    userName: 'Selina Paul',
    userImg: 'maos.jpg',
    messageTime: '1 day ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '5',
    userName: 'Christy Alex',
    userImg: 'maos.jpg',
    messageTime: '2 days ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
];

export default function MensagemTela({ navigation }) {

  function filterDesc(desc) {
    if (desc.length < 50) {
      return desc;
    }
    return `${desc.substring(0, 45)}...`;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Mensagem</Text>
      <FlatList
        contentContainerStyle={{ alignItems: 'center' }}
        vertical
        data={Messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.containerFlatList} onPress={() => navigation.navigate('Mensagem', { userName: item.userName })}>

            <Image style={styles.img} source={require(`../../assets/maos.jpg`)} />


            <View style={styles.descricao}>

              <View style={styles.box}>
                <Text style={styles.userName}>{item.userName}</Text>
                <Text style={styles.dataHora}>{item.messageTime}</Text>
              </View>

              <Text style={styles.text}>{filterDesc(item.messageText)}</Text>
            </View>

          </TouchableOpacity>
        )}

      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#38B6FF',
    marginBottom: 10,
    marginTop: 35,
    textTransform: 'uppercase',
    textAlign: 'center'
  },
  containerFlatList: {
    backgroundColor: '#e8eaea',
    borderRadius: 8,
    height: 90,
    width: '90%',
    padding: 5,
    marginVertical: 5,
    marginHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 5,
  },
  descricao: {
    width: '70%'
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  userName: {
    fontSize: 20,
    color: '#0c4a86',
  },
  dataHora: {
    fontSize: 13,
    fontWeight: '300',
    textAlign: 'right',
  },
  text: {
    fontSize: 15,
    textAlign: 'left',
    justifyContent: 'center',
    // width:'70%',
  },
});