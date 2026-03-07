import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  Dimensions 
} from "react-native";
import { useRouter } from "expo-router";
import { Video, ResizeMode } from "expo-av";
import { mediumQuestions } from "./quizQuestions";

const { height } = Dimensions.get("window");

export default function QuizMedium() {
  const router = useRouter();
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showScore, setShowScore] = useState(false);
  const [timer, setTimer] = useState(20);

  useEffect(() => {
    if (showScore) return;
    if (timer === 0) handleNext();
    const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer, showScore]);

  const handleOptionPress = (option: string) => {
    setSelectedOption(option);
    if (option === mediumQuestions[currentQ].answer) setScore(score + 1);
    setTimeout(() => handleNext(), 700);
  };

  const handleNext = () => {
    if (currentQ + 1 < mediumQuestions.length) {
      setCurrentQ(currentQ + 1);
      setSelectedOption(null);
      setTimer(20);
    } else setShowScore(true);
  };

  const backgroundVideo = require("../assets/images/videos/video2.mp4"); // ✅ Your video

  if (showScore) {
    return (
      <View style={styles.container}>
        <Video
          source={backgroundVideo}
          style={StyleSheet.absoluteFill}
          resizeMode={ResizeMode.COVER}
          shouldPlay
          isLooping
          muted
        />
        <View style={styles.overlay} />
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>Medium Quiz Completed!</Text>
          <Text style={styles.scoreText}>
            Your Score: {score} / {mediumQuestions.length}
          </Text>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => router.push("/UserHome")}
          >
            <Text style={styles.buttonText}>Go Back Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const currentQuestion = mediumQuestions[currentQ];

  return (
    <View style={styles.container}>
      <Video
        source={backgroundVideo}
        style={StyleSheet.absoluteFill}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        isLooping
        muted
      />
      <View style={styles.overlay} />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {currentQ === 0 && (
          <View style={styles.instructions}>
            <Text style={styles.instructionText}>
              Instructions: Answer each question within 20 seconds. You cannot go back. Good luck! 🌟
            </Text>
          </View>
        )}

        <Text style={styles.questionCount}>
          Question {currentQ + 1} of {mediumQuestions.length} | Time: {timer}s
        </Text>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>

        <View style={{ marginTop: 20 }}>
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
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f2027" },
  overlay: { 
    ...StyleSheet.absoluteFillObject, 
    backgroundColor: "rgba(15,32,39,0.7)" 
  },
  contentContainer: { 
    padding: 20, 
    minHeight: height, 
    justifyContent: "center" 
  },
  instructions: { 
    marginBottom: 20, 
    backgroundColor: "rgba(32,58,67,0.9)", 
    padding: 15, 
    borderRadius: 15 
  },
  instructionText: { color: "#fff", fontSize: 16, textAlign: "center" },
  questionCount: { color: "#fff", fontSize: 16, marginBottom: 10, textAlign: "center" },
  questionText: { color: "#fff", fontSize: 24, fontWeight: "bold", textAlign: "center" },
  optionButton: { 
    backgroundColor: "rgba(32,58,67,0.9)", 
    padding: 15, 
    borderRadius: 15, 
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  correctOption: { 
    backgroundColor: "#4caf50", 
    padding: 15, 
    borderRadius: 15, 
    marginBottom: 15 
  },
  wrongOption: { 
    backgroundColor: "#f44336", 
    padding: 15, 
    borderRadius: 15, 
    marginBottom: 15 
  },
  optionText: { color: "#fff", fontSize: 18, textAlign: "center" },
  scoreContainer: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  scoreText: { color: "#fff", fontSize: 26, fontWeight: "bold", textAlign: "center", marginBottom: 25 },
  button: { backgroundColor: "#4286f4", padding: 15, borderRadius: 15, alignItems: "center", width: "60%" },
  buttonText: { color: "#fff", fontSize: 18 },
});
