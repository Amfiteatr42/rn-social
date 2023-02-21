import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PostsScreen from "./PostsScreen";
import ProfileScreen from "./ProfileScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import Feather from "react-native-vector-icons/Feather";
import { StyleSheet, View } from "react-native";

const Tab = createBottomTabNavigator();

export default function Home({ navigation }) {
  return (
    <Tab.Navigator
      initialRouteName="Posts"
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: s.globalHeader,
        headerTitleStyle: s.headerTitle,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 83,
        },
      }}
    >
      <Tab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          // headerTitle: "Публикации",
          headerShown: false,
          tabBarIcon: () => (
            <Feather name="grid" color={"#212121CC"} size={24} />
          ),
          // headerRight: () => (
          //   <Pressable onPress={logOut} style={{ marginRight: 16 }}>
          //     <Feather name="log-out" color={"#BDBDBD"} size={24} />
          //   </Pressable>
          // ),
        }}
      />
      <Tab.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={{
          title: "Создать публикацию",
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                ...s.bottomTabIcon,
                backgroundColor: focused ? "#F6F6F6" : "#FF6C00",
              }}
            >
              {focused ? (
                <Feather name="trash-2" color={"#BDBDBD"} size={24} />
              ) : (
                <Feather name="plus" color={"#fff"} size={13} />
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Feather name="user" color={"#212121CC"} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const s = StyleSheet.create({
  bottomTabIcon: {
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 40,
    borderRadius: 20,
  },
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
