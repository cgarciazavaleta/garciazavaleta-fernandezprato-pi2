import React from "react";
import {View, Text, Pressable, TextInput, StyleSheet} from 'react-native'
import { useState, useEffect } from "react";
import { auth } from '../../firebase/config';


function Login(props){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const[login,setLogin] = useState([])
    const [loginError, setLoginError] = useState("");

    useEffect(()=>{
        auth.onAuthStateChanged(user  =>{
            if(user){
                props.navigation.navigate("HomeMenu")
            }
        })
    }, [])

    function onSubmit(email, password){
        if(!email.includes("@")){
            setLoginError("Email mal formateado")
        }
        if (password.length< 6){
            setLoginError("La password debe tener una longitud minima de 6 caracteres")
        }
        auth.signInWithEmailAndPassword(email, password)
        .then((response)=> {
            setLogin(true)
            props.navigation.navigate("HomeMenu")
        })
        .catch(error => {
            alert("Credenciales invalidas")
        })

    }

    return(
        <View>
         <Text style={styles.title}>Login</Text>
         <View style={styles.container}>
                <TextInput 
                    style={styles.input}
                    keyboardType="email-adress"
                    placeholder="email"
                    onChangeText={text => setEmail(text) }
                    value={email}
                />
                <TextInput 
                    style={styles.input}
                    keyboardType="default"
                    placeholder="password"
                    secureTextEntry={true}
                    onChangeText={text => setPassword(text) }
                    value={password}
                />
                <Pressable style={styles.btn} onPress={()=>onSubmit(email, password)}>
                    <Text style={styles.txt}>Iniciar Sesion</Text>
                </Pressable>
                   <Pressable style={styles.boton} onPress={()=> props.navigation.navigate('Register')}>
                    <Text>Ir a Registrarse</Text>
                </Pressable>
        </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        marginTop: 20
    },
    input: {
        height: 45,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical: 10
    },
    btn: {
        backgroundColor: '#941f14ff',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#28a745'
    },
    txt: {
        color: '#fff',
        textAlign: 'center'
    },
    boton:{
        width:125,
        paddingVertical:3,
        paddingBottom:6,
        alignSelf: "center",
        alignItems:"center",
        borderWidth: 2,
        borderColor: "#ccc",
        borderStyle: "solid",
        borderRadius: 6,
        marginVertical: 10,
        backgroundColor: '#dddddddd',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        margin: 10,
    }
});

export default Login;