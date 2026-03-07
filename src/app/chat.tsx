import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ChatScreen() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const flatListRef = useRef<FlatList>(null);

  // ================= CLEAN FORMAT FUNCTION =================
  const formatMessage = (text: string) => {
    if (!text) return "";

    return text
      .replace(/###/g, "")
      .replace(/\*\*/g, "")
      .replace(/\*/g, "")
      .replace(/```/g, "")
      .replace(/->/g, "➤ ")
      .replace(/\n\s*\n/g, "\n\n")
      .trim();
  };

  // ================= AUTO SCROLL =================
  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // ================= BACKEND CALL =================
  const callBackendAI = async (prompt: string) => {
    try {
      const res = await fetch("http://10.138.85.33:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: prompt }),
      });

      const data = await res.json();
      return formatMessage(data.reply || "No response");
    } catch (err) {
      console.log("Backend error:", err);
      return "Server not reachable";
    }
  };

  // ================= SEND MESSAGE =================
  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: "user",
      text: input,
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    const reply = await callBackendAI(input);

    const botMsg = {
      id: (Date.now() + 1).toString(),
      sender: "bot",
      text: reply,
    };

    setMessages(prev => [...prev, botMsg]);
    setLoading(false);
  };

  // ================= RENDER MESSAGE =================
  const renderItem = ({ item }: any) => {
    const lines = item.text.split("\n");

    return (
      <View
        style={[
          styles.bubble,
          item.sender === "user" ? styles.userBubble : styles.botBubble,
        ]}
      >
        {lines.map((line: string, index: number) => {
          const isNumbered = /^\d+\./.test(line.trim());
          const isArrow = line.trim().startsWith("➤");

          return (
            <Text
              key={index}
              style={[
                styles.text,
                isNumbered && { fontWeight: "bold", marginTop: 6 },
                isArrow && { marginLeft: 5 },
              ]}
            >
              {line}
            </Text>
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={["#0f172a", "#1e293b"]} style={{ flex: 1 }}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Let's Ask Me</Text>
        </View>

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderItem}
            keyExtractor={(i) => i.id}
            contentContainerStyle={{
              paddingHorizontal: 15,
              paddingVertical: 15,
              paddingBottom: 100,
            }}
            onContentSizeChange={scrollToBottom}
          />

          {loading && (
            <ActivityIndicator style={{ marginBottom: 80 }} color="#00e0ff" />
          )}

          {/* INPUT */}
          <View style={styles.inputBar}>
            <TextInput
              style={styles.input}
              placeholder="Ask anything..."
              placeholderTextColor="#aaa"
              value={input}
              onChangeText={setInput}
              onSubmitEditing={sendMessage}
              multiline
            />
            <TouchableOpacity onPress={sendMessage} style={styles.sendBtn}>
              <MaterialIcons name="send" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 40,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  bubble: {
    maxWidth: "80%",
    padding: 14,
    borderRadius: 18,
    marginVertical: 6,
  },
  userBubble: {
    backgroundColor: "#00bcd4",
    alignSelf: "flex-end",
  },
  botBubble: {
    backgroundColor: "#334155",
    alignSelf: "flex-start",
  },
  text: {
    color: "#fff",
    fontSize: 15,
    lineHeight: 22,
  },
  inputBar: {
    position: "absolute",
    bottom: 15,
    left: 15,
    right: 15,
    flexDirection: "row",
    backgroundColor: "#1e293b",
    borderRadius: 30,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    color: "#fff",
  },
  sendBtn: {
    backgroundColor: "#00bcd4",
    borderRadius: 50,
    padding: 10,
    marginLeft: 8,
  },
});
