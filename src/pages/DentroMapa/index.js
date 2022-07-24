import React, {useState} from 'react';
import { ImageBackground, View, StyleSheet, TextInput } from 'react-native';
import Backbutton from '../../components/Backbutton';

export default function DentroMapa({navigation}) {

    const [input, setInput] = useState('');
    const [image, setImage] = useState('https://www.google.com/maps/d/thumbnail?mid=10Y7jwq7YSUDlYxhONy5GVrb8JfI');

    return (
    <View style={styles.container}>
        <Backbutton onClick={() => navigation.goBack()}/>
        <View style={styles.imgContainer}>
                <ImageBackground source={image} resizeMode="cover" style={styles.img}>
                <TextInput 
                    style={styles.input}
                    onChangeText={setInput}
                    value={input}
                    placeholder="Pesquisar por Bairro, Cidade ou Estado"
                />
            </ImageBackground>
        </View>

    </View>
  );
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#fff'
    },
    imgContainer:{
        width: '90%',
        height: '90%',
        alignItems: 'center',
        marginTop: 20
    },
    img:{
        width: '100%',
        height: '100%'
    },
    input:{
        width: '90%',
        padding: 17,
        fontSize: 13,
        backgroundColor: '#ebeff1',
        borderRadius: 60,
        marginVertical: 15,
        marginLeft: 5
    }
})