import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Pressable,
  Text,
} from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordHide, setPasswordHide] = useState(true);

  const emailHandler = (text) => setEmail(text);
  const passwordHandler = (text) => setPassword(text);

  const onLogin = () => {
    Alert.alert("Credentials", `${email} + ${password}`);
    setEmail("");
    setPassword("");
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <View style={styles.inputBox}>
          <Text style={styles.title}>Войти</Text>
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

          <Pressable onPress={onLogin} style={styles.button}>
            <Text style={styles.btnTitle}>Войти</Text>
          </Pressable>
          <Text style={styles.redirectLink}>
            Нет аккаунта? Зарегистрироваться
          </Text>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    backgroundColor: "#ecf0f1",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 32,
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
});
