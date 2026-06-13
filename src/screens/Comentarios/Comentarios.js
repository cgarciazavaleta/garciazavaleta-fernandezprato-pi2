import { View, Text, Pressable, StyleSheet, TextInput, FlatList } from "react-native" 
import { auth, db } from "../../firebase/config"
import firebase from "firebase"
import { useEffect, useState } from "react"

function Comentarios(props){
    const id = props.route.params.id

    const[comentario,setComentario] = useState("")
    const[like,setLike]= useState(false)
    const[post,setPost]= useState([])

    useEffect(()=>{
        db.collection("posts")
        .doc(id)
        .onSnapshot(doc=>{
            setPost(doc.data())
        })
    },[])

    function agregarComentario(){
        if (comentario == ""){
            console.log("No puedes enviar un comentario vacio")
        }
        else {
            const nuevoComentario = {
                autor: auth.currentUser.email,
                texto: comentario,
                fecha: Date.now()
            }
        db.collection("posts")
        .doc(id)
        .update({
            comentarios: firebase.firestore.FieldValue.arrayUnion(nuevoComentario)
        })
        .then(()=>{
            setComentario(""); 
        })
        }
    } 

    function darLike(){
        db.collection("posts")
        .doc(id)
        .update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then(()=>{
            setLike(true)
        })
    }

    function quitarLike(){
        db.collection("posts")
        .doc(id)
        .update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(()=>{
            setLike(false)
        })
    }

    return(
        <View style={styles.container}>
            <Text style={styles.autor}>Creado por: {post.email}</Text>
            <Text style={styles.texto}>{post.descriptionPost}</Text>
            
            {!like? <Pressable onPress={darLike} style={styles.botonLike}>
                <Text>❤️</Text>
            </Pressable>:
            <Pressable onPress={quitarLike} style={styles.botonLike}>
                <Text>💔</Text>
            </Pressable>}
            <Text> {post.likes?.length} likes</Text>
            <FlatList
                data={post.comentarios}
                keyExtractor={(item) => item.id}
                renderItem={({item})=>(
                <View style={styles.container}>
                    <Text style={styles.autor}>{item.autor}</Text>
                    <Text style={styles.texto}>{item.texto}</Text>
                </View>
            )}
            />
            <TextInput
                style={styles.inputComentario}
                placeholder="Comenta el post"
                keyboardType="default"
                onChangeText={texto => setComentario(texto)}
                value={comentario}>
            </TextInput>
            <Pressable onPress={agregarComentario} style={styles.botonComentar}>
                <Text style={styles.textoBotonComentar}>Publicar comentario</Text>
            </Pressable>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        margin: 10,
        flex: 1,
        borderWidth: 1,         
        borderColor: "#ccc",    
        padding: 10,                   
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
        backgroundColor: "#75bed2",
        padding: 10,
        margin: 5,
        borderRadius: 4,
        alignItems: "center",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#929292",
    },
    textoBotonComentar: {
        fontWeight: "bold"
    }
});
export default Comentarios