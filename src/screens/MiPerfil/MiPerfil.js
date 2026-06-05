import React, { useEffect, useState } from "react";
import {View, Text, Pressable, StyleSheet, FlatList} from 'react-native'
import { auth, db } from "../../firebase/config";
import Post from "../../components/Posts/Posts";

function Perfil(props){
    const[misPosts,setMisPosts]= useState([])

    useEffect(()=>{
        db.collection("posts")
        .where("email", "==", auth.currentUser.email)
        .onSnapshot(docs => {
            let posts = []
            docs.forEach(doc => {
                posts.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            setMisPosts(posts)
        })
    },[])

   function logout(){
    auth.signOut()
    .then(()=>{
            props.navigation.navigate("Login")
        })
   }

    return(
        <View style={styles.container}>
            <Text>{auth.currentUser.userName}</Text>
            <Text style={styles.nombre}>{auth.currentUser.email}</Text>
            <FlatList
                data={misPosts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.cajaPost}>
                        <Text style={styles.autor}>{item.data.email}</Text>
                        <Text style={styles.texto}>{item.data.descriptionPost}</Text>
                    </View>
                )}
           />
           <Pressable style={styles.botonLogout} onPress={logout}>
                <Text style={styles.textoBoton}>Desloguearse</Text>
            </Pressable>
        </View>
    )
}
const styles = StyleSheet.create({
        container: {
        paddingHorizontal: 10,
        marginTop: 20,
    },
    cajaPost: {
        borderWidth: 1,         
        borderColor: "#ccc",    
        padding: 10,             
        marginBottom: 20,        
        borderRadius: 5,         
        backgroundColor: "#fff"  
    },
    texto: {
        fontSize: 16,
        marginBottom: 10       
    },
    autor: {
        fontWeight: "bold",      
        color: "gray",
        marginBottom: 10       
    },
    nombre: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    botonLogout: {
        backgroundColor: "#75bed2",
        padding: 10,
        margin: 5,
        borderRadius: 4,
        alignItems: "center"
    },
    textoBoton: {
        fontWeight: "bold"
    }
});

export default Perfil;