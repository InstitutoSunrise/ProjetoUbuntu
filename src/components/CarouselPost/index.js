import React, { useState } from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from "react-native"
import Carousel, { Pagination } from 'react-native-snap-carousel'
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from '../CarouselCardItem'
// import data from '../../../assets/data/data.js'

const CarouselPostItens = ({ item, index }) => {
    return (
        <View style={styles.container} key={index}>
            <Image
                source={{ uri: item }}
                style={styles.image}
            />
        </View>
    )
}

const showPagination = (index, isCarousel) => {
    return (
        <View style={{ marginTop: -60, width: '100%' }}>
            <Pagination
                dotsLength={3}
                activeDotIndex={index}
                carouselRef={isCarousel}
                dotStyle={{
                    width: 20,
                    height: 20,
                    borderRadius: 20,
                    backgroundColor: 'rgba(210, 215, 211, 1)',
                }}
                inactiveDotOpacity={0.5}
                inactiveDotScale={0.6}
            />
        </View>
    )
}

const CarouselPost = (data) => {
    const [index, setIndex] = React.useState(0)
    const isCarousel = React.useRef(null)

    return (
        <View style={{ width: '100%' }}>
            <Carousel
                layout="stack"
                layoutCardOffset={10}
                ref={isCarousel}
                data={data.data}
                renderItem={CarouselPostItens}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                onSnapToItem={(index) => setIndex(index)}
            />
            {showPagination(index, isCarousel)}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 8,
        width: '100%',
        marginLeft: -40,
        marginTop: 10,
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
        width: '100%',
        height: 300,
    },
})

export default CarouselPost