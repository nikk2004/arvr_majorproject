import React from "react";
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Linking } from "react-native";

export default function Venus() {
  const handleLearnMore = () => {
    Linking.openURL("https://science.nasa.gov/venus/");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Venus Overview */}
      <Text style={styles.title}>Venus</Text>
      <Image
        source={require("../assets/images/venusimg.jpeg")} // 🟡 Replace with your own image path
        style={styles.image}
      />
      <Text style={styles.text}>
        Venus is the second planet from the Sun and is often called Earth's twin because of their
        similar size and composition. However, Venus has a thick, toxic atmosphere filled with
        carbon dioxide, and clouds made of sulfuric acid. It has the hottest surface of any planet
        in our solar system, with temperatures hot enough to melt lead.
      </Text>

      <Text style={styles.text}>
        The surface of Venus is covered with mountains, volcanoes, and vast plains. Despite being
        farther from the Sun than Mercury, Venus is hotter because of the strong greenhouse effect
        caused by its dense atmosphere.
      </Text>

      {/* Layers of Venus */}
      <Text style={styles.subtitle}>Layers of Venus</Text>
      <Image
        source={require("../assets/images/venuslayer.jpeg")} // 🟡 Replace with your own image path for layers
        style={styles.layerImage}
      />
      <Text style={styles.text}>
        1️. Crust — Venus has a solid rocky crust made mostly of basalt.  
        2️. Mantle — Beneath the crust lies the mantle made of molten rock, which helps form
        volcanoes.  
        3️. Core — The core is likely made of iron and nickel. Scientists believe it may be
        partly molten, but Venus has no magnetic field, meaning it behaves differently from Earth's
        core.
      </Text>

      {/* NASA Learn More */}
      <TouchableOpacity onPress={handleLearnMore} style={styles.button}>
        <Text style={styles.buttonText}>Learn More on NASA</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#000",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFD580",
    textAlign: "center",
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#FFCC70",
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: "#FFF",
    lineHeight: 24,
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 15,
    marginBottom: 15,
  },
  layerImage: {
    width: "100%",
    height: 230,
    borderRadius: 15,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#FF9F45",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
});
