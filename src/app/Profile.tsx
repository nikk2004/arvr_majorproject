import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

export default function Profile() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    const loadUser = async () => {
      const storedEmail = await AsyncStorage.getItem("userEmail");
      if (storedEmail) setEmail(storedEmail);
    };
    loadUser();
  }, []);

  return (
    <LinearGradient colors={["#000000", "#020617", "#0f2027"]} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />

        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        {/* PROFILE CARD */}
        <View style={styles.card}>
          {/* AVATAR */}
          <LinearGradient
            colors={["#00e5ff", "#4facfe"]}
            style={styles.avatarRing}
          >
            <MaterialIcons name="account-circle" size={110} color="#020617" />
          </LinearGradient>

          <Text style={styles.name}>Student Explorer</Text>
          <Text style={styles.email}>{email || "student@gmail.com"}</Text>

          {/* STATS */}
          <View style={styles.statsRow}>
            <Stat label="Role" value="Student" />
            <Stat label="Year" value="Final" />
            <Stat label="Course" value="AR / VR" />
          </View>

          {/* DIVIDER */}
          <View style={styles.divider} />

          {/* DETAILS */}
          <View style={styles.detailBox}>
            <Detail label="College" value="SFIT" />
            <Detail label="Department" value="Technology" />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

/* STAT COMPONENT */
const Stat = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.statBox}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

/* DETAIL COMPONENT */
const Detail = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.detailRow}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

/* STYLES */
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    marginLeft: 15,
  },
  card: {
    marginTop: 40,
    marginHorizontal: 20,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 28,
    alignItems: "center",
    paddingVertical: 35,
    paddingHorizontal: 22,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
  },
  avatarRing: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: "800",
    color: "#fff",
    marginTop: 6,
  },
  email: {
    fontSize: 15,
    color: "#9fb3c8",
    marginTop: 6,
    marginBottom: 25,
  },
  statsRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginTop: 10,
  },
  statBox: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
  },
  statLabel: {
    color: "#9fb3c8",
    fontSize: 13,
    marginTop: 4,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "rgba(255,255,255,0.15)",
    marginVertical: 24,
  },
  detailBox: {
    width: "100%",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  label: {
    color: "#9fb3c8",
    fontSize: 15,
  },
  value: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});
