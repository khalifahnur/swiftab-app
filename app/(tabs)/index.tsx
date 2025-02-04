import { StyleSheet, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { color } from "@/constants/Colors";
import Container from "@/components/Home/Container";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllRes } from "@/api/api";
import { Restaurant } from "@/types";
import LottieView from "lottie-react-native";

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const { data, isLoading, isError, error, refetch, isPending } = useQuery<{
    message: string;
    restaurants: Restaurant[];
  }>({
    queryKey: ["restaurants"],
    queryFn: fetchAllRes,
    staleTime: 10 * 60 * 1000,
  });

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refetch(); 
    } catch (error) {
      console.error("Error during refresh:", error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (!data) {
      refetch();
    }
  }, [data, refetch]);

  

  if (isError) {
    return (
      <View>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  const transformedData = Array.isArray(data?.restaurants)
    ? data.restaurants.map((item) => ({
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

  const groupedData = transformedData.reduce((acc, item) => {
    if (!item.title || !item.data) return acc;
    const existing = acc.find((section) => section.title === item.title);
    if (existing) {
      existing.data.push(...item.data);
    } else {
      acc.push({ title: item.title, data: [...item.data] });
    }
    return acc;
  }, [] as { title: string; data: any[] }[]);

  if (isLoading && isPending ) {
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

  console.log("fetched data",data)

console.log("restaurants",data?.restaurants)

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={color.green} style='auto'/>
      <Container
        data={groupedData}
        refreshing={refreshing}
        onRefresh={onRefresh}
        isLoading={isLoading}
      />
      <View style={styles.footer} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor:"#fbfbfb",
    backgroundColor: color.white,
  },
  footer: {
    backgroundColor: color.green,
    height: 54,
  },
});
