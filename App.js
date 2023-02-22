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
import { Provider } from "react-redux";
import { store } from "./redux/store";

SplashScreen.preventAutoHideAsync();
const MainNav = createNativeStackNavigator();

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
    <Provider store={store}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <NavigationContainer>
            <MainNav.Navigator
              initialRouteName="Login"
              screenOptions={{ headerShown: false }}
            >
              <MainNav.Screen
                name="Registration"
                component={RegistrationScreen}
              />
              <MainNav.Screen name="Login" component={LoginScreen} />
              <MainNav.Screen
                name="Home"
                component={Home}
                options={{ headerBackVisible: true }}
              />
            </MainNav.Navigator>
          </NavigationContainer>
        </TouchableWithoutFeedback>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
