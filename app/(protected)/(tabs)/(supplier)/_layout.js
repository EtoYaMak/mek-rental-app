// app\(protected)\(tabs)\(supplier)\_layout.js
import React from "react";
import { Tabs } from "expo-router";
import COLORS from "../../../../styles/COLORS";
import { AntDesign } from "@expo/vector-icons";
const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: COLORS.accentBackground,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: COLORS.secondaryBackground,
        tabBarActiveTintColor: COLORS.secondaryBackground,
        tabBarInactiveBackgroundColor: COLORS.primaryBackground,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: COLORS.accentBackground,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <AntDesign size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="listings"
        options={{
          title: "Listings",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <AntDesign size={28} name="pluscircleo" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <AntDesign size={28} name="setting" color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
