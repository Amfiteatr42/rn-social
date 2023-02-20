import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
import Feather from "react-native-vector-icons/Feather";

export default function ProfileScreen({ navigation }) {
  const image = false;
  function logOut() {
    navigation.navigate("Login");
  }

  return (
    <ImageBackground
      source={require("../assets/img/PhotoBG.png")}
      style={s.bgImage}
    >
      <View style={s.container}>
        <Pressable onPress={logOut} style={s.logOut}>
          <Feather name="log-out" color={"#BDBDBD"} size={24} />
        </Pressable>
        <View style={{ alignItems: "center" }}>
          <Pressable style={s.pickImageBtn}>
            {image && <Image source={{ uri: image }} style={s.photoImg} />}
            <Svg
              width={25}
              height={25}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                ...s.photoIcon,
                transform: image ? [{ rotate: "45deg" }] : [{ rotate: "0deg" }],
              }}
              viewBox="0 0 25 25"
            >
              <Circle
                cx={12.5}
                cy={12.5}
                r={12}
                fill="#fff"
                stroke={image ? "#E8E8E8" : "#FF6C00"}
              />
              <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13 6h-1v6H6v1h6v6h1v-6h6v-1h-6V6Z"
                fill={image ? "#E8E8E8" : "#FF6C00"}
              />
            </Svg>
          </Pressable>
        </View>
        <Text style={s.userName}>Teemo</Text>
      </View>
    </ImageBackground>
  );
}

const s = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: 300,
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
});
