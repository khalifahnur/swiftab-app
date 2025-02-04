import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { color } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

export default function AccountScreen() {
  const [userData, setUserData] = useState({});
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [initials, setInitials] = useState("");
  const [initials2, setInitials2] = useState("");
  const [email, setEmail] = useState("");

  const navigation = useNavigation();

  const router = useRouter();

  useEffect(() => {
    const FetchData = async () => {
      const userObj = JSON.parse(
        (await AsyncStorage.getItem("userObj")) || "{}"
      );
      setUserData(userObj.user);
    };
    FetchData();
  }, []);

  useEffect(() => {
    if (userData && userData.name) {
      const fullName = userData.name;
      const Name = fullName.split(" ");
      setFirstName(Name[0]);
      setSecondName(Name[1]);
      const i = firstName.slice(0, 1).toUpperCase();
      const s = secondName.slice(0, 1).toUpperCase();
      setInitials(i);
      setInitials2(s);
      setEmail(userData.email);
    } else return
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            backgroundColor: "#e8e8e8",
            padding: 10,
            borderRadius: 20,
          }}
        >
          <Ionicons name="arrow-back" size={20} color="#000" />
        </TouchableOpacity>
        <View
          style={{
            padding: 20,
            backgroundColor: "#fff",
            borderRadius: 30,
            borderColor: color.green,
            borderWidth: 2,
          }}
        >
          <Text style={{ fontSize: 12, fontWeight: "500", color: color.black }}>
            {initials}
            {initials2}
          </Text>
        </View>
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={{ color: color.black, fontSize: 20 }}>
          ACCOUNT DETAILS
        </Text>
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 14, marginBottom: 10, fontWeight: "500" }}>
          Your mobile number
        </Text>
        <TouchableOpacity
          style={{
            padding: 17,
            backgroundColor: "#e4e4e4",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text>{userData.phoneNumber}</Text>
          <Text style={{ color: "#84d76b" }}>Change</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 14, marginBottom: 10, fontWeight: "500" }}>
          Personal Details
        </Text>
        <View>
          <TouchableOpacity
            style={{
              padding: 13,
              backgroundColor: "#e4e4e4",
              flexDirection: "column",
              justifyContent: "space-between",
              borderRadius: 5,
            }}
          >
            <Text style={{ fontSize: 14, color: "gray" }}>First Name</Text>
            <Text style={{ fontSize: 16, color: "#000", fontWeight: "500" }}>
              {firstName}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={{
              padding: 13,
              backgroundColor: "#e4e4e4",
              flexDirection: "column",
              justifyContent: "space-between",
              marginTop: 13,
              borderRadius: 5,
            }}
          >
            <Text style={{ fontSize: 14, color: "gray" }}>Last Name</Text>
            <Text style={{ fontSize: 16, color: "#000", fontWeight: "500" }}>
              {secondName}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={{
              padding: 13,
              backgroundColor: "#e4e4e4",
              flexDirection: "column",
              justifyContent: "space-between",
              marginTop: 13,
              borderRadius: 5,
            }}
          >
            <Text style={{ fontSize: 14, color: "gray" }}>Email Address</Text>
            <Text style={{ fontSize: 16, color: "#000", fontWeight: "500" }}>
              {email}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      ></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.graywhite,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});
