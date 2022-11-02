import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';


import Entrar from '../pages/Entrar/Entrar';
import LoginCadastro from '../pages/LoginCadastro/loginCadastro';
import Login from '../pages/Login/Login';
import Home from '../pages/Home/index';
import RecuperarSenha from '../pages/RecuperarSenha/index';
import EscolherTipoCadastro from '../pages/EscolherTipoCadastro/';
import Exemplo from '../pages/Exemplos/index';
import MapaSolidariedade from '../pages/MapaSolidariedade';
import DentroMapa from '../pages/DentroMapa';
import MensagensTelas from '../pages/MensagensTela';
import Mensagem from '../pages/Mensagem';
import Publicar from '../pages/Publicar';
import MeuPerfil from '../pages/MeuPerfil';
import MinhasPubs from '../pages/minhaPubs';
import Instituicoes from '../pages/Instituicoes/instituicoes';
import InstituiçoesDetalhes from '../pages/instituiçãoDestalhe/instDetalhes';
import Notificacao from '../pages/Notificações/notificações';
import CadastroFisi from '../pages/CadastroFisi/CadastroFisi';
import CadastroFisi2 from '../pages/CadastroFisi2/CadastroFisi2';
import CadastroInst1 from '../pages/CadastroInst1/CadastroInst1';
import CadastroInst2 from '../pages/CadastroInst2/CadastroInst2';
import AdicionarFoto from '../pages/AdicionarFoto/AdicionarFoto';
import SobreApp from '../pages/SobreApp/Index';
import Configurações from '../pages/Configuracoes/index';
import AdicionarFotoFis from '../pages/AdicionarFotoFis/AdicionarFotoFis';
import Noticias from '../pages/Noticias';
import EditarPerfilUserFis from '../pages/EditarPerfilUserFis';
import EditarPerfilUserInst1 from '../pages/EditarPerfilUserInst1';
import EditarInformacoesInst from '../pages/EditarInformacoesInst';
import EditarPost from '../pages/EditarPost'
import InfoPostFisi from '../pages/InfoPostFisi';
import InfoPostInst from '../pages/InfoPostInst';
import EditarInformacoesFis from '../pages/EditarInformacoesFis';

import { getAuth } from "firebase/auth";
import { getDocs, query, collection, where } from "firebase/firestore";
import db from '../../src/config/configFirebase';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function TabBar({ navigation }) {

    const [image, setImage] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");

    const [nomeCompleto, setNomeCompleto] = useState();

    async function ShowUserInfos() {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user !== null) {
            setImage(user.photoURL);

            const uid = user.uid;

            const q = query(collection(db, 'Usuários'), where("userId", "==", uid));
            const querySnapshot = await getDocs(q);

            const getInfos = querySnapshot.forEach(doc => {
                if (doc.data().tipoUser = "userFisico") {
                    setNomeCompleto(user.displayName)
                    console.log(doc.data().userId, " => ", doc.data());
                } else {
                    console.log(doc.data().userId, " => ", doc.data());
                    setNomeCompleto(doc.data().nome)
                }
            })
            return getInfos;
        }
    }
    useEffect(() => {
        //fetch infos sobre users
        ShowUserInfos();
    });

    return (
        <Tabs.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarInactiveTintColor: '#fff',
                tabBarActiveTintColor: '#38B6FF',
                tabBarStyle: {
                    paddingBottom: 5,
                    paddingTop: 5,
                    backgroundColor: '#0e52b2',
                    borderTopColor: 'transparent'
                },
                headerTintColor: '#fff',
                headerStyle: {
                    backgroundColor: '#0e52b2',
                    borderBottomColor: 'transparent',

                },
            }}
        >
            <Tabs.Screen
                name='TelaHome'
                component={Home}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                    title: 'HOME',
                    headerTitle: nomeCompleto,
                    headerShown: true,
                    headerLeft: () => (
                        <TouchableOpacity style={{ marginLeft: 10, width: 60, height: 60, justifyContent: 'center' }} onPress={() => navigation.navigate('MeuPerfil')} >
                            {image && <Image source={{ uri: image }} style={styles.fotoPerfil} />}
                        </TouchableOpacity>
                    ),
                    headerTitleStyle: {
                        fontWeight: '900',
                        fontSize: 20
                    }
                }}
            />
            <Tabs.Screen
                name='Noticações'
                component={Notificacao}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Ionicons name="notifications-sharp" size={size} color={color} />
                    ),
                    headerShown: false
                }}
            />
            <Tabs.Screen
                name='CreatePost'
                component={Publicar}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <FontAwesome5 name="plus" size={35} color={color} />
                    ),
                    headerShown: false
                }}
            />
            <Tabs.Screen
                name='Locate'
                component={MapaSolidariedade}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Ionicons name="location-sharp" size={size} color={color} />
                    ),
                    headerShown: false
                }}
            />
            <Tabs.Screen
                name='Chat'
                component={MensagensTelas}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Ionicons name="chatbubble-sharp" size={size} color={color} />
                    ),
                    headerShown: false
                }}
            />
        </Tabs.Navigator>
    )
}

export default function Routes({ navigation }) {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Entrar'>
                <Stack.Screen
                    name="Home"
                    component={TabBar}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Entrar"
                    component={Entrar}
                    options={{
                        headerShown: false,
                        title: 'Bem Vindo'
                    }}
                />
                <Stack.Screen
                    name="LoginCadastro"
                    component={LoginCadastro}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="RecuperarSenha"
                    component={RecuperarSenha}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="EscolherTipoCadastro"
                    component={EscolherTipoCadastro}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="DentroMapa"
                    component={DentroMapa}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Mensagem"
                    component={Mensagem}
                    options={({ route }) => ({ title: route.params.nome })}
                />
                <Stack.Screen
                    name="MeuPerfil"
                    component={MeuPerfil}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name='Noticias'
                    component={Noticias}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="minhasPubs"
                    component={MinhasPubs}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="instituicoes"
                    component={Instituicoes}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="InstituiçãoDetalhe"
                    component={InstituiçoesDetalhes}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="CadastroFisi"
                    component={CadastroFisi}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="CadastroFisi2"
                    component={CadastroFisi2}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="AdicionarFotoFis"
                    component={AdicionarFotoFis}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="AdicionarFoto"
                    component={AdicionarFoto}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="CadastroInst1"
                    component={CadastroInst1}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="CadastroInst2"
                    component={CadastroInst2}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="SobreApp"
                    component={SobreApp}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Configurações"
                    component={Configurações}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="EditarPerfilUserFis"
                    component={EditarPerfilUserFis}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="EditarPerfilUserInst1"
                    component={EditarPerfilUserInst1}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="EditarInformacoesInst"
                    component={EditarInformacoesInst}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="InfoPostFisi"
                    component={InfoPostFisi}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="InfoPostInst"
                    component={InfoPostInst}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="EditarPost"
                    component={EditarPost}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="EditarInformacoesFis"
                    component={EditarInformacoesFis}
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}


const styles = StyleSheet.create({
    fotoPerfil: {
        height: '90%',
        width: '90%',
        borderRadius: 60,
        borderWidth: 2,
        borderColor: '#ffff',
    },
})