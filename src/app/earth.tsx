import React from "react";
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Linking } from "react-native";

export default function Earth() {
  const handleLearnMore = () => {
    Linking.openURL("https://science.nasa.gov/earth/");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Earth Overview */}
      <Text style={styles.title}>Earth</Text>
      <Image
        source={require("../assets/images/earthimg.jpeg")} // 🟢 Replace with your Earth image path
        style={styles.image}
      />
      <Text style={styles.text}>
        Earth is the third planet from the Sun and the only known world that supports life. 
        About 71% of Earth's surface is covered by water, and the atmosphere contains the right 
        mixture of gases—nitrogen, oxygen, and trace gases—to sustain living organisms.
      </Text>

      <Text style={styles.text}>
        Earth has one natural satellite, the Moon. The planet’s rotation and axial tilt give rise 
        to day and night, as well as changing seasons throughout the year. Its strong magnetic 
        field protects life from harmful solar radiation.
      </Text>

      {/* Layers of Earth */}
      <Text style={styles.subtitle}>Layers of Earth</Text>
      <Image
        source={require("../assets/images/earthlayer.jpg")} // 🟢 Replace with your layers image
        style={styles.layerImage}
      />
      <Text style={styles.text}>
        1️. Crust — The outermost solid layer where we live, made of rocks and minerals.  
        2️. Mantle — A thick layer of hot, semi-solid rock beneath the crust, responsible for 
        tectonic movements and volcanic activity.  
        3️. Outer Core — Made of liquid iron and nickel, it generates Earth's magnetic field.  
        4️.Inner Core — A solid sphere made mostly of iron and nickel, extremely hot and dense.
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
    backgroundColor: "#001F3F",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#7FDBFF",
    textAlign: "center",
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#39CCCC",
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: "#FFFFFF",
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
    backgroundColor: "#2ECC40",
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
