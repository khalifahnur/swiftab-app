import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import Container from "@/components/Settings/Container";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { color } from "@/constants/Colors";
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FetchOrder } from "@/types";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { fetchAllOrders } from "@/api/api";

interface UserData {
  email: string;
  name: string;
  phoneNumber: string;
  userId: string;
}

export default function SettingsScreen() {
  const [userData, setUserData] = useState<UserData>({} as UserData);

  const { userId } = userData;

  const {
    data: allOrders,
    isLoading: isLoadingAll,
    refetch,
  } = useQuery<FetchOrder[], Error>({
    queryKey: ["allOrders", userId],
    queryFn: () => fetchAllOrders(userId),
    staleTime: 10 * 60 * 1000,
  } as UseQueryOptions<FetchOrder[], Error>);

  useEffect(() => {
    const FetchData = async () => {
      const userObj = JSON.parse(
        (await AsyncStorage.getItem("userObj")) || "{}"
      );
      setUserData(userObj.user);
    };
    FetchData();
  }, []);

  const isLoading = isLoadingAll;
  // const totalOrders = allOrders?.map((item)=>item)

  if (isLoading) {
    return (
      <View style={styles.lottieStyle}>
        <LottieView
          source={require("@/assets/images/lottie/loader.json")}
          autoPlay
          loop
          style={{ width: 100, height: 100 }}
        />
      </View>
    );
  }

  function countMenuItems(ordersData) {
    let totalMenuItems = 0;
    
    ordersData?.forEach(order => {
      // Each order.menu is an array, so we add its length to our total
      if (Array.isArray(order.menu)) {
        totalMenuItems += order.menu.length;
      }
    });
    
    return totalMenuItems;
  }
  
  const menuItemCount = countMenuItems(allOrders?.orders);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={color.green} style="auto" />
      <Container totalOrders={menuItemCount} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  lottieStyle: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
