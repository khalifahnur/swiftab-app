import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { EvilIcons, MaterialIcons, Octicons } from "@expo/vector-icons";

export default function Info({ data }) {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "#e8e8e8",
            padding: 5,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: "green", fontSize: 8, fontWeight: "400" }}>
            10% off
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <MaterialIcons name="star-rate" size={20} color="yellow" />
          <Text style={styles.ratetxt}>{data.rate}(100) reviews</Text>
        </View>
      </View>

      <View style={{ marginTop: 10 }}>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <EvilIcons name="clock" size={20} color="#000" />
            <Text style={styles.txt}>15 Min</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Octicons name="dot-fill" size={20} color="#000" />
            <Text style={styles.txt}>
              Kenyan
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", gap: 10, paddingTop: 10 }}>
          <EvilIcons name="location" size={20} color="#000" />
          <Text style={styles.txt}>
             {data.location}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  txt: {
    color: "#000",
    fontSize: 14,
    fontWeight: "600",
  },
  ratetxt: {
    color: "#000",
    fontSize: 14,
    fontWeight: "600",
    alignItems: "center",
    textAlign: "center",
  },
});
