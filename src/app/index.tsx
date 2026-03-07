import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  Platform,
  Animated,
  SafeAreaView,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function Home() {
  const router = useRouter();
  const scrollRef = useRef(null);

  const aboutRef = useRef(null);
  const modulesRef = useRef(null);
  const contactRef = useRef(null);

  // Animation setup
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []);

  const modules = [
    { name: "Mercury", img: require("../assets/images/mercuryimg.jpg") },
    { name: "Venus", img: require("../assets/images/venusimg.jpeg") },
    { name: "Earth", img: require("../assets/images/earthimg.jpeg") },
    { name: "Mars", img: require("../assets/images/marsimg.jpeg") },
  ];

  const scrollToSection = (ref) => {
    ref.current?.measureLayout(scrollRef.current, (x, y) => {
      scrollRef.current.scrollTo({ y, animated: true });
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      {/* ---------- BACKGROUND VIDEO ---------- */}
      <Video
        source={require("../assets/images/videos/video4.mp4")}
        shouldPlay
        isLooping
        isMuted
        resizeMode={ResizeMode.COVER}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.overlay} />

      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* ---------- TITLE ---------- */}
        <Animated.View style={[styles.logoContainer, { opacity: fadeAnim }]}>
          <Text style={styles.logo}>EduLens</Text>
          <Text style={styles.tagline}>Explore Immersive solar planet with us</Text>
        </Animated.View>

        {/* ---------- NAVBAR ---------- */}
        <View style={styles.navbar}>
          <TouchableOpacity onPress={() => scrollToSection(modulesRef)}>
            <Text style={styles.navLink}>Modules</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => scrollToSection(aboutRef)}>
            <Text style={styles.navLink}>About</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => scrollToSection(contactRef)}>
            <Text style={styles.navLink}>Contact</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => router.push("/login")}
          >
            <Text style={styles.loginBtnText}>Login</Text>
          </TouchableOpacity>
        </View>

        {/* ---------- MODULES CARD ---------- */}
        <View ref={modulesRef} style={styles.card}>
          <Text style={styles.sectionTitle}>Learning Modules</Text>
          <View style={styles.cardsRow}>
            {modules.map((planet, idx) => (
              <Animated.View key={idx} style={styles.moduleCard}>
                <Image source={planet.img} style={styles.moduleImage} />
                <Text style={styles.moduleText}>{planet.name}</Text>
              </Animated.View>
            ))}
          </View>
        </View>

        {/* ---------- ABOUT CARD ---------- */}
        <View ref={aboutRef} style={styles.card}>
          <Text style={styles.sectionTitle}>About EduLens</Text>
          <Text style={styles.cardText}>
            EduLens Solar is a futuristic AR-based learning platform that brings
            space exploration to your hands. Discover planets, stars, and galaxies
            through immersive visuals and interactive modules.
          </Text>
          <Text style={styles.cardText}>
            Our mission is to make learning fun, visual, and deeply engaging for
            every curious mind on Earth!
          </Text>
        </View>

        

        {/* ---------- MISSION & VISION CARD ---------- */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Mission</Text>
          <Text style={styles.cardText}>
            To ignite imagination and make astronomy accessible through stunning
            visuals and AR storytelling.
          </Text>

          <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Vision</Text>
          <Text style={styles.cardText}>
            To build a new generation of space explorers who learn by experiencing
            — not memorizing.
          </Text>
        </View>

        {/* ---------- CONTACT CARD ---------- */}
        <View ref={contactRef} style={styles.card}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <Text style={styles.contactText}>📧 contact@eduversesolar.com</Text>
          <Text style={styles.contactText}>📞 +91 9876543210</Text>
          <Text style={styles.contactText}>📍 Mumbai, Maharashtra, India</Text>
        </View>

        {/* ---------- FOOTER ---------- */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2025 EduLens | All Rights Reserved
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, paddingBottom: 60 },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,30,0.6)",
  },

  // ---------- TITLE ----------
  logoContainer: {
    alignItems: "center",
    paddingVertical: 50,
  },
  logo: {
    color: "#8AB4F8",
    fontSize: 32,
    fontWeight: "bold",
    textShadowColor: "#00C9FF",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
    letterSpacing: 2,
  },
  tagline: {
    color: "#F3F3F3",
    fontSize: 14,
    marginTop: 5,
    fontStyle: "italic",
  },

  // ---------- NAVBAR ----------
  navbar: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 25,
    marginHorizontal: 30,
    paddingVertical: 10,
    marginBottom: 20,
  },
  navLink: {
    color: "#FFF",
    marginHorizontal: 15,
    fontSize: 15,
    fontWeight: "bold",
    textTransform: "uppercase",
    textShadowColor: "#00C9FF",
    textShadowRadius: 10,
  },
  loginBtn: {
    backgroundColor: "#00C9FF",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    marginLeft: 10,
  },
  loginBtnText: { color: "#000", fontSize: 14, fontWeight: "bold" },

  // ---------- CARD ----------
  card: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 20,
    shadowColor: "#00C9FF",
    shadowOpacity: 0.6,
    shadowRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(0,200,255,0.3)",
    backdropFilter: "blur(10px)",
  },
  sectionTitle: {
    color: "#8AB4F8",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    letterSpacing: 1,
  },
  cardText: {
    color: "#E6E6E6",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "justify",
    marginBottom: 8,
  },

  // ---------- MODULES ----------
  cardsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  moduleCard: {
    backgroundColor: "rgba(0,20,40,0.7)",
    width: "47%",
    borderRadius: 16,
    alignItems: "center",
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "rgba(0,200,255,0.4)",
    shadowColor: "#00C9FF",
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
  },
  moduleImage: { width: 100, height: 100, borderRadius: 60, marginBottom: 10 },
  moduleText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  // ---------- CONTACT ----------
  contactText: {
    color: "#F3F3F3",
    fontSize: 15,
    textAlign: "center",
    marginBottom: 5,
  },

  // ---------- FOOTER ----------
  footer: {
    marginTop: 30,
    alignItems: "center",
    paddingTop: 10,
  },
  footerText: {
    color: "#AAA",
    fontSize: 12,
  },
});
