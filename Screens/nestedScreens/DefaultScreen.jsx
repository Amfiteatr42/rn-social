import { useEffect, useState } from "react";
import { FlatList, Image, View } from "react-native";

export default function DefaultScreen({ route }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prev) => [...prev, route.params]);
    }
  }, [route.params]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <FlatList
        data={posts}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 16 }}>
            <Image
              source={{ uri: item.photo }}
              style={{ width: 300, height: 250 }}
            />
          </View>
        )}
      />
    </View>
  );
}
