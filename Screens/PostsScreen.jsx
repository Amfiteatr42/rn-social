import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CommentsScreen from "./nestedScreens/CommentsScreen";
import DefaultScreen from "./nestedScreens/DefaultScreen";
import MapScreen from "./nestedScreens/MapScreen";
import { Pressable, StyleSheet } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { logout } from "../redux/auth/authOperations";
import { useDispatch } from "react-redux";

const PostsNav = createNativeStackNavigator();

export default function PostsScreen({ route, navigation }) {
  const dispatch = useDispatch();

  function onLogOut() {
    dispatch(logout());
  }

  return (
    <PostsNav.Navigator
      initialRouteName="DefaultScreen"
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: s.globalHeader,
        headerTitleStyle: s.headerTitle,
      }}
    >
      <PostsNav.Screen
        name="DefaultScreen"
        component={DefaultScreen}
        options={{
          headerTitle: "Публикации",

          headerRight: () => (
            <Pressable onPress={onLogOut} style={{ marginRight: 16 }}>
              <Feather name="log-out" color={"#BDBDBD"} size={24} />
            </Pressable>
          ),
        }}
      />
      <PostsNav.Screen
        name="CommentsScreen"
        component={CommentsScreen}
        options={{
          headerTitle: "Комментарии",
        }}
      />
      <PostsNav.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          headerTitle: "Локация",
        }}
      />
    </PostsNav.Navigator>
  );
}

const s = StyleSheet.create({
  headerTitle: {
    fontFamily: "Roboto500",
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.4,
    color: "#212121",
  },
  globalHeader: {
    height: 88,
    shadowOffset: "0px 0.5px 0px ",
    shadowColor: "rgba(0, 0, 0, 0.3)",
    borderBottomColor: "#BDBDBD",
    borderBottomWidth: 1,
  },
});
