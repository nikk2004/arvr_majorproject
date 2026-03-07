import React from "react";
import { Alert, Linking, StyleSheet, Text, TouchableOpacity } from "react-native";

const ARCameraButton = () => {

  const openARCamera = async () => {
    const url = "major3dproject://open";

    try {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("AR App Not Installed", "Please install the Major3dproject AR app.");
      }

    } catch (error) {
      Alert.alert("Error", "Could not open AR application.");
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={openARCamera}>
      <Text style={styles.buttonText}>Open AR Camera</Text>
    </TouchableOpacity>
  );
};

export default ARCameraButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold"
  }
});