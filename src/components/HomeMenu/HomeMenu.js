import React from "react";
import {View, Text, Pressable} from 'react-native'
import Home from "../../screens/Home/Home";
import Perfil from "../../screens/MiPerfil/MiPerfil";
import Posteo from "../../screens/NuevoPosteo/NuevoPosteo";
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator()

function HomeMenu(){
    return(
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} 
            options= {
                {tabBarIcon: () => <Entypo name="home" size={24} color="black" />}
            }
            />
            <Tab.Screen name="Publicar" component={ Posteo }
            options= {
                {tabBarIcon: () => <Ionicons name="add-circle" size={24} color="black" />}
            } />
            <Tab.Screen name="Perfil" component={ Perfil } 
            options= {
                {tabBarIcon: () => <FontAwesome name="user" size={24} color="black" />}
            }
            />
        </Tab.Navigator>
    )
}

export default HomeMenu;