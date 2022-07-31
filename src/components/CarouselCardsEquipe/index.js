import React from 'react'
import { View } from "react-native"
import Carousel from 'react-native-snap-carousel'
import { Pagination } from 'react-native-snap-carousel'
import CarouselCardItemEquipe, { SLIDER_WIDTH, ITEM_WIDTH } from '../CarouselCardItemEquipe'
import dataNossaEquipe from '../../../assets/data/dataNossaEquipe.js'

const CarouselCardsEquipe = () => {

  const [index, setIndex] = React.useState(0)
  const isCarousel = React.useRef(null)

  return (
    <View>
      <Carousel
        layout="default"
        layoutCardOffset={10}
        ref={isCarousel}
        data={dataNossaEquipe}
        renderItem={CarouselCardItemEquipe}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        inactiveSlideShift={0}
        onSnapToItem={(index) => setIndex(index)}
        useScrollView={true}
      />
      <Pagination
        dotsLength={dataNossaEquipe.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 18,
          height: 18,
          borderRadius: 20,
          marginHorizontal: 0,
          // marginVertical:-100,
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        
        tappableDots={true}
      />
    </View>
  )
}


export default CarouselCardsEquipe;