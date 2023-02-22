import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import { Camera } from "expo-camera";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import * as MediaLibrary from "expo-media-library";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase/config";

export default function CreatePostsScreen({ navigation }) {
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState("");
  const [permission, requestCameraPermission] = Camera.useCameraPermissions();
  const [status, requestLocationPermission] =
    Location.useForegroundPermissions();

  useEffect(() => {
    (async () => {
      await MediaLibrary.requestPermissionsAsync();
      await Location.requestForegroundPermissionsAsync();
    })();
  }, []);

  if (!permission || !status) {
    return <View />;
  }

  if (!permission.granted || !status.granted) {
    return (
      <View style={s.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera and location
        </Text>
        <Text onPress={getCameraAndLocationPermissions}>Set permission</Text>
      </View>
    );
  }

  function getCameraAndLocationPermissions() {
    requestCameraPermission();
    requestLocationPermission();
  }

  async function makePhoto() {
    if (cameraRef) {
      const { coords } = await Location.getCurrentPositionAsync({});
      const { uri } = await cameraRef.takePictureAsync();
      setPhoto(uri);
      await MediaLibrary.createAssetAsync(uri);
      console.log(coords);
    }
  }

  async function sendPost() {
    const file = await (await fetch(photo)).blob();
    const postId = Date.now().toString();
    const storageRef = ref(storage, `postImages/${postId}`);

    uploadBytes(storageRef, file);

    navigation.navigate("DefaultScreen", { photo });
  }

  return (
    <View style={s.container}>
      <View>
        {photo ? (
          <Image source={{ uri: photo }} style={s.cameraView} />
        ) : (
          <Camera style={s.cameraView} ref={setCameraRef}>
            <Pressable style={s.cameraBtn} onPress={makePhoto}>
              <FontAwesome5 name="camera" size={24} color={"#fff"} />
            </Pressable>
          </Camera>
        )}

        <Text style={s.cameraText} onPress={() => !!photo && setPhoto("")}>
          {photo ? "Редактировать фото" : "Загрузите фото"}
        </Text>
      </View>
      <TextInput style={s.postName} placeholder="Название..." />
      <TextInput style={s.postName} placeholder="Местность..." />
      <Pressable style={s.postBtn}>
        <Text style={s.postBtnTitle} onPress={sendPost}>
          Опубликовать
        </Text>
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
    alignItems: "center",
    justifyContent: "center",
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
  cameraBtn: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "#FFFFFF4D",
    justifyContent: "center",
    alignItems: "center",
  },
});
