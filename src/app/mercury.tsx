import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Mercury() {
  return (
    <LinearGradient colors={["#0f2027", "#203a43", "#2c5364"]} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Title Section */}
        <Text style={styles.title}>Mercury</Text>

        {/* Main Image */}
        <Image
          source={require("../assets/images/mercuryimg.jpg")}
          style={styles.planetImage}
        />

        {/* Overview Section */}
        <Text style={styles.sectionTitle}>Overview</Text>
        <Text style={styles.description}>
          Mercury is the closest planet to the Sun and also the smallest in our solar system.
          It’s named after the Roman messenger god due to its swift motion around the Sun —
          it takes only 88 Earth days to complete one orbit! Despite being closest to the Sun,
          Mercury isn’t the hottest planet — that title goes to Venus.
        </Text>

        <Text style={styles.description}>
          Mercury doesn’t have a significant atmosphere to trap heat, so temperatures vary
          drastically — from 430°C (800°F) during the day to -180°C (-290°F) at night.
        </Text>

        {/* Quick Facts */}
        <View style={styles.factBox}>
          <Text style={styles.factTitle}>Quick Facts</Text>
          <Text style={styles.factText}>• Distance from Sun: 57.9 million km</Text>
          <Text style={styles.factText}>• Length of Day: 59 Earth days</Text>
          <Text style={styles.factText}>• Length of Year: 88 Earth days</Text>
          <Text style={styles.factText}>• Moons: None</Text>
          <Text style={styles.factText}>• Diameter: 4,879 km</Text>
          <Text style={styles.factText}>• Temperature: -180°C to 430°C</Text>
        </View>

        {/* Structure Section */}
        <Text style={styles.sectionTitle}>Structure and Layers of Mercury</Text>

        {/* Layer 1 */}
        <Text style={styles.layerTitle}>1️. Core</Text>
        <Text style={styles.description}>
          Mercury’s core makes up about 85% of its radius and is made mostly of iron and nickel.
          It’s the most metal-rich planet and its partially molten core generates a magnetic field.
        </Text>

        {/* Layer 2 */}
        <Text style={styles.layerTitle}>2️. Mantle</Text>
        <Text style={styles.description}>
          The rocky silicate mantle surrounds the core and is thinner than Earth’s mantle.
          It contains minerals like olivine and pyroxene.
        </Text>

        {/* Layer 3 */}
        <Text style={styles.layerTitle}>3️. Crust</Text>
        <Text style={styles.description}>
          The outer crust is 100–300 km thick and heavily cratered from meteoroid impacts.
          Large cliffs called lobate scarps show that Mercury shrank as its core cooled.
        </Text>

        {/* Layer Image */}
        <Image
          source={require("../assets/images/mercurylayer.jpg")}
          style={styles.layerImage}
        />

        {/* Fun Facts */}
        <Text style={styles.sectionTitle}>Fun Facts</Text>
        <Text style={styles.description}>
          • A day on Mercury (sunrise to sunrise) lasts 176 Earth days.{"\n"}
          • You could fit 18 Mercurys inside Earth.{"\n"}
          • Mercury’s surface resembles the Moon’s — gray, rocky, and cratered.
        </Text>

        {/* Reference */}
        <Text style={styles.reference}>
          Source: NASA Science — Mercury Overview
        </Text>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  planetImage: {
    width: "100%",
    height: 250,
    borderRadius: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FFD700",
    marginTop: 20,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#e0e0e0",
    lineHeight: 24,
    marginBottom: 10,
    textAlign: "justify",
  },
  factBox: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    padding: 15,
    marginVertical: 10,
  },
  factTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#00BFFF",
    marginBottom: 8,
  },
  factText: {
    color: "#fff",
    fontSize: 15,
    marginBottom: 4,
  },
  layerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFA500",
    marginTop: 10,
  },
  layerImage: {
    width: "100%",
    height: 250,
    borderRadius: 15,
    marginVertical: 15,
  },
  reference: {
    color: "#b0c4de",
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 15,
  },
});
