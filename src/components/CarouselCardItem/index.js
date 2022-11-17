import { stopLocationUpdatesAsync } from 'expo-location'
import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image, ImageBackground } from "react-native"

export const SLIDER_WIDTH = Dimensions.get('window').width
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.95)

const CarouselCardItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: item.imgUser }}
        style={styles.image}
        imageStyle={{ opacity: 0.5 }}
      >
        <View style={styles.viewDescricao}>
          <Text style={styles.nome}>{item.nome}</Text>
          <Text style={styles.descricao}>{item.descricao}</Text>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    width: ITEM_WIDTH,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  image: {
    width: ITEM_WIDTH,
    height: 250,
  },
  viewDescricao:{
    width: '100%',
    height:'100%',
    padding: 10,
    justifyContent: 'flex-end'
  },
  nome: {
    fontSize: 20,
    fontWeight: '800',
    color: "#38B6FF",
    textTransform: 'uppercase',
  },
  descricao: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0c4a86'
  }
  // header: {
  //   color: "#222",
  //   fontSize: 28,
  //   fontWeight: "bold",
  //   paddingLeft: 20,
  //   paddingTop: 20
  // },
  // body: {
  //   color: "#222",
  //   fontSize: 18,
  //   paddingLeft: 20,
  //   paddingLeft: 20,
  //   paddingRight: 20
  // }
})

export default CarouselCardItem