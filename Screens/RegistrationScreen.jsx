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
} from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function RegistrationScreen() {
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
    Alert.alert("Credentials", `${email} + ${password} + ${login}`);
    setEmail("");
    setPassword("");
    setLogin("");
  };

  return (
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
              <Image
                source={
                  image
                    ? require("../assets/img/delete.png")
                    : require("../assets/img/add.png")
                }
                style={styles.photoIcon}
              />
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
          <Text style={styles.redirectLink}>Уже есть аккаунт? Войти.</Text>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 92,
    paddingBottom: 78,
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
    marginTop: -152,
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
