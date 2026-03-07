import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  Platform,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { Video, ResizeMode } from "expo-av";

const { width, height } = Dimensions.get("window");

export default function QuizHome() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Background Video */}
      <Video
        source={require("../assets/images/videos/galaxy.mp4")}
        rate={1.0}
        volume={0}
        isMuted
        resizeMode={ResizeMode.COVER}
        shouldPlay
        isLooping
        style={styles.videoBackground}
      />

      {/* Overlay */}
      <View style={styles.overlay} />

      {/* Content */}
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Text style={styles.title}>Solar System Quiz</Text>

        <Text style={styles.subtitle}>
          Test your cosmic knowledge and explore the wonders of our universe.
        </Text>

        <TouchableOpacity
          style={[styles.button, styles.easy]}
          onPress={() => router.push("/quizEasy")}
        >
          <Text style={styles.buttonText}>Easy</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.medium]}
          onPress={() => router.push("/quizMedium")}
        >
          <Text style={styles.buttonText}>Medium</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.hard]}
          onPress={() => router.push("/quizHard")}
        >
          <Text style={styles.buttonText}>Hard</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000",
  },
  videoBackground: {
    position: "absolute",
    width: width,
    height: height,
  },
  overlay: {
    position: "absolute",
    width: width,
    height: height,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    marginTop: Platform.OS === "ios" ? 20 : 0,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    textShadowColor: "rgba(255,255,255,0.6)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8,
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 18,
    color: "#d1d1d1",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 24,
    fontStyle: "italic",
  },
  button: {
    width: "70%",
    paddingVertical: 18,
    borderRadius: 30,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.15)", // glassy transparency
    borderWidth: 1.2,
    borderColor: "rgba(255, 255, 255, 0.4)",
    shadowColor: "#fff",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
    elevation: 10,
  },
  easy: {
    shadowColor: "#4caf50",
  },
  medium: {
    shadowColor: "#ff9800",
  },
  hard: {
    shadowColor: "#f44336",
  },
  buttonText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: 1,
    textShadowColor: "rgba(0,0,0,0.4)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
});
