import React from "react";
import {View, Text, Pressable, TextInput, StyleSheet} from 'react-native'
import { useState } from "react";
import { db, auth } from '../../firebase/config';


function Register(props){
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const[register, setRegister] = useState(false)

    function onSubmit (email, password, userName) {
        auth.createUserWithEmailAndPassword(email, password)
        .then( response => {
            db.collection('users').add({
                email: email,
                userName: userName,
                createdAt: Date.now()
            })
            .then(() => {
                props.navigation.navigate('Login')
            })   
            setRegister(true);
        }) 
        .catch( error => {
            console.log(error),
            alert(error)
        })
    }
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
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
              placeholder="user name"
              onChangeText={text => setUserName(text) }
              value={userName}
            />
             <TextInput 
              style={styles.input}
              keyboardType="default"
              placeholder="password"
              secureTextEntry={true}
              onChangeText={text => setPassword(text) }
              value={password}
            />
            <Pressable style={styles.btn} onPress={()=>onSubmit(email, password, userName)}>
              <Text style={styles.txt}>Registrarse</Text>
            </Pressable>
            <Pressable style={styles.boton} onPress={()=> props.navigation.navigate('Login')}>
                    <Text>Ya tengo cuenta</Text>
            </Pressable>
    </View>
        
    )
}
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
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
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    btn: {
        backgroundColor: "#4ea0b7",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: "#929292",
    },
    txt: {
        fontWeight: 'bold',
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
});


export default Register;