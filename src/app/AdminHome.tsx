// AdminHome.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";

export default function AdminHome() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <Text style={styles.title}>👩‍🏫 Teacher Dashboard</Text>

      <ScrollView contentContainerStyle={styles.grid}>
        {/* STUDENTS */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/admin/students")}
        >
          <Text style={styles.icon}>👨‍🎓</Text>
          <Text style={styles.cardText}>Manage Students</Text>
        </TouchableOpacity>

        {/* QUIZZES */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/admin/quizzes")}
        >
          <Text style={styles.icon}>📝</Text>
          <Text style={styles.cardText}>Manage Quizzes</Text>
        </TouchableOpacity>

        {/* PROGRESS */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/admin/progress")}
        >
          <Text style={styles.icon}>📊</Text>
          <Text style={styles.cardText}>View Progress</Text>
        </TouchableOpacity>

        {/* PLANETS */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/admin/planets")}
        >
          <Text style={styles.icon}>🪐</Text>
          <Text style={styles.cardText}>Upload Planets Content</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 25,
    textAlign: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    backgroundColor: "#1e293b",
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    alignItems: "center",
    elevation: 5,
  },
  icon: {
    fontSize: 28,
    marginBottom: 10,
  },
  cardText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
});