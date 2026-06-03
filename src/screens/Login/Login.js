import React from "react";
import {View, Text, Pressable, TextInput, StyleSheet} from 'react-native'
import { useState } from "react";


function Login(props){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return(
         <View style={styles.container}>
            <View>
                <Pressable onPress={()=> props.navigation.navigate('Register')}>
                    <Text>Ir a Registrarse</Text>
                </Pressable>
            </View>
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

export default Login;