import { ResizeMode, Video } from "expo-av";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

/* 🔴 IMPORTANT: CHANGE THIS IP if Expo IP changes */
const API_URL = "http://192.168.1.5:5000";

export default function Signup() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user");

  /* Animation */
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  /* ✅ SAFE SIGNUP HANDLER */
  const handleSignup = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
          role,
        }),
      });

      const text = await response.text();
      const data = text ? JSON.parse(text) : {};

      if (!response.ok) {
        Alert.alert("Signup Failed", data.message || "Server error");
        return;
      }

      Alert.alert("Success", "Signup successful! Please login.");
      router.replace("/login");
    } catch (error) {
      console.log("SIGNUP ERROR:", error);
      Alert.alert(
        "Network Error",
        "Cannot connect to server.\nMake sure backend is running."
      );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Background Video */}
      <Video
        source={require("../assets/images/videos/solarplanet.mp4")}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        isLooping
        isMuted = {true}
        style={StyleSheet.absoluteFillObject}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View style={[styles.formContainer, { opacity: fadeAnim }]}>
          <Text style={styles.title}>Create Account</Text>

          {/* Role Selection */}
          <View style={styles.roleContainer}>
            <TouchableOpacity
              style={[
                styles.roleCard,
                role === "user" && styles.selectedRole,
              ]}
              onPress={() => setRole("user")}
            >
              <Image
                source={{
                  uri: "https://img.icons8.com/ios-filled/100/ffffff/student-male.png",
                }}
                style={styles.roleIcon}
              />
              <Text style={styles.roleText}>User</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.roleCard,
                role === "admin" && styles.selectedRole,
              ]}
              onPress={() => setRole("admin")}
            >
              <Image
                source={{
                  uri: "https://img.icons8.com/ios-filled/100/ffffff/administrator-male.png",
                }}
                style={styles.roleIcon}
              />
              <Text style={styles.roleText}>Admin</Text>
            </TouchableOpacity>
          </View>

          {/* Inputs */}
          <TextInput
            placeholder="Full Name"
            placeholderTextColor="#ddd"
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
          />

          <TextInput
            placeholder="Email"
            placeholderTextColor="#ddd"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            placeholder="Password"
            placeholderTextColor="#ddd"
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor="#ddd"
            style={styles.input}
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          {/* Button */}
          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          {/* Login */}
          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text style={styles.linkText}>
              Already have an account?{" "}
              <Text style={{ color: "#4B7BEC", fontWeight: "bold" }}>
                Login
              </Text>
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

/* STYLES */
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingVertical: 40,
  },
  formContainer: {
    width: width * 0.9,
    padding: 25,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  roleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  roleCard: {
    width: "45%",
    alignItems: "center",
    padding: 15,
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  selectedRole: {
    borderColor: "#4B7BEC",
    borderWidth: 2,
  },
  roleIcon: {
    width: 50,
    height: 50,
    tintColor: "#fff",
    marginBottom: 8,
  },
  roleText: {
    color: "#fff",
    fontWeight: "600",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    color: "#fff",
  },
  button: {
    backgroundColor: "#4B7BEC",
    height: 50,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  linkText: {
    color: "#fff",
    marginTop: 18,
    textAlign: "center",
  },
});
