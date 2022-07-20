import React, {useState} from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, TextInput, Button } from 'react-native';

import Checkbox from 'expo-checkbox';
import * as ImagePicker from 'expo-image-picker';

import Backbutton from '../../components/backbutton/backbutton';

export default function Publicar({navigation}) {

    const [isDoando, setDoando] = useState(false);
    const [isRecebendo, setRecebendo] = useState(false);
    
    const [tipoAjuda, setTipoAjuda] = useState('');
    const [sobreVoce, setSobreVoce] = useState('');

    const [count, setCount] = useState(0)
    const imagesArr = [];

    const [image, setImage] = useState(imagesArr);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        });

        // console.log(result);

        if (!result.cancelled) {
            setCount(() => (count + 1))
            
            setImage(oldArray => [...oldArray, result.uri]);
            // console.log("teste número" + count, image, )
    };
    // console.log("teste número" + count, image, )
}


 return (
   <View style={styles.container}>

    <View style={styles.containerBackFoto}>
        <Backbutton onClick={() => navigation.goBack()}/>

        <TouchableOpacity style={styles.containerFoto}>
            <Image
                style={styles.fotoPerfil}
                source={{
                uri: 'https://cdn.icon-icons.com/icons2/2506/PNG/512/user_icon_150670.png',
                }}
            />
        </TouchableOpacity>
    </View>

    <View style={styles.checkBoxesContainer}>
        <Text style={styles.textoCheckBox}>Você está recebendo ou doando?</Text>
        <View style={styles.containerCheck}>
            <Text style={styles.opcoesCheckBox}>Doando</Text>
            <Checkbox
                style={styles.checkBox}
                value={isDoando}
                onValueChange={() => setDoando(!isDoando) & setRecebendo(false)}
                color={isDoando ? '#4630EB' : undefined}
                />  
        </View>

        <View style={styles.containerCheck}>
            <Text style={styles.opcoesCheckBox}>Recebendo</Text>
            <Checkbox
                style={styles.checkBox}
                value={isRecebendo}
                onValueChange={() => setRecebendo(!isRecebendo) & setDoando(false)}
                color={isRecebendo ? '#4630EB' : undefined}
                />  
        </View>
    </View>

    <View style={styles.containerInput1}>
        <TextInput
            style={styles.placeholderText}
            onChangeText={setTipoAjuda}
            value={tipoAjuda}
            placeholder="Que tipo de ajuda você precisa no momento?"
            multiline
            numberOfLines={5}
            autoCapitalize={'sentences'}
            autoCorrect
            maxLength={200}
            textBreakStrategy={'highQuality'}
            
        />
    </View>
    <View style={styles.containerInput2}>
        <TextInput
            style={styles.placeholderText}
            onChangeText={setSobreVoce}
            value={sobreVoce}
            placeholder="Fale um pouco sobre você..."
            multiline
            numberOfLines={8}
            autoCapitalize={'sentences'}
            autoCorrect
            maxLength={350}
        />
    </View>
    
    <View style={styles.imgPickerContainer}>
    <TouchableOpacity style={styles.touchable} onPress={pickImage}>
       <Image source={{uri: 'https://static.thenounproject.com/png/3322766-200.png'}} style={styles.imgPickerImage}/>
       <Text style={styles.imgPickerTitle}>ADICIONAR IMAGENS</Text> 
    </TouchableOpacity>
        {image && <Image source={{ uri: image[0] }} style={styles.imgPicker} />}
        {image && <Image source={{ uri: image[1] }} style={styles.imgPicker} />}
        {image && <Image source={{ uri: image[2] }} style={styles.imgPicker} />}
    </View>

    <TouchableOpacity style={styles.btnPublicar}>
        <Text style={styles.btnPublicarTexto}>PUBLICAR</Text>
    </TouchableOpacity>

   </View>
  );
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        width: '100%',
    },
    containerBackFoto:{
        flexDirection: 'row',
        marginTop: 30,
        marginBottom: 17,
        width: '90%',
    },
    containerFoto:{
        width: 70,
        height: 70,
        alignItems: 'center',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 100,
        borderColor: '#0e52B2',
        marginBottom: 10,
        marginLeft: -80,
    },
    fotoPerfil:{
        height: '90%',
        width: '90%',
    },
    checkBoxesContainer:{
        width: '85%',
        paddingVertical: 5,
        backgroundColor: '#ebeff1',
        borderRadius: 20,
        paddingBottom: 10,
    },
    containerCheck:{
        flexDirection:'row',
        width: '100%'
    },
    textoCheckBox:{
        fontSize: 16,
        color: '#545454',
        padding: 15,
        fontWeight: '800'
    },
    opcoesCheckBox:{
        fontSize: 15,
        color: '#545454',
        paddingVertical: 7,
        width: '85%',
        fontWeight: '700',
        alignSelf: 'flex-start',
        marginLeft: 10,
    },
    checkBox:{
        alignSelf: 'center',
    },
    containerInput1:{
        width: '85%',
        height: 115,
        backgroundColor: '#ebeff1',
        marginTop: 15,
        borderRadius: 20,
    },
    containerInput2:{
        width: '85%',
        height: 170,
        backgroundColor: '#ebeff1',
        marginTop: 15,
        borderRadius: 20,
        textAlign: 'flex-start'
    },
    placeholderText:{
        fontSize: 12,
        color: '#545454',
        fontWeight: '700',
        marginHorizontal: 15,
        paddingVertical: 10,
        width: '90%',
    },
    imgPickerContainer:{
        width: '100%',
        flexDirection: 'row',
        marginTop: 25,
        alignItems: 'center',
    },
    imgPickerImage:{
        width:  70,
        height: 60,
        marginHorizontal: 30,
    },
    imgPickerTitle:{
        fontSize: 11.5,
        fontWeight:'bold',
        color: '#0e52B2',
    },
    imgPicker:{
        width: 50,
        height: 50,
        marginLeft: 15,
    },
    touchable:{
        alignItems: 'center',
        textAlign:'center',
        marginHorizontal: 10,
        marginRight: 10
    },
    btnPublicar:{
        width: '45%',
        padding: 12,
        backgroundColor: '#0e52B2',
        borderRadius: 60,
        marginTop: 25,
    },
    btnPublicarTexto:{
        fontSize: 25,
        fontWeight: '800',
        textAlign: 'center',
        color: '#fff'
    },
})