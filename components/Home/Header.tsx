import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";
import { color } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/Store";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Header() {
  const [greeting, setGreeting] = useState<string>("");
  const [userData, setUserData] = useState({});

  const route = useRouter();
  const cart = useSelector((item: RootState) => item.cart.cart);

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
    const hour = moment().hour();
    let greetingText = "";
    if (hour >= 5 && hour < 12) {
      greetingText = "Good Morning";
    } else if (hour >= 12 && hour < 17) {
      greetingText = "Good Afternoon";
    } else {
      greetingText = "Good Evening";
    }

    setGreeting(greetingText);
  }, []);
  return (
    <>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>{greeting},</Text>
          <Text style={styles.username}>{userData.name}</Text>
        </View>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => route.replace("/screens/cart")}
        >
          {cart?.length > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cart.length}</Text>
            </View>
          )}
          <Ionicons name="cart-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <TouchableOpacity style={styles.searchContainer} onPress={()=>route.replace('/screens/search')}>
        <Ionicons
          name="search"
          size={20}
          color="#666"
          style={styles.searchIcon}
        />
        <View style={styles.searchInput}><Text>Search ...</Text></View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  greetings: {
    color: color.white,
    fontSize: 15,
    fontWeight: "400",
  },
  name: {
    color: color.white,
    fontSize: 16,
    fontWeight: "600",
  },
  cart: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 20,
  },
  search: {
    marginVertical: 15,
    alignItems: "center",
  },
  badge: {
    position: "absolute",
    height: 20,
    width: 20,
    backgroundColor: "red",
    top: -10,
    right: 0,
    borderRadius: 20,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
  },
  header: {
    backgroundColor: color.green,
    padding: 20,
    paddingTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomEndRadius:20,
    borderBottomStartRadius:20
  },
  greeting: {
    color: "#fff",
    fontSize: 16,
  },
  username: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  cartButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 10,
    borderRadius: 50,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 25,
    paddingHorizontal: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
});
