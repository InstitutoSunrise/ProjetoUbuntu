import React from 'react';
import { View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import Home from '../pages/Home/index';
import Exemplo from '../pages/Exemplos/index';
import Entrar from '../pages/Entrar/Entrar';
import LoginCadastro from '../pages/LoginCadastro/loginCadastro';
import Login from '../pages/Login/Login';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function tabs(){
    return(
        <Tabs.Navigator
            screenOptions={{
                tabBarShowLabel:false,
                tabBarInactiveTintColor: '#fff',
                tabBarActiveTintColor: '#38B6FF',
                tabBarStyle:{
                    paddingBottom:5,
                    paddingTop:5,
                    backgroundColor: 'rgb(14, 82, 178)',
                    borderTopColor: 'transparent'
                },
                headerTintColor: '#fff',
                headerStyle:{
                    backgroundColor: 'rgb(14, 82, 178)',
                    borderBottomColor: 'transparent',

            },
        }}
        >
            <Tabs.Screen 
            name='Home' 
            component={Home}
            options={{
                tabBarIcon:({size,color}) => (
                 <Ionicons name="home" size={size} color={color} />
                ), 
                title: 'HOME',
                headerTitle:'Maria Aparecida',
                headerShown:true,
                headerLeft: () =>(
                    <FontAwesome 
                        name="user-circle-o" 
                        size={40} 
                        color="#fff"
                        style={{marginLeft:25}}
                    />
              )
            }}
            />
            <Tabs.Screen 
            name='Exemplo' 
            component={Exemplo}
            options={{
                tabBarIcon:({size,color}) => (
                    <Ionicons name="notifications-sharp" size={size} color={color} />
                   ),
            }}
            />
            <Tabs.Screen 
            name='CreatePost' 
            component={Exemplo}
            options={{
                tabBarIcon:({size,color}) => (
                    <FontAwesome5 name="plus" size={35} color={color} />
                   ),
            }}
            />
            <Tabs.Screen 
            name='Locate' 
            component={Exemplo}
            options={{
                tabBarIcon:({size,color}) => (
                    <Ionicons name="location-sharp" size={size} color={color} />
                   ),
            }}
            />
            <Tabs.Screen 
            name='Chat' 
            component={Exemplo}
            options={{
                tabBarIcon:({size,color}) => (
                    <Ionicons name="chatbubble-sharp" size={size} color={color}/>
                   ),
            }}
            />
            
        </Tabs.Navigator>
    )
}

export default function Routes({navigation}) {
 return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Entrar'>
            <Stack.Screen 
            name="Home" 
            component={tabs} 
            options={{
                headerShown: false,
            }}
            />
            <Stack.Screen 
            name="Entrar" 
            component={Entrar} 
            options={{
                headerShown: false,
                title:'Bem Vindo'
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
                headerShown:false,
            }}
            />
        </Stack.Navigator>
    </NavigationContainer>
  );
}