import React, {useState, useEffect} from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList } from 'react-native';
import Backbutton from '../../components/Backbutton/index';
import Post from '../../components/postInstituicao/postInstituicao';

import { getDocs, query, collection, where } from "firebase/firestore";
import db from '../../config/configFirebase';

export default function Instituicoes({ navigation }) {

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
        <View style={styles.container}>
            <Backbutton onClick={() => navigation.goBack()} />
            <ScrollView>
                <Text style={styles.titulo}>INSTITUIÇÕES</Text>
                <Text style={styles.subTitulo}>Clique no nome da instituição e saiba mais informações sobre ela</Text>

                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={post}
                    renderItem={({ item }) => {
                        return(
                            <Post
                                nome={item.nome}
                                endereco={item.endereco}
                                numero={item.numero}
                                horario={item.horário}
                                telefone={item.telefone}
                                descricao={item.descricao}
                                email={item.email}
                                userId={item.userId}
                                banho={item.banho}
                                voluntario={item.voluntario}
                                alimento={item.alimento}
                                navigation={navigation}
                            />
                        )
                    }}
                />

            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    titulo: {
        width: '100%',
        fontSize: 40,
        fontWeight: 'bold',
        color: '#38B6FF',
        marginTop: 20,
        textAlign:'center'
    },
    subTitulo: {
        fontSize: 17,
        width: '100%',
        color: '#0c4a86',
        textAlign: 'center',
        textTransform: 'uppercase',
    },
})