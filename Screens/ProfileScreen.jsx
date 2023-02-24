import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { logout } from "../redux/auth/authOperations";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { auth, db } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import { storage } from "../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import Svg, { Circle, Path } from "react-native-svg";
import Feather from "react-native-vector-icons/Feather";
import { onSnapshot, collection, query, where } from "firebase/firestore";

export default function ProfileScreen({ navigation }) {
  const [userData, setUserData] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userInfo = {
          name: user.displayName,
          avatar: user.photoURL,
          email: user.email,
          userId: user.uid,
        };
        setUserData(userInfo);
      } else {
        setUserData(null);
      }
    });
  }, []);

  useEffect(() => {
    if (userData.userId) {
      const q = query(
        collection(db, "posts"),
        where("userId", "==", userData.userId)
      );
      const unsub = onSnapshot(q, (data) => {
        const fetchedPosts = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setUserPosts(fetchedPosts);
      });
    }
  }, [userData]);

  async function updateAvatar() {
    if (userData?.avatar) {
      await updateProfile(auth.currentUser, {
        photoURL: "",
      });

      setUserData((prev) => ({ ...prev, avatar: "" }));
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imageLocal = result.assets[0].uri;

      const file = await (await fetch(imageLocal)).blob();
      const postId = Date.now().toString();
      const storageRef = ref(storage, `userAvatars/${postId}`);

      await uploadBytes(storageRef, file);
      const photoURL = await getDownloadURL(storageRef);
      await updateProfile(auth.currentUser, { photoURL });

      setUserData((prev) => ({ ...prev, avatar: photoURL }));
    }
  }

  function onLogOut() {
    dispatch(logout());
  }

  return (
    <ImageBackground
      source={require("../assets/img/PhotoBG.png")}
      style={s.bgImage}
    >
      <View style={s.container}>
        <Pressable onPress={onLogOut} style={s.logOut}>
          <Feather name="log-out" color={"#BDBDBD"} size={24} />
        </Pressable>
        <View style={{ alignItems: "center" }}>
          <Pressable style={s.pickImageBtn} onPress={updateAvatar}>
            {userData?.avatar && (
              <Image source={{ uri: userData.avatar }} style={s.photoImg} />
            )}
            <Svg
              width={25}
              height={25}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                ...s.photoIcon,
                transform: userData?.avatar
                  ? [{ rotate: "45deg" }]
                  : [{ rotate: "0deg" }],
              }}
              viewBox="0 0 25 25"
            >
              <Circle
                cx={12.5}
                cy={12.5}
                r={12}
                fill="#fff"
                stroke={userData?.avatar ? "#E8E8E8" : "#FF6C00"}
              />
              <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13 6h-1v6H6v1h6v6h1v-6h6v-1h-6V6Z"
                fill={userData?.avatar ? "#E8E8E8" : "#FF6C00"}
              />
            </Svg>
          </Pressable>
        </View>
        <Text style={s.userName}>{userData.name}</Text>

        {!!userPosts.length && (
          <FlatList
            data={userPosts}
            keyExtractor={(item, idx) => item.id}
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
                    <Feather
                      name="message-circle"
                      color={"#BDBDBD"}
                      size={24}
                    />
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
    </ImageBackground>
  );
}

const s = StyleSheet.create({
  container: {
    marginTop: 148,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  bgImage: {
    flex: 1,
    justifyContent: "flex-end",
    position: "absolute",
    resizeMode: "cover",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    paddingTop: 147,
  },
  pickImageBtn: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    marginTop: -60,
    marginBottom: 32,
  },
  photoIcon: {
    width: 25,
    height: 25,
    position: "absolute",
    right: -12,
    bottom: 14,
  },
  photoImg: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  userName: {
    marginBottom: 32,
    fontFamily: "Roboto500",
    textAlign: "center",
    color: "#212121",
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.01,
  },
  logOut: {
    position: "absolute",
    right: 16,
    top: 22,
  },
  post: {
    marginBottom: 32,
    borderRadius: 8,
    paddingHorizontal: 16,
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
