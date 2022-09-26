import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, StatusBar, Modal, Alert, Dimensions, FlatList } from 'react-native';
import Post from '../../components/post/post';

import CarouselCards from '../../components/CarouselCards';
import { Ionicons, AntDesign } from '@expo/vector-icons';

import { collection, getDocs } from "firebase/firestore";
import db from '../../config/configFirebase';

import Checkbox from 'expo-checkbox';

export default function Home({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

  const [alimentosFiltro, setAlimentosFiltro] = useState(false);
  const [roupasFiltro, setRoupasFiltro] = useState(false);
  const [moveisFiltro, setMoveisFiltro] = useState(false);
  const [outrosFiltro, setOutrosFiltro] = useState(false);
  const [mostrarTudoFiltro, setMostrarTudoFiltro] = useState(false);
  const [post, setPost] = useState([]);
  const windowWidth = Dimensions.get('window').width;


  const fetchPublicacoes = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    const List = []
    querySnapshot.forEach((doc) => {
      List.push({ ...doc.data(), id: doc.id, })
      console.log(doc.id, "=>", doc.data());
    });
    console.log(post)
    return setPost(List)
  }

  useEffect(() => {
    fetchPublicacoes();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <ScrollView >

        <View style={{ height: 260 }}>
          <CarouselCards />
        </View>

        <View style={{ paddingVertical: 15, width: '100%', justifyContent: 'center', flexDirection: 'row' }}>
          <TouchableOpacity style={styles.filter} onPress={() => setModalVisible(!modalVisible)}>
            <Ionicons style={{ marginRight: 5 }} name="filter" size={25} color="#fff" />
            <Text style={styles.text}>FILTRO</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filter} onPress={() => navigation.navigate('instituicoes')}>
            <Text style={styles.text}>INSTITUIÇÕES</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filter} onPress={() => navigation.navigate('Noticias')}>
            <Text style={styles.text}>NOTÍCIAS</Text>
          </TouchableOpacity>
        </View>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalView}>
            <View style={styles.viewModalFiltro}>
              <View style={styles.containerModalFiltro}>
                <TouchableOpacity style={{ alignSelf: 'flex-end', marginTop: 8 }} onPress={() => setModalVisible(!modalVisible)}>
                  <AntDesign name="close" size={40} color="#545454" />
                </TouchableOpacity>

                <View style={styles.tituloModalFiltroView}>
                  <AntDesign style={{ marginRight: 5 }} name="filter" size={40} color="#0e52b2" />
                  <Text style={styles.tituloModalFiltro}>FILTRAR</Text>
                </View>

                <View style={styles.options}>
                  <View style={styles.optionViewModalFiltro}>
                    <Text style={styles.optionTextModalFiltro}>ALIMENTOS</Text>
                    <Checkbox
                      style={styles.optionCheckBox}
                      value={alimentosFiltro}
                      onValueChange={() => setAlimentosFiltro(!alimentosFiltro)}
                      color={alimentosFiltro ? '#4630EB' : undefined}
                    />
                  </View>
                  <View style={styles.separarOptions} />

                  <View style={styles.optionViewModalFiltro}>
                    <Text style={styles.optionTextModalFiltro}>ROUPAS</Text>
                    <Checkbox
                      style={styles.optionCheckBox}
                      value={roupasFiltro}
                      onValueChange={() => setRoupasFiltro(!roupasFiltro)}
                      color={roupasFiltro ? '#4630EB' : undefined}
                    />
                  </View>
                  <View style={styles.separarOptions} />

                  <View style={styles.optionViewModalFiltro}>
                    <Text style={styles.optionTextModalFiltro}>MÓVEIS</Text>
                    <Checkbox
                      style={styles.optionCheckBox}
                      value={moveisFiltro}
                      onValueChange={() => setMoveisFiltro(!moveisFiltro)}
                      color={moveisFiltro ? '#4630EB' : undefined}
                    />
                  </View>
                  <View style={styles.separarOptions} />

                  <View style={styles.optionViewModalFiltro}>
                    <Text style={styles.optionTextModalFiltro}>OUTROS</Text>
                    <Checkbox
                      style={styles.optionCheckBox}
                      value={outrosFiltro}
                      onValueChange={() => setOutrosFiltro(!outrosFiltro)}
                      color={outrosFiltro ? '#4630EB' : undefined}
                    />
                  </View>
                  <View style={styles.separarOptions} />

                  <View style={styles.optionViewModalFiltro}>
                    <Text style={styles.optionTextModalFiltro}>MOSTRAR TUDO</Text>
                    <Checkbox
                      style={styles.optionCheckBox}
                      value={mostrarTudoFiltro}
                      onValueChange={() => setMostrarTudoFiltro(!mostrarTudoFiltro)}
                      color={mostrarTudoFiltro ? '#4630EB' : undefined}
                    />
                  </View>
                  <View style={styles.separarOptions} />
                </View>

                <TouchableOpacity style={styles.btnAplicarFiltro} onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textAplicarFiltro}>APLICAR FILTRO</Text>
                </TouchableOpacity>

              </View>
            </View>
          </View>
        </Modal>

        <View style={styles.contanierTitulo}>
          <Text style={styles.titulo}>PUBLICAÇÕES</Text>
        </View>

        <View
          style={{ alignItems: "center", flexDirection: "row", justifyContent: "center", flex: 1, justifyContent: "center" }}
        >
          <FlatList
            showsVerticalScrollIndicator={false}
            data={post}
            renderItem={({ item }) => {
              return (
                <Post
                  tipoAjuda={item.tipoAjuda}
                  sobreVoce={item.sobreVoce}
                  nomeUser={item.nomeUser}
                  imgUser={item.imgUser}
                  imgPost1={item.imgPost1}
                  imgPost2={item.imgPost2}
                  imgPost3={item.imgPost3}
                />
              )
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contanierTitulo: {
    marginVertical: 5
  },
  titulo: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#38B6FF',
  },
  containerFilter: {
    padding: 15,
    justifyContent: 'space-between',
    paddingRight: 120,
  },
  filter: {
    padding: 8,
    backgroundColor: "#38B6FF",
    width: '30%',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 5,
  },
  text: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff'
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#rgba(0,0,0,0.5)',
  },
  viewModalFiltro: {
    backgroundColor: '#e8eaea',
    alignItems: 'center',
    alignSelf: 'center',
    width: '85%',
    height: '50%',
    borderRadius: 35,
  },
  containerModalFiltro: {
    width: '95%',
    height: '95%',
    justifyContent: 'space-between'
  },
  tituloModalFiltroView: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: -25,
    marginLeft: 17
  },
  tituloModalFiltro: {
    color: '#0e52b2',
    fontSize: 25,
    fontWeight: '800',
  },
  options: {
    width: '90%',
    marginTop: 25,
  },
  optionViewModalFiltro: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  optionTextModalFiltro: {
    fontWeight: '900',
    fontSize: 16,
    marginLeft: 20,
    marginTop: 15,
  },
  optionCheckBox: {
    alignSelf: 'center',
    marginTop: 15,
  },
  separarOptions: {
    width: '100%',
    height: '1%',
    backgroundColor: '#545454',
    marginTop: 5,
    marginLeft: 20,
  },
  btnAplicarFiltro: {
    backgroundColor: '#0e52b2',
    width: '60%',
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    borderRadius: 30,
    marginTop: 10
  },
  textAplicarFiltro: {
    fontWeight: '900',
    fontSize: 17,
    padding: 5,
    color: '#fff'
  },
});