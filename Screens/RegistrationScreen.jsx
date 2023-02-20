import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Alert,
  Pressable,
  Text,
  Image,
  ImageBackground,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Svg, { Circle, Path } from "react-native-svg";

export default function RegistrationScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordHide, setPasswordHide] = useState(true);
  const [isKeyboadShow, setIsKeyboadShow] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setIsKeyboadShow(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setIsKeyboadShow(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const emailHandler = (text) => setEmail(text);
  const passwordHandler = (text) => setPassword(text);
  const loginHandler = (text) => setLogin(text);

  const pickImage = async () => {
    console.log("alsdjasldj");
    if (image) {
      setImage(null);
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onRegistry = () => {
    setEmail("");
    setPassword("");
    setLogin("");

    navigation.navigate("Home");
  };

  return (
    <ImageBackground
      source={require("../assets/img/PhotoBG.png")}
      style={styles.bgImage}
    >
      <View
        style={{ ...styles.container, marginBottom: isKeyboadShow ? -180 : 0 }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <View style={styles.inputBox}>
            <View style={{ alignItems: "center" }}>
              <Pressable onPress={pickImage} style={styles.pickImageBtn}>
                {image && (
                  <Image source={{ uri: image }} style={styles.photoImg} />
                )}
                <Svg
                  width={25}
                  height={25}
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    ...styles.photoIcon,
                    transform: image
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
            <Text style={styles.title}>Регистрация</Text>

            <TextInput
              value={login}
              onChangeText={loginHandler}
              placeholder="Логин"
              style={styles.input}
              onFocus={() => setIsKeyboadShow(true)}
            />
            <TextInput
              value={email}
              onChangeText={emailHandler}
              placeholder="Адрес электронной почты"
              style={styles.input}
              keyboardType={"email-address"}
            />
            <View style={styles.passBox}>
              <TextInput
                value={password}
                onChangeText={passwordHandler}
                placeholder="Пароль"
                secureTextEntry={passwordHide}
                style={styles.input}
              />
              <Pressable
                onPress={() => setPasswordHide(!passwordHide)}
                style={styles.passShowBtn}
              >
                <Text style={styles.passShowText}>
                  {passwordHide ? "Показать" : "Скрыть"}
                </Text>
              </Pressable>
            </View>

            <Pressable onPress={onRegistry} style={styles.button}>
              <Text style={styles.btnTitle}>Зарегистрироваться</Text>
            </Pressable>
            <Text
              onPress={() => navigation.navigate("Login")}
              style={styles.redirectLink}
            >
              Уже есть аккаунт? Войти.
            </Text>
          </View>
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingBottom: 78,
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
  },
  input: {
    fontFamily: "Roboto400",
    height: 50,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: "#F6F6F6",
  },
  title: {
    fontFamily: "Roboto500",
    marginBottom: 32,
    textAlign: "center",
    color: "#212121",
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.01,
  },
  button: {
    height: 50,
    marginTop: 27,
    marginBottom: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  inputBox: {
    marginHorizontal: 16,
  },
  btnTitle: {
    color: "#fff",
    fontFamily: "Roboto400",
  },
  passShowText: {
    color: "#1B4371",
    fontFamily: "Roboto400",
    fontSize: 16,
    lineHeight: 19,
  },
  passShowBtn: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  redirectLink: {
    fontFamily: "Roboto400",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#1B4371",
  },
  passBox: {
    position: "relative",
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
});
