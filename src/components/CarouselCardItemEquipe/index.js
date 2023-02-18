import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from "react-native"
import { useState } from 'react'
import { Pagination } from 'react-native-snap-carousel'

export const SLIDER_WIDTH = Dimensions.get('window').width
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 1.0)

const CarouselCardItemEquipe = ({ item, index }) => {
  return (
    <View style={styles.container} key={index}>
      <View style={styles.containerImg}>
        <Image
          source={{ uri: item.imgPessoa }}
          style={styles.image}
        />
      </View>
      <View style={styles.infosContainer}>
        <Text style={styles.textoData}>
          {item.nome} - {item.cargo}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: ITEM_WIDTH,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  containerImg: {
    width: 100,
    height: 120,
    borderRadius: 60,
    zIndex: 5,
    // backgroundColor: '#fff'
  },
  image: {
    width: 83,
    height: 82,
    borderRadius: 60,
  },
  textoData: {
    fontSize: 17,
    color: "blue",
    marginTop: 17,
    marginLeft: 80,
    flexShrink: 1,
  },
  infosContainer: {
    width: 350,
    height: '60%',
    backgroundColor: 'lightgrey',
    marginLeft: -100,
    borderRadius: 60,
    marginTop: 9,
    alignItems: 'center',
  },
})

export default CarouselCardItemEquipe;