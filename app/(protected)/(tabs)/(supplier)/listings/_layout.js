// screens/supplier/listings/_layout.js
import { Stack } from "expo-router";
import { ListingsProvider } from "../../../../../context/ListingsContext";
const ListingsLayout = () => {
  return (
    <ListingsProvider>
      <Stack screenOptions={{ statusBarStyle: "dark" }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="[id]"
          options={{
            headerShown: true,
            headerTransparent: true,
            headerTintColor: "white",
            animation: "slide_from_right",
          }}
        />
      </Stack>
    </ListingsProvider>
  );
};

export default ListingsLayout;
