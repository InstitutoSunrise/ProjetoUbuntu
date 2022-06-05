import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';


import Home from '../pages/Home/index';
import Exemplo from '../pages/Exemplos/index';


const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function tabs(){
    return(
        <Tabs.Navigator
            screenOptions={{
                tabBarShowLabel:false,
                tabBarInactiveTintColor: '#fff',
                tabBarActiveTintColor: '#fff',
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
                        size={45} 
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

export default function Routes() {
 return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen 
            name="Home" 
            component={tabs} 
            options={{
                headerShown: false,
            }}
            />
        </Stack.Navigator>
    </NavigationContainer>
  );
}