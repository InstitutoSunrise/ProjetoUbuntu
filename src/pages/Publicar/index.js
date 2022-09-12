import React, {useState, useEffect} from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, TextInput,  ScrollView  } from 'react-native';

import Checkbox from 'expo-checkbox';
import * as ImagePicker from 'expo-image-picker';

import db from '../../config/configFirebase';
import { getAuth } from "firebase/auth";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

export default function Publicar({navigation}) {

    const auth = getAuth();
    const user = auth.currentUser;

    const [imagePerfil, setImagePerfil] = useState(user.photoURL);

    const [isDoando, setDoando] = useState(false);
    const [isRecebendo, setRecebendo] = useState(false);
    
    const [tipoAjuda, setTipoAjuda] = useState('');
    const [sobreVoce, setSobreVoce] = useState('');
    const [nomeCompleto, setNomeCompleto] = useState('');
    const [status, setStatus] = useState('');
    const [teste, setTeste] = useState(false);

    const imagesArr = [];
    const [image, setImage] = useState(imagesArr);

    useEffect(() => {
        
        if(isDoando == true){
            setStatus('Doando')
            console.log(status)
        } else if(isRecebendo == true) {
            setStatus('Recebendo')
            console.log(status)
        }
    });

    useEffect(() => {
        fetchUserName();
    },[teste])

    const fetchUserName = async () => {
     
        const q = query(collection(db, 'Usuários'), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);

        const getInfos = querySnapshot.forEach(doc => {
            if(doc.data().tipoUser = "userFisico") {
                setNomeCompleto(doc.data().nome +" "+ doc.data().sobrenome)
            } else {
                console.log(doc.data().userId, " => ", doc.data()); 
            }
            })
            return getInfos;
        }

    const Publicar = async () =>{

        setTeste(true)
        
        try {
            const docRef = await addDoc(collection(db, "posts"), {
              tipoAjuda: tipoAjuda,
              sobreVoce: sobreVoce,
              status: status,
              nomeUser: nomeCompleto,
              userId: user.uid,
              imgUser: imagePerfil
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
        });

        if (!result.cancelled) {
            setImage(oldArray => [...oldArray, result.uri]);
    };
}


 return (
   <View style={styles.container}>

    <ScrollView contentContainerStyle={{alignItems:'center',width:'100%'}}>

        <TouchableOpacity style={styles.containerFoto} onPress={(() =>  navigation.navigate('MeuPerfil'))}>
            <Image style={styles.fotoPerfil} source={{uri: imagePerfil}}/>
        </TouchableOpacity>

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
       {/* <Image source={{uri: 'https://static.thenounproject.com/png/3322766-200.png'}} style={styles.imgPickerImage}/> */}
       <MaterialCommunityIcons 
        name="file-image-plus" 
        size={55} 
        color='#0e52b2'
         />
       <Text style={styles.imgPickerTitle}>ADICIONAR IMAGENS</Text> 
    </TouchableOpacity>
        {image && <Image source={{ uri: image[0] }} style={styles.imgPicker} />}
        {image && <Image source={{ uri: image[1] }} style={styles.imgPicker} />}
        {image && <Image source={{ uri: image[2] }} style={styles.imgPicker} />}
    </View>

    <TouchableOpacity style={styles.btnPublicar} onPress={Publicar}>
        <Text style={styles.btnPublicarTexto}>PUBLICAR</Text>
    </TouchableOpacity>

    </ScrollView>
   </View>
  );
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: '100%',
        backgroundColor: '#fff'
    },
    containerFoto:{
        width: 65,
        height: 65,
        alignItems: 'center',
        alignSelf: 'flex-end',
        borderWidth: 2,
        borderRadius: 60,
        borderColor: '#0e52B2',
        borderStyle: 'solid',
        marginBottom: 10,
        marginTop: 15,  
        marginRight:30,
    },
    fotoPerfil:{
        height: '100%',
        width: '100%',
        borderRadius: 60,
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
        marginBottom:15,
    },
    btnPublicarTexto:{
        fontSize: 25,
        fontWeight: '800',
        textAlign: 'center',
        color: '#fff'
    },
})