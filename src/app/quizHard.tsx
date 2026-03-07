import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { hardQuestions } from "./quizQuestions";

export default function QuizHard() {
  const router = useRouter();
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showScore, setShowScore] = useState(false);
  const [timer, setTimer] = useState(30); // Hard quiz: 30 seconds per question

  useEffect(() => {
    if (showScore) return;
    if (timer === 0) handleNext();
    const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer, showScore]);

  const handleOptionPress = (option: string) => {
    setSelectedOption(option);
    if (option === hardQuestions[currentQ].answer) setScore(score + 1);
    setTimeout(() => handleNext(), 700);
  };

  const handleNext = () => {
    if (currentQ + 1 < hardQuestions.length) {
      setCurrentQ(currentQ + 1);
      setSelectedOption(null);
      setTimer(30);
    } else setShowScore(true);
  };

  if (showScore) {
    return (
      <View style={styles.container}>
        <Text style={styles.scoreText}>Hard Quiz Completed!</Text>
        <Text style={styles.scoreText}>Your Score: {score} / {hardQuestions.length}</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.push("/UserHome")}>
          <Text style={styles.buttonText}>Go Back Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const currentQuestion = hardQuestions[currentQ];

  return (
    <View style={styles.container}>
      {currentQ === 0 && (
        <View style={styles.instructions}>
          <Text style={styles.instructionText}>
            Instructions: Answer each question within 30 seconds. You cannot go back. Good luck! 🌟
          </Text>
        </View>
      )}

      <Text style={styles.questionCount}>
        Question {currentQ + 1} of {hardQuestions.length} | Time: {timer}s
      </Text>
      <Text style={styles.questionText}>{currentQuestion.question}</Text>

      <ScrollView contentContainerStyle={{ marginTop: 20 }}>
        {currentQuestion.options.map((option, index) => {
          const isSelected = option === selectedOption;
          const isCorrect = option === currentQuestion.answer;
          let optionStyle = styles.optionButton;
          if (selectedOption) {
            optionStyle = isCorrect
              ? styles.correctOption
              : isSelected
              ? styles.wrongOption
              : styles.optionButton;
          }

          return (
            <TouchableOpacity
              key={index}
              style={optionStyle}
              disabled={!!selectedOption}
              onPress={() => handleOptionPress(option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f2027", padding: 20, justifyContent: "center" },
  instructions: { marginBottom: 20, backgroundColor: "#203a43", padding: 10, borderRadius: 10 },
  instructionText: { color: "#fff", fontSize: 16, textAlign: "center" },
  questionCount: { color: "#fff", fontSize: 16, marginBottom: 10 },
  questionText: { color: "#fff", fontSize: 22, fontWeight: "bold" },
  optionButton: { backgroundColor: "#203a43", padding: 15, borderRadius: 15, marginBottom: 15 },
  correctOption: { backgroundColor: "#4caf50", padding: 15, borderRadius: 15, marginBottom: 15 },
  wrongOption: { backgroundColor: "#f44336", padding: 15, borderRadius: 15, marginBottom: 15 },
  optionText: { color: "#fff", fontSize: 18 },
  scoreText: { color: "#fff", fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 30 },
  button: { backgroundColor: "#4286f4", padding: 15, borderRadius: 15, alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 18 },
});
