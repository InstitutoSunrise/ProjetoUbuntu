import React, { useState, useEffect } from 'react'
import { View } from "react-native"

import Carousel from 'react-native-snap-carousel'
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from '../CarouselCardItem'
import data from '../../../assets/data/data.js'

import { getDocs, query, collection, where } from "firebase/firestore";
import db from '../../config/configFirebase';


const CarouselCards = () => {
  const isCarousel = React.useRef(null)
  const [post, setPost] = useState([]);

  const ShowInstituicao = async () => {
    const q = query(collection(db, "Usuários"), where("tipoUser", "==", "userInst"));

    const querySnapshot = await getDocs(q);
    const List = []
    querySnapshot.forEach((doc) => {
      List.push({ ...doc.data(), id: doc.id, })
      console.log(doc.id, " => ", doc.data());
    });
    return setPost(List)
  }

  useEffect(() => {
    ShowInstituicao();
}, []);

  return (
    <View style={{ width: '100%' }}>
      <Carousel
        layout="default"
        layoutCardOffset={10}
        ref={isCarousel}
        data={post}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        autoplay={true}
      />
    </View>
  )
}


export default CarouselCards