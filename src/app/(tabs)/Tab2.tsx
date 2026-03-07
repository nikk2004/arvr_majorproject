import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Tab2() {
  return (
    <View style={styles.container}>
      <Text>Tab 2 Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, justifyContent: "center", alignItems: "center" } });
