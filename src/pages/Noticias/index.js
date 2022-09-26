import React, { useState } from 'react';
import { ImageBackground, StyleSheet, View, Text, TouchableOpacity, ScrollView, Dimensions, Modal, SafeAreaView } from 'react-native';

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

    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.container}>
            <ImageBackground source={{ uri: image }} style={styles.ImageBackground} imageStyle={{ opacity: 0.5 }}>
                <ScrollView contentContainerStyle={{ padding: 5 }}>

                    <Backbutton onClick={() => navigation.goBack()} />

                    <TouchableOpacity style={styles.containerNoticia} onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={styles.tituloNoticia}>Fome em Tempos de Crise</Text>
                        <Text style={styles.textNoticia}>{filterDesc("Ullamco voluptate reprehenderit consequat dolore do velit exercitation. Velit adipisicing veniam quis cillum quis deserunt nisi. Ex culpa non anim sint minim cupidatat adipisicing. Tempor eiusmod eu ea magna ipsum aliquip quis.")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.containerNoticia} onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={styles.tituloNoticia}>Por que fazer doações?</Text>
                        <Text style={styles.textNoticia}>{filterDesc("Ullamco voluptate reprehenderit consequat dolore do velit exercitation. Velit adipisicing veniam quis cillum quis deserunt nisi. Ex culpa non anim sint minim cupidatat adipisicing. Tempor eiusmod eu ea magna ipsum aliquip quis.")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.containerNoticia} onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={styles.tituloNoticia}>A importância de ajudar o próximo</Text>
                        <Text style={styles.textNoticia}>{filterDesc("Ullamco voluptate reprehenderit consequat dolore do velit exercitation. Velit adipisicing veniam quis cillum quis deserunt nisi. Ex culpa non anim sint minim cupidatat adipisicing. Tempor eiusmod eu ea magna ipsum aliquip quis.")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.containerNoticia} onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={styles.tituloNoticia}>O que é ser uma pessoa solidaria</Text>
                        <Text style={styles.textNoticia}>{filterDesc("Ullamco voluptate reprehenderit consequat dolore do velit exercitation. Velit adipisicing veniam quis cillum quis deserunt nisi. Ex culpa non anim sint minim cupidatat adipisicing. Tempor eiusmod eu ea magna ipsum aliquip quis.")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.containerNoticia} onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={styles.tituloNoticia}>O que é ser uma pessoa solidaria</Text>
                        <Text style={styles.textNoticia}>{filterDesc("Ullamco voluptate reprehenderit consequat dolore do velit exercitation. Velit adipisicing veniam quis cillum quis deserunt nisi. Ex culpa non anim sint minim cupidatat adipisicing. Tempor eiusmod eu ea magna ipsum aliquip quis.")}</Text>
                    </TouchableOpacity>
                </ScrollView>

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
                                <TouchableOpacity style={{ alignSelf: 'flex-end', marginTop: 8 }} onPress={() => setModalVisible(!modalVisible)}>
                                    <AntDesign name="close" size={40} color="#545454" />
                                </TouchableOpacity>

                                <View style={styles.tituloNoticiaModalView}>
                                    <Text style={styles.tituloModalNoticia}>Fome em Tempos de Crise</Text>
                                </View>
                                <View style={{ height: '65%' }}>
                                    <ScrollView contentContainerStyle={{ width: '100%', height: '100%' }}>
                                        <View style={styles.textModalNoticiaView}>
                                            <Text style={styles.textModalNoticia}>
                                                Aliqua do aute aliquip labore esse cillum. Veniam reprehenderit anim laboris aliquip et sint. Anim irure eu id velit nisi. Lorem proident nulla commodo ex consectetur est anim ipsum.
                                                Ut laboris commodo est ipsum in nulla. Ullamco adipisicing ipsum proident nostrud et occaecat est consequat voluptate irure non aliquip nisi. Aute ea nisi minim do. In quis sunt nisi et reprehenderit nisi dolore id mollit sunt Lorem. Deserunt eu minim eiusmod fugiat excepteur eiusmod adipisicing. Labore consequat mollit amet dolor consequat pariatur magna fugiat non. Veniam sunt qui nostrud laborum commodo et pariatur dolore et officia cupidatat ea anim.
                                                Laboris et magna nostrud ad officia incididunt deserunt mollit nostrud qui est reprehenderit culpa fugiat. Magna pariatur sit amet adipisicing culpa nostrud anim quis deserunt ea anim deserunt. Non reprehenderit adipisicing anim ad irure elit pariatur incididunt elit sint elit proident consequat aliquip. Culpa tempor elit nisi qui eiusmod proident duis. Elit enim elit est consectetur Lorem duis commodo sit reprehenderit nisi esse.
                                                Pariatur amet ex deserunt ad. Voluptate ex enim occaecat deserunt veniam. Cillum ad in elit ea ut in voluptate aliquip qui qui non dolore labore. Occaecat eu esse veniam eu incididunt cupidatat qui incididunt sunt ad. Veniam eiusmod irure ipsum occaecat.
                                            </Text>
                                        </View>
                                    </ScrollView>
                                </View>
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
        marginTop: 10
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
        height: '85%',
        padding: 15,
    },
    textModalNoticia: {
        fontSize: 15,
    },
})