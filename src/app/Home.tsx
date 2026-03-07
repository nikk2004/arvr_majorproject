import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function Home() {
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setRole(userData.role);
      }
    };
    fetchUser();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {role === "admin" ? (
        <Text>Welcome Admin 🚀</Text>
      ) : (
        <Text>Welcome Student 🎓</Text>
      )}

      <Button
        title="Logout"
        onPress={async () => {
          await AsyncStorage.removeItem("user");
          router.replace("/login");
        }}
      />
    </View>
  );
}
