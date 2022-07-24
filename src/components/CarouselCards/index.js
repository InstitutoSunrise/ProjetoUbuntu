import React from 'react'
import { View } from "react-native"
import Carousel from 'react-native-snap-carousel'
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from '../CarouselCardItem'
import data from '../../../assets/data/data.js'

const CarouselCards = () => {
  const isCarousel = React.useRef(null)

  return (
    <View>
      <Carousel
        layout="default"
        layoutCardOffset={10}
        ref={isCarousel}
        data={data}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        autoplay={true}
      />
    </View>
  )
}


export default CarouselCards