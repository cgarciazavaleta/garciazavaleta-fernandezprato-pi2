import { View, Text, Pressable, StyleSheet } from "react-native" // Agregué StyleSheet acá
import { auth, db } from "../../firebase/config"
import firebase from "firebase"
import { useEffect, useState } from "react"

function Post(props){
    const[like,setLike]= useState(false)
    
    useEffect(()=>{
        if (props.data.likes.includes(auth.currentUser.email)){
            setLike(true)
        } else{
            setLike(false)
        }
    },[])

    function darLike(){
        db.collection("posts")
        .doc(props.id)
        .update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then(()=>{
            setLike(true)
        })
    }

    function quitarLike(){
        db.collection("posts")
        .doc(props.id)
        .update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(()=>{
            setLike(false)
        })
    }

    return(
        <View style={styles.cajaPost}>
            <Text style={styles.autor}>Creado por: {props.data.email}</Text>
            <Text style={styles.texto}>{props.data.descriptionPost}</Text>
            
            {!like? <Pressable onPress={darLike} style={styles.botonLike}>
                <Text>❤️</Text>
            </Pressable>:
            <Pressable onPress={quitarLike} style={styles.botonLike}>
                <Text>💔</Text>
            </Pressable>}

        </View>
    )
}

const styles = StyleSheet.create({
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
    botonLike: {
        marginTop: 5
    }
});

export default Post