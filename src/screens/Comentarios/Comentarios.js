import { View, Text, Pressable, StyleSheet, TextInput } from "react-native" 
import { auth, db } from "../../firebase/config"
import firebase from "firebase"
import { useEffect, useState } from "react"

function Comentarios(props){
    function agregarComentario(){
            if (comentario == ""){
                console.log("No puedes enviar un comentario vacio")
            }
            else {
                const nuevoComentario = {
                    autor: auth.currentUser.email,
                    texto: nuevoComentario,
                    fecha: Date.now()
                }
            db.collection("posts")
            .doc(props.id)
            .update({
               
                comentarios: firebase.firestore.FieldValue.arrayUnion(nuevoComentario)
            })
            .then(()=>{
                setComentario(""); 
            })
            }
        } 
    return(
        <View>
            <Text style={styles.autor}>Creado por: {props.data.email}</Text>
                        <Text style={styles.texto}>{props.data.descriptionPost}</Text>
                        
                        {!like? <Pressable onPress={darLike} style={styles.botonLike}>
                            <Text>❤️</Text>
                        </Pressable>:
                        <Pressable onPress={quitarLike} style={styles.botonLike}>
                            <Text>💔</Text>
                        </Pressable>}
                        <Text> {props.data.likes.length} likes</Text>
                        <Pressable>
                            <TextInput
                                style={styles.inputComentario}
                                placeholder="Nuevo comentario"
                                keyboardType="default"
                                onChangeText={texto => setComentario(texto)}
                                value={comentario}>
                            </TextInput>
                        </Pressable>
                        <Pressable onPress={agregarComentario} style={styles.botonComentar}>
                                            <Text style={styles.textoBotonComentar}>Comentar</Text>
                        </Pressable>
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
    cajaComentarios: {
        borderTopWidth: 1,           
        borderTopColor: "#eee",
        paddingTop: 10
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
    },
    inputComentario: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 4,
        padding: 5,
        margin: 10,
        height: 40
    },
    botonComentar: {
        backgroundColor: '#941f14ff',
        padding: 10,
        margin: 5,
        borderRadius: 4,
        alignItems: "center"
    },
    textoBotonComentar: {
        fontWeight: "bold"
    }
});
export default Comentarios