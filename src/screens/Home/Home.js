import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { db } from "../../firebase/config";
import Post from "../../components/Posts/Posts";

function Home(props) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(
            docs => {
                let postsAux = [];
                docs.forEach(doc => {
                    postsAux.push({
                        id: doc.id,
                        data: doc.data()
                    });
                });
                setPosts(postsAux);
            }
        );
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Posteos</Text>
            <FlatList
                data={posts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Post data={item.data} id={item.id} navigation={props.navigation} />
                )}
           />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        marginTop: 20,
        flex: 1
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    }
});

export default Home;