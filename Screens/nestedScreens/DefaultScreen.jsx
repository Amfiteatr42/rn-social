import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  onSnapshot,
  collection,
  query,
  getCountFromServer,
} from "firebase/firestore";
import { auth, db } from "../../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import Feather from "react-native-vector-icons/Feather";

export default function DefaultScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const q = query(collection(db, "posts"));
    const unsub = onSnapshot(q, async (data) => {
      const fetchedPosts = await Promise.all(
        data.docs.map(async (doc) => {
          const commentsQ = query(collection(db, "posts", doc.id, "comments"));
          const snapshot = await getCountFromServer(commentsQ);
          const commentsCount = snapshot.data().count;

          return {
            ...doc.data(),
            id: doc.id,
            commentsCount,
          };
        })
      );

      setPosts(fetchedPosts);
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userInfo = {
          name: user.displayName,
          avatar: user.photoURL,
          email: user.email,
        };
        setUserData(userInfo);
      } else {
        setUserData(null);
      }
    });
  }, []);

  return (
    <View style={s.container}>
      <View style={s.userInfo}>
        <Image source={{ uri: userData.avatar }} style={s.avatar} />
        <View>
          <Text style={s.name}>{userData.name}</Text>
          <Text style={s.email}>{userData.email}</Text>
        </View>
      </View>
      {!!posts.length && (
        <FlatList
          data={posts}
          keyExtractor={(item, idx) => idx}
          renderItem={({ item }) => (
            <View style={s.post}>
              <Image source={{ uri: item.photoURL }} style={s.postImg} />
              <Text style={s.title}>{item.postName}</Text>
              <View style={s.descrContainer}>
                <Pressable
                  style={s.commentsBtn}
                  onPress={() =>
                    navigation.navigate("CommentsScreen", {
                      postId: item.id,
                      imgURL: item.photoURL,
                      avatarURL: userData.avatar,
                    })
                  }
                >
                  <Feather name="message-circle" color={"#BDBDBD"} size={24} />
                  <Text style={s.commentsCount}>{item.commentsCount}</Text>
                </Pressable>
                <View>
                  <View style={{ flexDirection: "row" }}>
                    <Feather name="map-pin" color={"#BDBDBD"} size={24} />
                    <Text
                      style={s.location}
                      onPress={() =>
                        navigation.navigate("MapScreen", item.location)
                      }
                    >
                      {item.locationDesc}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    backgroundColor: "#fff",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 16,
    marginRight: 8,
  },
  name: {
    fontFamily: "Roboto500",
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
  },
  email: {
    fontFamily: "Roboto400",
    fontSize: 11,
    lineHeight: 13,
    color: "#212121CC",
  },
  post: {
    marginBottom: 32,
    borderRadius: 8,
  },
  postImg: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    fontFamily: "Roboto500",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    marginBottom: 8,
  },
  location: {
    fontFamily: "Roboto400",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    textDecorationLine: "underline",
    marginLeft: 3,
  },
  descrContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  commentsCount: {
    marginLeft: 6,
    color: "#BDBDBD",
    fontFamily: "Roboto400",
    fontSize: 16,
    lineHeight: 19,
  },
  commentsBtn: {
    flexDirection: "row",
    alignItems: "center",
  },
});
