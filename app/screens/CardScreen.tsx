import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";
import { useRouter } from "expo-router";
import { color, Colors } from "@/constants/Colors";

const CardScreen = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <LottieView
        source={require("@/assets/images/lottie/card.json")}
        autoPlay
        loop
        style={styles.animation}
      />

      <Text style={styles.title}>Payment with Card</Text>
      <Text style={styles.subtitle}>Coming Soon!</Text>

      {/* Button to go back */}
      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  animation: {
    width: 300,
    height: 300,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 22,
    color: "#666",
    marginTop: 10,
  },
  button: {
    marginTop: 30,
    backgroundColor: color.green,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CardScreen;
