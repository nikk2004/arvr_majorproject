
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import ARCameraButton from "./ArCameraButton";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 60) / 2;

/* DASHBOARD ITEM TYPE */
type DashboardItem = {
  title: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  route: string;
  gradient: readonly [string, string, ...string[]];
};

export default function UserHome() {
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const menuAnim = useRef(new Animated.Value(-260)).current;

  /* LOAD USER EMAIL */
  useEffect(() => {
    const loadUserEmail = async () => {
      const email = await AsyncStorage.getItem("userEmail");
      if (email) setUserEmail(email);
    };
    loadUserEmail();
  }, []);

  /* ANIMATION EFFECTS */
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const toggleMenu = () => {
    Animated.timing(menuAnim, {
      toValue: menuOpen ? -260 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setMenuOpen(!menuOpen);
  };

  /* DASHBOARD ITEMS */
  const dashboardItems: DashboardItem[] = [
    { title: "Planets", icon: "public", route: "/planets", gradient: ["#0f2027", "#2c5364"] },
    { title: "Quiz", icon: "quiz", route: "/quiz", gradient: ["#1f1c2c", "#928dab"] },
    { title: "Chat", icon: "chat", route: "/chat", gradient: ["#141e30", "#243b55"] },
    { title: "AR Camera", icon: "camera", route: "/ar", gradient: ["#241448", "#302b63"] },
    { title: "Progress", icon: "trending-up", route: "/progress", gradient: ["#134e5e", "#71b280"] },
  ];

  /* RENDER DASHBOARD CARD */
  const renderItem = ({ item }: { item: DashboardItem }) => (
    <Animated.View style={{ opacity: fadeAnim }}>
      {item.title === "AR Camera" ? (
        <ARCameraButton />
      ) : (
        <TouchableOpacity
          onPress={() => {
            router.push(item.route as any);
          }}
        >
          <LinearGradient colors={item.gradient} style={styles.card}>
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <MaterialIcons name={item.icon} size={46} color="#fff" />
            </Animated.View>

            <Text style={styles.cardTitle}>{item.title}</Text>
          </LinearGradient>
        </TouchableOpacity>
      )}
    </Animated.View>
  );

  return (
    <LinearGradient colors={["#000", "#020617", "#0f2027"]} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={toggleMenu}>
            <MaterialIcons name="menu" size={30} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.welcome}>Welcome Explorer 🚀</Text>
        </View>

        {/* DASHBOARD GRID */}
        <FlatList
          data={dashboardItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.title}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          contentContainerStyle={styles.grid}
        />
      </SafeAreaView>

      {/* OVERLAY */}
      {menuOpen && <TouchableOpacity style={styles.overlay} onPress={toggleMenu} />}

      {/* SIDE MENU */}
      <Animated.View style={[styles.sideMenu, { transform: [{ translateX: menuAnim }] }]}>
        
        {/* PROFILE */}
        <TouchableOpacity
          style={styles.profileSection}
          onPress={() => {
            toggleMenu();
            router.push("/Profile" as any);
          }}
        >
          <MaterialIcons name="account-circle" size={90} color="#00e5ff" />
          <Text style={styles.profileTitle}>View Profile</Text>
          <Text style={styles.profileEmail}>{userEmail}</Text>
        </TouchableOpacity>

        {/* MENU ITEMS */}
        {dashboardItems.map((item, i) => (
          <TouchableOpacity
            key={i}
            style={styles.menuItem}
            onPress={() => {
              toggleMenu();
              router.push(item.route as any);
            }}
          >
            <MaterialIcons name={item.icon} size={24} color="#fff" />
            <Text style={styles.menuText}>{item.title}</Text>
          </TouchableOpacity>
        ))}

        {/* LOGOUT */}
        <TouchableOpacity
          style={[styles.menuItem, { marginTop: "auto" }]}
          onPress={async () => {
            await AsyncStorage.clear();
            router.replace("/login" as any);
          }}
        >
          <MaterialIcons name="logout" size={24} color="#ff6b6b" />
          <Text style={[styles.menuText, { color: "#ff6b6b" }]}>Logout</Text>
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
  );
}

/* STYLES */

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight! + 20 : 60,
    paddingHorizontal: 20,
    gap: 15,
  },

  welcome: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "800",
  },

  grid: {
    padding: 20,
  },

  card: {
    width: CARD_WIDTH,
    height: 170,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  cardTitle: {
    color: "#fff",
    marginTop: 10,
    fontWeight: "700",
  },

  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.45)",
  },

  sideMenu: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: 260,
    backgroundColor: "rgba(2,6,23,0.98)",
    paddingTop: 80,
    paddingHorizontal: 20,
  },

  profileSection: {
    alignItems: "center",
    marginBottom: 30,
  },

  profileTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 6,
  },

  profileEmail: {
    color: "#9fb3c8",
    fontSize: 13,
    marginTop: 4,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },

  menuText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 14,
  },
});