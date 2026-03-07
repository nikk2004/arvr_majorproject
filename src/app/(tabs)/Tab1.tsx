import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Tab1() {
  return (
    <View style={styles.container}>
      <Text>Tab 1 Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, justifyContent: "center", alignItems: "center" } });
