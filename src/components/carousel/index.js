import React from 'react';
import { View,Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';

export default function carousel() {
    const carouselitem =[
        {
            img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTggjHdZgpW3d1QKWKBy6stur-kgUvdUPXBzA&usqp=CAU',

        },
        {
            img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTggjHdZgpW3d1QKWKBy6stur-kgUvdUPXBzA&usqp=CAU',

        },
    ];

function renderItem({ item }){
    return(
        <View>
            <Image source={{uri: `${item.img}`}}/>
        </View>
    );
}

 return (
   <View>
       <Carousel
            data={carouselitem}
            sliderWidth={300}
            itemWidth={300}
            renderItem={renderItem}
       />

   </View>
  );
}