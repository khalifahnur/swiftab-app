import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { color, primary } from "@/constants/Colors";
import { EvilIcons } from "@expo/vector-icons";

type searchProps = {
  placeholderTxt?: string;
};
export default function SearchComponent({ placeholderTxt }: searchProps) {
  const router = useRouter();

  return (
    <View>
      <Pressable
        style={styles.search}
        onPress={() => router.push("/screens/availableres")}
      >
        <View style={styles.innerSearch}>
          <EvilIcons name="search" size={20} color="black" />
          <Text>Search for places</Text>
        </View>
      </Pressable>
      <Pressable style={styles.search}>
        <View style={styles.innerSearch}>
          <EvilIcons name="location" size={20} color={color.navy} />
          <Text style={styles.placeHolderTxt}>{placeholderTxt}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  search: {
    width: "100%",
    paddingHorizontal: 20,
    padding: 5,
    borderWidth: 2,
    borderColor: primary.white,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  innerSearch: {
    flexDirection: "row",
    gap: 20,
    padding: 5,
    alignItems: "center",
  },
  placeHolderTxt: {
    color: color.navy,
  },
});
