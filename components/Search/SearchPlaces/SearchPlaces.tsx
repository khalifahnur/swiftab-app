import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import restaurants from "@/components/Data";
import { useRouter } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { color, primary } from "@/constants/Colors";
import { EvilIcons } from "@expo/vector-icons";
import CardComponent from "./CardComponent";

export default function SearchPlaces() {
  const window = useWindowDimensions();
  const item_width =
    Platform.OS === "ios" ? window.width * 0.89 : window.width * 0.55;

  const restaurantsData = restaurants.flatMap((item) => item.data);
  const route = useRouter();

  const navigateHandler = (item) => {
    route.push({
      pathname: "/screens/restaurantdetails",
      params: { data: JSON.stringify(item) },
    });
  };
  return (
      <FlashList
        data={restaurantsData}
        renderItem={({ item }) => (
          <CardComponent
            image={item.image}
            restaurantName={item.restaurantName}
            rate={item.rate}
            location={item.location}
            handlePress={() => navigateHandler(item)}
          />
        )}
        ListHeaderComponent={() => (
          <>
            <View style={styles.headerContainer}>
              <Pressable style={styles.search}>
                <View style={styles.innerSearch}>
                  <EvilIcons name="search" size={20} color={color.black} />
                  <Text style={styles.placeHolderTxt}>Search places</Text>
                </View>
              </Pressable>
            </View>
            <View style={{paddingVertical:10,paddingHorizontal:10}}>
              <Text style={{fontWeight:'500',fontSize:15}}>{restaurantsData.length} Restaurants :</Text>
            </View>
          </>
        )}
        estimatedItemSize={150}
        contentContainerStyle={styles.container}
        showsHorizontalScrollIndicator={false}
      />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#f8f9fa",
  },
  headerContainer: {
    paddingVertical: 10,
  },
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
    color: color.black,
  },
});
