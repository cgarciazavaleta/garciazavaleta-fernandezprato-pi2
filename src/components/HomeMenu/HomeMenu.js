import React from "react";
import {View, Text, Pressable} from 'react-native'
import Home from "../../screens/Home/Home";
import Perfil from "../../screens/MiPerfil/MiPerfil";
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Publicar from "../../screens/Publicar/Publicar";
import StackMenu from "../StackMenu/StackMenu";
const Tab = createBottomTabNavigator()

function HomeMenu(props){
    return(
        <Tab.Navigator>
            <Tab.Screen name="StackMenu" component={StackMenu} 
            options= {{tabBarIcon: () => <Entypo name="home" size={24} color="black" />, headerShown: false, tabBarShowLabel: false}}
            />
            <Tab.Screen name="Publicar" component={ Publicar }
            options= {{tabBarIcon: () => <Ionicons name="add-circle" size={24} color="black" />, headerShown: false, tabBarShowLabel: false}} 
            />
            <Tab.Screen name="Perfil" component={ Perfil } screenOptions={{tabBarShowLabel:false}}
            options= {{tabBarIcon: () => <FontAwesome name="user" size={24} color="black" />, headerShown: false,tabBarShowLabel: false}}
            />
        </Tab.Navigator>
    )
}

export default HomeMenu;