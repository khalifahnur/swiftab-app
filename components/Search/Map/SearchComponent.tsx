import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { color, primary } from "@/constants/Colors";
import { EvilIcons, Ionicons } from "@expo/vector-icons";

type SearchProps = {
  placeholderTxt?: string;
};

export default function SearchComponent({ placeholderTxt }: SearchProps) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.navigate("/(tabs)")}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={20} color={color.green} />
        </TouchableOpacity>
        <Text style={styles.title}>Search</Text>
        <View style={styles.placeholder} />
      </View>
      <Pressable
        style={styles.search}
        onPress={() => router.push("/screens/availableres")}
      >
        <View style={styles.innerSearch}>
          <EvilIcons name="search" size={24} color={color.navy} />
          <Text style={styles.placeHolderTxt}>
            {placeholderTxt || "Search for places"}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical:20
  },
  search: {
    marginTop:10,
    width: "100%",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    backgroundColor: '#f8f8f8',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  innerSearch: {
    flexDirection: "row",
    gap: 12,
    padding: 12,
    alignItems: "center",
  },
  placeHolderTxt: {
    color: "#757575",
    fontSize: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 999,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
  },
  placeholder: {
    width: 40,
  },
  backButton: {
    backgroundColor: "#EFEFEF",
    padding: 10,
    borderRadius: 12,
  },
});
