import React from "react";
import { BookList } from "./components/BookList";
import { Borrowed } from "./components/Borrowed";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BookDetail } from "./components/BookDetail";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  function StackNavigator() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Books" component={BookList} />
        <Stack.Screen name="Details" component={BookDetail} />
      </Stack.Navigator>
    );
  }

  function TabNavigator() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="BookList"
          component={StackNavigator}
          options={{
            title: "Books",
            headerShown: false,
            tabBarActiveTintColor: "#007AFF",
            tabBarInactiveTintColor: "gray",
            tabBarIcon: ({ focused, color, size }) => {
              const iconName = focused ? "book" : "book-outline";
              return <Ionicons name={iconName} color={color} size={size} />;
            },
          }}
        />
        <Tab.Screen
          name="Borrowed"
          component={Borrowed}
          options={{
            tabBarActiveTintColor: "#007AFF",
            tabBarInactiveTintColor: "gray",
            tabBarIcon: ({ focused, color, size }) => {
              const iconName = focused
                ? "alert-circle"
                : "alert-circle-outline";
              return <Ionicons name={iconName} color={color} size={size} />;
            },
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}
