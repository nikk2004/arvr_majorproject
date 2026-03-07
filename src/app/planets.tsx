import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Planets() {
  const router = useRouter();

  const planets = [
    { name: "Mercury", image: require("../assets/images/mercuryimg.jpg"), page: "mercury" },
    { name: "Venus", image: require("../assets/images/venusimg.jpeg"), page: "venus" },
    { name: "Earth", image: require("../assets/images/earthimg.jpeg"), page: "earth" },
    { name: "Mars", image: require("../assets/images/marsimg.jpeg"), page: "mars" },
    { name: "Jupiter", image: require("../assets/images/jupiterimg.jpg"), page: "jupiter" },
    { name: "Saturn", image: require("../assets/images/saturnimg.jpg"), page: "saturn" },
    { name: "Uranus", image: require("../assets/images/uranus.jpeg"), page: "uranus" },
    { name: "Neptune", image: require("../assets/images/naptune.jpg"), page: "neptune" },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Solar System Intro Section */}
      <View style={styles.headerSection}>
        <Text style={styles.title}>Explore the Solar System</Text>
        <Text style={styles.subtitle}>
          Our Solar System is a vast and beautiful collection of celestial bodies,
          including the Sun, eight planets, their moons, and countless asteroids and comets.
          Each planet has its own mysteries and wonders waiting to be explored.
        </Text>
      </View>

      {/* Planet Cards */}
      <View style={styles.grid}>
        {planets.map((planet, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => router.push(`/${planet.page}`)}
          >
            <Image source={planet.image} style={styles.image} />
            <Text style={styles.planetName}>{planet.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#100B0FFF",
    padding: 20,
    alignItems: "center",
  },
  headerSection: {
  marginTop: 30,       // add space from top of screen
  marginBottom: 30,    // space below title
  paddingHorizontal: 15,
  alignItems: "center",
},
title: {
  fontSize: 24,
  fontWeight: "bold",
  color: "#66fcf1",
  marginBottom: 12,
  textAlign: "center",
  marginTop: 10,       // extra space above title for breathing room
},
subtitle: {
  color: "#c5c6c7",
  fontSize: 14,
  textAlign: "center",
  lineHeight: 20,
},

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#1f2833",
    borderRadius: 20,
    padding: 15,
    margin: 10,
    alignItems: "center",
    width: 150,
    elevation: 4,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  planetName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

