import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Octicons from "react-native-vector-icons/Octicons";
import { useSelector } from "react-redux";
import { db } from "../../firebase/config";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";

const month = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

function dateFormatter(seconds) {
  const date = new Date(seconds * 1000);
  const formattedDate = `${date.getDate()} ${
    month[date.getMonth()]
  }, ${date.getFullYear()} | ${date
    .getHours()
    .toString()
    .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;

  return formattedDate;
}

export default function CommentsScreen({ route }) {
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const nickname = useSelector((state) => state.auth.nickname);
  const { postId, imgURL, avatarURL } = route.params;

  useEffect(() => {
    const q = query(
      collection(db, "posts", postId, "comments"),
      orderBy("dateTime")
    );
    const unsub = onSnapshot(q, (data) => {
      const fetchedComments = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setAllComments(fetchedComments);
      Keyboard.dismiss();
    });

    return () => unsub();
  }, []);

  async function sendComment() {
    const postToUpdateRef = collection(db, "posts", postId, "comments");

    await addDoc(postToUpdateRef, {
      nickname,
      comment,
      avatarURL,
      dateTime: new Date(),
    });

    setComment("");
  }

  return (
    <View style={s.container}>
      <View style={{ flex: 1 }}>
        <Image source={{ uri: imgURL }} style={s.image} />
        <FlatList
          data={allComments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={s.commentBox}>
              <Image source={{ uri: avatarURL }} style={s.avatar} />
              <View style={s.messageBox}>
                <Text style={s.message}>{item.comment}</Text>
                <Text style={s.date}>
                  {dateFormatter(item.dateTime.seconds)}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
      <View style={{ paddingTop: 8 }}>
        <TextInput
          style={s.input}
          value={comment}
          placeholder="Комментировать..."
          placeholderTextColor={"#BDBDBD"}
          onChangeText={(text) => setComment(text)}
        />

        <Pressable style={s.sendBtn} onPress={sendComment}>
          <Octicons name="arrow-up" size={20} color="#fff" />
        </Pressable>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 16,
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
  sendBtn: {
    position: "absolute",
    right: 8,
    top: 16,
    height: 34,
    width: 34,
    backgroundColor: "#FF6C00",
    borderRadius: 34,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 50,
    padding: 16,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    fontSize: 16,
    lineHeight: 19,
  },
  commentBox: {
    flexDirection: "row",
    marginBottom: 24,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 28,
    marginRight: 16,
  },
  messageBox: {
    padding: 16,
    backgroundColor: "#00000008",
    borderRadius: 6,
    borderTopLeftRadius: 0,
  },
  message: {
    marginBottom: 8,
    color: "#212121",
    fontFamily: "Roboto400",
    fontSize: 13,
    lineHeight: 18,
  },
  date: {
    color: "#BDBDBD",
    fontFamily: "Roboto400",
    fontSize: 10,
    lineHeight: 12,
  },
});
