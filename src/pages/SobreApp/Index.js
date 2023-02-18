import React, { useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar, Linking, Alert } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import CarouselCardsEquipe from '../../components/CarouselCardsEquipe';
import Backbutton from '../../components/Backbutton/index'

export default function SobreApp({ navigation }) {
  const instaSunrise = "https://www.instagram.com/instituto_sunrise/";
  const siteSunrise = "https://institutosunrise.netlify.app/";

  const OpenURLButton = ({ url }) => {
    const handlePress = useCallback(async () => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);

    return <TouchableOpacity style={styles.botao} onPress={handlePress}>
      <Text style={styles.textoBotao}>Conheça o nosso site</Text>
    </TouchableOpacity>;
  };
  return (
    <View style={styles.conteiner}>
      <StatusBar barStyle="dark-content" backgroundColor="#0e52b2" />
      <ScrollView contentContainerStyle={{ alignItems: 'center', width: '100%' }}>
        <Backbutton onClick={() => navigation.goBack()} />

        <Text style={styles.titulo}>Sobre o App</Text>
        <View style={styles.containerText}>
          <Text style={styles.text}>O UBUNTU consiste em um aplicativo mobile, no qual famílias necessitadas encontrarão  a ajuda que necessitam no momento.
            Um projeto sem fins lucrativos e com enorme vontade de ajudar aqueles que necessitam.</Text>

          <TouchableOpacity style={{ marginTop: 25, flexDirection: 'row', alignItems: 'center' }} onPress={() => Linking.openURL(instaSunrise)}>
            <Entypo style={{ marginRight: 3 }} name="instagram-with-circle" size={30} color="#0e52b2" />
            <Text style={styles.textInsta}>@instituto_sunrise</Text>
          </TouchableOpacity>
        </View>

        <OpenURLButton url={siteSunrise}>CONHEÇA O NOSSO site</OpenURLButton>


        <Text style={styles.SubTitulo}>Nossa Equipe</Text>
        <View>
          <CarouselCardsEquipe />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
    backgroundColor: '#fff'
  },
  titulo: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#38B6FF',
    marginTop: 30,
    textTransform: 'uppercase'
  },
  SubTitulo: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#38B6FF',
    marginTop: 60,
    marginBottom: 15,
  },
  containerText: {
    width: '90%',
    backgroundColor: '#e8eaea',
    padding: 15,
    marginVertical: 30,
    borderRadius: 10
  },
  text: {
    fontSize: 15,
    fontStyle: 'italic',
    color: '#0e52b2',
    textAlign: 'justify'
  },
  botao: {
    // width:200,
    backgroundColor: 'rgb(14, 82, 178)',
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 30,
  },
  textoBotao: {
    textAlign: 'center',
    fontSize: 15.5,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 2,
    textTransform: 'uppercase'
  },
})