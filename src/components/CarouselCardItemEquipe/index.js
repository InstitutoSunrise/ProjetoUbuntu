import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from "react-native"
import { useState } from 'react'
import { Pagination } from 'react-native-snap-carousel'

export const SLIDER_WIDTH = Dimensions.get('window').width
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 1.0)

//const { entries, activeSlide } = this.useState;

const CarouselCardItemEquipe = ({ item, index }) => {
  return (
    <View style={styles.container}  key={index}>
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
    // alignItems:'center',
    justifyContent:'center'
    // marginTop: 500,
    // marginRight: 50,
    // marginBottom: -35,
  },
  containerImg:{
    width: 100,
    height: 120,
    borderRadius: 60,
    zIndex: 5,
   // backgroundColor: '#fff'
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 60,
  },
  textoData:{
    fontSize: 17,
    color: "blue",
    marginLeft: 90,
    marginTop: 25,
    
  },
  infosContainer:{
    width: 350,
    height: '60%',
    backgroundColor: 'lightgrey',
    marginLeft: -100,
    borderRadius: 60,
    marginTop: 9,
  },
})

export default CarouselCardItemEquipe;