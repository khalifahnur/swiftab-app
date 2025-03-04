import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { color } from "@/constants/Colors";
import Container from "@/components/Home/Container";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllRes, fetchRecentlyRes } from "@/api/api";
import { Restaurant } from "@/types";
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserData {
  email: string;
  name: string;
  phoneNumber: string;
  userId: string;
}

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [userData, setUserData] = useState<UserData>({} as UserData);

  useEffect(() => {
    const FetchData = async () => {
      const userObj = JSON.parse(
        (await AsyncStorage.getItem("userObj")) || "{}"
      );
      setUserData(userObj.user);
    };
    FetchData();
  }, []);


  // Fetch all restaurants
  const {
    data: restaurantsData,
    isLoading: isRestaurantsLoading,
    isError: isRestaurantsError,
    error: restaurantsError,
    refetch: refetchRestaurants,
  } = useQuery<{ message: string; restaurants: Restaurant[] }>({
    queryKey: ["restaurants"],
    queryFn: fetchAllRes,
    staleTime: 10 * 60 * 1000,
  });

  const {
    data: recentlyViewedData,
    isLoading: isRecentlyViewedLoading,
    isError: isRecentlyViewedError,
    error: recentlyViewedError,
    refetch: refetchRecentlyViewed,
  } = useQuery<{ message: string; restaurants: Restaurant[] }>({
    queryKey: ["recentlyViewed",userData.userId],
    queryFn: () => fetchRecentlyRes(userData.userId),
    staleTime: 10 * 60 * 1000,
  });

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([refetchRestaurants(), refetchRecentlyViewed()]);
    } catch (error) {
      console.error("Error during refresh:", error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (!restaurantsData || !recentlyViewedData) {
      refetchRestaurants();
      refetchRecentlyViewed();
    }
  }, [restaurantsData, recentlyViewedData, refetchRestaurants, refetchRecentlyViewed]);

  // Handle errors
  if (isRestaurantsError || isRecentlyViewedError) {
    return (
      <View>
        <Text>Error: {restaurantsError?.message || recentlyViewedError?.message}</Text>
      </View>
    );
  }

  // Transform data for all restaurants
  const transformedRestaurants = Array.isArray(restaurantsData?.restaurants)
  ? restaurantsData.restaurants.map((item) => ({
      restaurantId: item._id,
      title: item.title,
      data:
        Array.isArray(item.data) && item.data.length > 0
          ? item.data.map((entry, index) => ({
              ...entry,
              _id: entry._id || `${item._id}-${index}`, // Ensure unique _id
              restaurantId: item._id,
            }))
          : [],
    }))
  : [];

  // Transform data for recently viewed restaurants
  const transformedRecentlyViewed = Array.isArray(recentlyViewedData?.restaurants)
    ? recentlyViewedData.restaurants.map((item) => ({
        restaurantId: item._id,
        title: item.title,
        data:
          Array.isArray(item.data) && item.data.length > 0
            ? item.data.map((entry) => ({
                ...entry,
                restaurantId: item._id,
              }))
            : [],
      }))
    : [];

  // Show loading state
  if (isRestaurantsLoading || isRecentlyViewedLoading) {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <LottieView
          source={require("@/assets/images/lottie/loader.json")}
          autoPlay
          loop
          style={{ width: 100, height: 100 }}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={color.green} style="auto" />
      <Container
        allRestaurants={transformedRestaurants}
        //recentlyViewed={recentlyViewedData}
        refreshing={refreshing}
        onRefresh={onRefresh}
        isLoading={isRestaurantsLoading || isRecentlyViewedLoading}
      />
      {/* <View style={styles.footer} /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  footer: {
    backgroundColor: color.green,
    height: 60,
  },
});