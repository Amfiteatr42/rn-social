import { Text, View, StyleSheet, TextInput, Pressable } from "react-native";

export default function CreatePostsScreen({ navigation }) {
  return (
    <View style={s.container}>
      <View>
        <View style={s.cameraView}></View>
        <Text style={s.cameraText}>Загрузите фото</Text>
      </View>
      <TextInput style={s.postName} placeholder="Название..." />
      <TextInput style={s.postName} placeholder="Местность..." />
      <Pressable style={s.postBtn}>
        <Text style={s.postBtnTitle}>Опубликовать</Text>
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    paddingTop: 32,
  },
  cameraView: {
    height: 240,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E8E8",
    marginBottom: 8,
  },
  cameraText: {
    color: "#BDBDBD",
    fontSize: 16,
    fontFamily: "Roboto400",
    marginBottom: 32,
  },
  postName: {
    color: "#BDBDBD",
    fontSize: 16,
    fontFamily: "Roboto400",
    marginBottom: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  postBtn: {
    height: 50,
    marginTop: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  postBtnTitle: {
    color: "#fff",
    fontFamily: "Roboto400",
  },
});
