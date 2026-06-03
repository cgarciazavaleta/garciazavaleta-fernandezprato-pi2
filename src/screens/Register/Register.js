import React from "react";
import {View, Text, Pressable, TextInput, StyleSheet} from 'react-native'
import { useState } from "react";


function Register(props){
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    function onSubmit () {
        auth.createUserWithEmailAndPassword(email, password)
        .then( response => {
            db.collection('users').add({
                email: email,
                userName: username,
                createdAt: Date.now()
            })
            .then(() => {
                props.navigation.navigate('Login')
            })     
        }) 
        .catch( error => {
            console.log(error)
        })
    }
    return(
        <View style={styles.container}>
            <Pressable onPress={()=> props.navigation.navigate('Login')}>
                    <Text>Ir a Login</Text>
            </Pressable>
            <View>
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
              onChangeText={text => setUsername(text) }
              value={username}
            />
             <TextInput 
              style={styles.input}
              keyboardType="default"
              placeholder="password"
              secureTextEntry={true}
              onChangeText={text => setPassword(text) }
              value={password}
            />
            <Pressable style={styles.btn} onPress={()=>onSubmit()}>
              <Text style={styles.txt}>Enter</Text>
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
        height: 20,
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
    }
});


export default Register;