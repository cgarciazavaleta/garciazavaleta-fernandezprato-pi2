import React from "react";
import {View, Text, Pressable, StyleSheet, TextInput} from 'react-native'
import { auth, db } from "../../firebase/config"
import { useState } from "react"
import Home from "../Home/Home";

function Publicar(props){
    const[descriptionPost,setDescriptionPost]= useState("")

    function crearPost(){
        db.collection("posts").add({
            descriptionPost: descriptionPost,
            email: auth.currentUser.email,
            likes: [],
            createdAt: Date.now(),
        })
        .then((response)=>{
            setDescriptionPost(""),
            props.navigation.navigate('StackMenu',{screen: "Home"})
        })
        .catch(error =>{console.log(error)})
    }
    return(
    <View style={styles.container}>
        <Text style={styles.title}>Crear nuevo post</Text>
        <TextInput
        style={styles.input}
        placeholder="Escribe aqui tu comentario"
        onChangeText={text => setDescriptionPost(text)}
        value={descriptionPost}/>

        <Pressable style={styles.botonForm}onPress={crearPost}>
            <Text style={styles.textForm}>Publicar Post</Text>
        </Pressable>
    </View>
    )
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:"#eee",
        padding:10,
        margin:10,
    },
    title:{
        fontSize: 30,
        marginBottom:10,
        fontWeight:"bold",
    },
    textForm:{
        fontWeight:"bold",
    },
    botonForm:{
        backgroundColor: "#75bed2",
        padding: 10,
        alignItems: "center",
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: "solid",
    },
    input:{
        height: 80,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderStyle: "solid",
        borderRadius: 6,
        marginVertical: 10, 
    }
})
export default Publicar;