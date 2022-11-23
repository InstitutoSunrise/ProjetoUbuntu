import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, View, Text, TouchableOpacity, ScrollView, Dimensions, Modal, FlatList } from 'react-native';

import Backbutton from '../../components/Backbutton';

import { AntDesign } from '@expo/vector-icons';

export default function Noticias({ navigation }) {

    function filterDesc(desc) {
        if (desc.length < 160) {
            return desc;
        }
        return `${desc.substring(0, 150)}...`;
    }


    //backgroundimage ilustrativa, mudar depois
    const image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJAtSZ2L4cHgmAH3csvOlqd5RUHlAU-YtUMSY6-4AfqqODMbP5PGj635jNZOkO-qA2rqk&usqp=CAU"

    const [modalVisible, setModalVisible] = useState(false);
    const [noticias, setNoticias] = useState([]);
    const [execute, setExecute] = useState(false);

    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [dataPublicacao, setDataPublicacao] = useState();


    const getNews = async () => {
        const News = [];
        // https://newsdata.io/api/1/news?apikey=YOUR_API_KEY&country=br&language=pt&category=environment,food,health,politics 
        // https://newsapi.org/v2/top-headlines?country=br&sortBy=popularity&apiKey=e09b5fda3f364078b698a16fd22fcedb
        await fetch('https://newsdata.io/api/1/news?apikey=pub_137812eeee5c09a78dae454eec614e215ee44&country=br&language=pt&category=environment,food,health,politics')
            .then(res => res.json()).then(data => {
                console.log(data)
                const noticiasRequest = data.results
                noticiasRequest.forEach(element => {
                    if (element.content == null) {
                        console.log("sem conteudo")
                    } else {
                        News.push({ ...element });
                    }

                });
            })
            .catch((err) => console.log(err));
        return setNoticias(News);
    }

    const infos = (titulo, content, data) => {
        setModalVisible(!modalVisible)
        setTitle(titulo)
        setContent(content)
        setDataPublicacao(data)
    }

    useEffect(() => {
        getNews();
        setExecute(true)
    }, [])


    return (
        <View style={styles.container}>
            <ImageBackground source={{ uri: image }} style={styles.imgBackgroud} imageStyle={{ opacity: 0.5 }}>

                <Backbutton onClick={() => navigation.goBack()} />

                {execute ?
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={noticias}
                        ListEmptyComponent={<Text style={styles.aviso}>Não há noticias no momento, volte mais tarde</Text>}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity style={styles.containerNoticia} onPress={() => infos(item.title, item.content, item.pubDate)}>
                                    <Text style={styles.tituloNoticia}>{item.title}</Text>
                                    <Text style={styles.textNoticia}>{item.description}</Text>
                                </TouchableOpacity>
                            );
                        }}
                    />
                    : undefined}

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.viewModal}>
                            <View style={styles.containerModalFiltro}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.noticiaData}>{dataPublicacao}</Text>
                                    <TouchableOpacity style={{ position: 'absolute', right: 20, paddingVertical: 15 }} onPress={() => setModalVisible(!modalVisible)}>
                                        <AntDesign name="close" size={40} color="#545454" style={{ alignSelf: 'flex-end', paddingVertical: 10, }} />
                                    </TouchableOpacity>
                                </View>
                                <ScrollView style={styles.textModalNoticiaView}>

                                    <View style={styles.tituloNoticiaModalView}>
                                        <Text style={styles.tituloModalNoticia}>{title}</Text>
                                    </View>

                                    <View style={styles.textModalNoticiaView}>
                                        <Text style={styles.textModalNoticia}>{content}</Text>
                                    </View>

                                </ScrollView>
                            </View>
                        </View>
                    </View>
                </Modal>
            </ImageBackground>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
    },
    containerNoticia: {
        width: '85%',
        borderRadius: 25,
        backgroundColor: '#e8eaea',
        alignSelf: 'center',
        padding: 5,
        marginTop: 15,
    },
    tituloNoticia: {
        color: '#0c4a86',
        fontSize: 20,
        fontWeight: '800',
        padding: 10,
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    noticiaData: {
        marginHorizontal: 10,
        fontSize: 10,
        color: '#020302',
        padding: 20,
    },
    textNoticia: {
        marginHorizontal: 10,
        fontSize: 15,
        color: '#020302',
        padding: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#rgba(0,0,0,0.5)',
    },
    viewModal: {
        backgroundColor: '#e8eaea',
        alignItems: 'center',
        alignSelf: 'center',
        width: '90%',
        height: '85%',
        borderRadius: 35,
    },
    containerModalNoticia: {
        width: '95%',
        height: '95%',
        justifyContent: 'space-between'
    },
    tituloNoticiaModalView: {
        alignItems: 'center',
        maxWidth: '100%'
    },
    tituloModalNoticia: {
        color: '#0e52b2',
        fontSize: 25,
        fontWeight: '800',
        width: '85%',
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    textModalNoticiaView: {
        height: '100%',
        paddingHorizontal: 9,
        marginLeft: 5,
        marginBottom: 15,
    },
    textModalNoticia: {
        fontSize: 15,
    },
    span: {
        fontSize: 13.5,
        color: '#0e52b2',
        padding: 5
    },
    imgBackgroud: {
        flex: 1,
    },
    aviso: {
        width: '100%',
        fontSize: 20,
        fontWeight: "700",
        textTransform: 'uppercase',
        color: '#0e52B2',
        marginTop: 50,
        textAlign: 'center'
    }
})