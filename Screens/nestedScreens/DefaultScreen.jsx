import { useEffect, useState } from "react";
import { FlatList, Image, Text, View } from "react-native";
import { doc, onSnapshot, collection, query } from "firebase/firestore";
import { db } from "../../firebase/config";

export default function DefaultScreen({ navigation }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "posts"));
    const unsub = onSnapshot(q, (data) => {
      const fetchedPosts = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setPosts(fetchedPosts);
    });

    return () => unsub();
  }, []);

  console.log("posts", posts);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {!!posts.length && (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 16 }}>
              <Image
                source={{ uri: item.photoURL }}
                style={{ width: 300, height: 250 }}
              />
              <Text>{item.postName}</Text>
              <Text
                onPress={() => navigation.navigate("MapScreen", item.location)}
              >
                {item.locationDesc}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}
