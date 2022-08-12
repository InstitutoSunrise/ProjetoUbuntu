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
      </View>

      <View style={{marginTop: -40,width:'100%'}}>
      <Pagination
        dotsLength={7}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 18,
          height: 18,
          borderRadius: 20,
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        
        tappableDots={true}
      />
      </View>
    </View>
  )
}


export default CarouselCardsEquipe;