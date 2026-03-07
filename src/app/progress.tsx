import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

const TOTAL_QUIZZES = 10; // total quizzes in app

const Progress: React.FC = () => {
  const [completed, setCompleted] = useState<number>(0);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    const value = await AsyncStorage.getItem("completedQuizzes");
    if (value) {
      setCompleted(Number(value));
    }
  };

  const progressPercent = completed / TOTAL_QUIZZES;

  return (
    <LinearGradient colors={["#000", "#020617", "#0f2027"]} style={styles.container}>
      <Text style={styles.title}>Your Progress 📊</Text>

      {/* PROGRESS TEXT */}
      <Text style={styles.info}>
        Quizzes Completed: {completed} / {TOTAL_QUIZZES}
      </Text>

      {/* PROGRESS BAR */}
      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            { width: `${progressPercent * 100}%` },
          ]}
        />
      </View>

      {/* PERCENT */}
      <Text style={styles.percent}>
        {Math.round(progressPercent * 100)}% Completed
      </Text>
    </LinearGradient>
  );
};

export default Progress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 30,
  },
  info: {
    color: "#cbd5e1",
    fontSize: 16,
    marginBottom: 10,
  },
  progressBar: {
    height: 18,
    width: "100%",
    backgroundColor: "#1e293b",
    borderRadius: 20,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#00e5ff",
  },
  percent: {
    color: "#fff",
    fontSize: 16,
    marginTop: 10,
    fontWeight: "600",
  },
});
