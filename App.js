import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import RegistrationScreen from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";
import Home from "./Screens/Home";

SplashScreen.preventAutoHideAsync();
const { Navigator, Screen } = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto400: require("./assets/fonts/Roboto-Regular.ttf"),
    Roboto500: require("./assets/fonts/Roboto-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <NavigationContainer>
          <Navigator
            initialRouteName="Login"
            screenOptions={{ headerShown: false }}
          >
            <Screen name="Registration" component={RegistrationScreen} />
            <Screen name="Login" component={LoginScreen} />
            <Screen
              name="Home"
              component={Home}
              options={{ headerBackVisible: true }}
            />
          </Navigator>
        </NavigationContainer>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
