import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { AntDesign } from "@expo/vector-icons";
import Search from "./Search";
import { color } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/Store";
import AsyncStorage from "@react-native-async-storage/async-storage";


// type headerProps = {
//   headerLayout:(event: LayoutChangeEvent) => void;
//   //marginBottomPosition:number;
// }

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
    <View 
    //onLayout={headerLayout}
    style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greetings}>{greeting},</Text>
          <Text style={styles.name}>{userData.name}</Text>
        </View>
        <Pressable style={styles.cart} onPress={()=>route.navigate("/screens/cart")}>
        {cart?.length > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{cart.length}</Text>
        </View>
      )}
          <AntDesign name="shoppingcart" size={20} color="black" />
        </Pressable>
      </View>
      <View style={styles.search}>
        <Search />
      </View> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding:20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greetings: {
    color:color.white,
    fontSize: 15,
    fontWeight: "400",
  },
  name: {
    color:color.white,
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
    alignItems:'center',
  },
  badge: {
    position: "absolute",
    height:20,
    width:20,
    backgroundColor: "red",
    top: -10,
    right: 0,
    borderRadius: 20,
  },
  badgeText: {
    color: "#fff", 
    fontSize: 12,
    textAlign:"center"
  },
});
