import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

import { getAuth } from "firebase/auth";
import { getDocs, query, collection, where } from "firebase/firestore";
import db from '../../config/configFirebase';

import MinhaPublicacao from '../../components/minhaPublicacao';
import Backbutton from '../../components/Backbutton';

export default function MinhaPubs({ navigation }) {

  const [post, setPost] = useState([]);

  const fetchPublicacoes = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const q = query(collection(db, 'posts'), where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);
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
      <Backbutton onClick={() => navigation.goBack()} />
      <Text style={styles.titulo}>
        MINHAS PUBLICAÇÕES
      </Text>

      <FlatList
        vertical={true}
        data={post}
        renderItem={({ item }) => (

          <MinhaPublicacao
            tipoAjuda={item.tipoAjuda}
            sobreVoce={item.sobreVoce}
            nomeUser={item.nomeUser}
            imgUser={item.imgUser}
            imgPost1={item.imgPost1}
            imgPost2={item.imgPost2}
            imgPost3={item.imgPost3}
            navigation={navigation}
          />
        )}
      />


    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  titulo: {
    alignSelf: 'center',
    width: '90%',
    fontSize: 40,
    color: '#38b6ff',
    marginTop: 30,
    textAlign: 'center',
    fontWeight: '700',
    marginBottom: 50,
  },
})