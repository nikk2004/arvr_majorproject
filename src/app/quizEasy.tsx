import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
} from "react-native";
import { Video, ResizeMode, Audio } from "expo-av";

const { width, height } = Dimensions.get("window");

export default function QuizEasyEnhanced() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [optionAnimations, setOptionAnimations] = useState([]);
  const [popAnim] = useState(new Animated.Value(1));
  const [isLoading, setIsLoading] = useState(true);
  const [timer, setTimer] = useState(3);

  const videoRef = useRef(null);
  const correctSound = useRef(new Audio.Sound());
  const wrongSound = useRef(new Audio.Sound());
  const bgVideoRef = useRef(null);

  const questions = [
    {
      question: "How many planets are there in our Solar System?",
      options: ["7", "8", "9", "10"],
      correctAnswer: "8",
      image: require("../assets/images/earthimg.jpeg"),
    },

    {
      question: "The Sun is a...",
      options: ["Planet", "Star", "Moon", "Comet"],
      correctAnswer: "Star",
      video: require("../assets/images/videos/sun.mp4"),
    },
    {
      question: "Which of these planets is the largest?",
      options: ["Earth", "Jupiter", "Mars"],
      correctAnswer: "Jupiter",
      images: [
        require("../assets/images/earthimg.jpeg"),
        require("../assets/images/jupiter.webp"),
        require("../assets/images/marsimg.jpeg"),
      ],
      type: "image-choice",
    },
    {
      question: "How many moons does Earth have?",
      options: ["1", "2", "3", "4"],
      correctAnswer: "1",
      image: require("../assets/images/moon.jpg"),
    },
    {
  question: "Who was the first person to walk on the Moon?",
  options: ["NeilArmstrong", "BuzzAldrin", "YuriGagarin"],
  correctAnswer: "NeilArmstrong",
  images: [
    require("../assets/images/neil.jpg"),      // Neil Armstrong
    require("../assets/images/buzz.jpg"),      // Buzz Aldrin
    require("../assets/images/michael.webp"),      // Yuri Gagarin
  ],
  type: "image-choice"
},
    
    {
      question: "The Earth is flat. True or False?",
      options: ["True", "False"],
      correctAnswer: "False",
      image: require("../assets/images/earthimg.jpeg"),
    },
  ];

  // preload sounds
  useEffect(() => {
    (async () => {
      try {
        await correctSound.current.loadAsync(
          require("../assets/images/sounds/correct.mp3")
        );
      } catch {}
      try {
        await wrongSound.current.loadAsync(
          require("../assets/images/sounds/wrong.mp3")
        );
      } catch {}
    })();
  }, []);

  // loader timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsLoading(false);
          fadeIn();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start(() => animateOptions());
  };

  const animateOptions = () => {
    const anims = questions[currentQuestion].options.map(
      () => new Animated.Value(0)
    );
    setOptionAnimations(anims);
    Animated.stagger(
      300,
      anims.map((a) =>
        Animated.timing(a, {
          toValue: 1,
          duration: 500,
          easing: Easing.ease,
          useNativeDriver: true,
        })
      )
    ).start();
  };

  const playSound = async (isCorrect) => {
    try {
      if (isCorrect) await correctSound.current.replayAsync();
      else await wrongSound.current.replayAsync();
    } catch {}
  };

  const handleOptionPress = (option) => {
    if (selectedOption) return; // prevent double click
    setSelectedOption(option);

    const isCorrect = option === questions[currentQuestion].correctAnswer;
    if (isCorrect) setScore(score + 1);

    playSound(isCorrect);

    Animated.sequence([
      Animated.timing(popAnim, {
        toValue: 1.2,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(popAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();

    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
        fadeAnim.setValue(0);
        fadeIn();
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Quiz starts in {timer}...</Text>
      </View>
    );
  }

  if (showResult) {
    return (
      <View style={styles.container}>
        <Text style={styles.resultText}>Quiz Complete!</Text>
        <Text style={styles.scoreText}>
          Your Score: {score}/{questions.length}
        </Text>
        <TouchableOpacity
          style={styles.restartButton}
          onPress={() => {
            setScore(0);
            setCurrentQuestion(0);
            setShowResult(false);
            setSelectedOption(null);
            fadeAnim.setValue(0);
            fadeIn();
          }}
        >
          <Text style={styles.restartText}>Restart Quiz</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const question = questions[currentQuestion];

  return (
    <View style={styles.container}>
      {/* Background video */}
      <Video
        ref={bgVideoRef}
        source={require("../assets/images/videos/galaxy.mp4")}
        style={StyleSheet.absoluteFill}
        resizeMode={ResizeMode.COVER}
        isLooping
        shouldPlay
        muted
      />

      {/* Image or video */}
      {question.video ? (
        <Video
          ref={videoRef}
          source={question.video}
          style={styles.media}
          resizeMode={ResizeMode.COVER}
          shouldPlay
          isLooping
          muted
        />
      ) : question.type === "image-choice" ? (
        <View style={{ width: width * 0.9, alignItems: "center" }}>
          {/* Show question text above images */}
          <Text style={styles.questionText}>{question.question}</Text>

          <View style={styles.imageOptionsContainer}>
            {question.images.map((img, index) => {
              const option = question.options[index];
              const isSelected = selectedOption === option;
              const isCorrect = option === question.correctAnswer;
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.imageOption,
                    isSelected && {
                      borderColor: isCorrect ? "#4CAF50" : "#F44336",
                      borderWidth: 3,
                    },
                  ]}
                  onPress={() => handleOptionPress(option)}
                >
                  <Image source={img} style={styles.imageOptionImg} />
                  <Text style={styles.imageOptionText}>{option}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      ) : (
        <Image source={question.image} style={styles.media} />
      )}

      {/* Normal text options */}
      {question.type !== "image-choice" && (
        <Animated.View style={[styles.questionBox, { opacity: fadeAnim }]}>
          <Text style={styles.questionText}>{question.question}</Text>
          {question.options.map((option, index) => (
            <Animated.View
              key={index}
              style={{
                opacity: optionAnimations[index] || 1,
                transform: [{ scale: selectedOption === option ? popAnim : 1 }],
              }}
            >
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  selectedOption === option && {
                    backgroundColor:
                      option === question.correctAnswer
                        ? "#4CAF50"
                        : "#F44336",
                  },
                ]}
                onPress={() => handleOptionPress(option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#000" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#000" },
  loadingText: { color: "#fff", fontSize: 28, fontWeight: "700" },
  media: { width: width * 0.9, height: height * 0.35, borderRadius: 20, marginBottom: 20 },
  questionBox: { backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 20, padding: 20, width: width * 0.9 },
  questionText: { color: "#fff", fontSize: 22, marginBottom: 15, textAlign: "center" },
  optionButton: { backgroundColor: "rgba(255,255,255,0.2)", padding: 12, borderRadius: 12, marginVertical: 6, alignItems: "center" },
  optionText: { color: "#fff", fontSize: 18 },
  resultText: { color: "#fff", fontSize: 30, marginBottom: 10 },
  scoreText: { color: "#fff", fontSize: 24, marginBottom: 20 },
  restartButton: { backgroundColor: "#2196F3", padding: 12, borderRadius: 10 },
  restartText: { color: "#fff", fontSize: 18 },

  // New styles for image-choice question
  imageOptionsContainer: { flexDirection: "row", justifyContent: "space-around", marginTop: 10 },
  imageOption: { alignItems: "center", marginHorizontal: 5 },
  imageOptionImg: { width: width * 0.25, height: height * 0.15, borderRadius: 10, marginBottom: 5 },
  imageOptionText: { color: "#fff", fontSize: 16, textAlign: "center" },
});
