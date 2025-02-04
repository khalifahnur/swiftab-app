import {
  FlatList,
  Platform,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import React from "react";
import Card from "../Card";
import { color } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { Menu, RestaurantData } from "@/types";


type RestaurantProps = {
  _id: string; 
  about: object[]; 
  image: string; 
  latitude: number; 
  location: string; 
  longitude: number; 
  menu: Menu;
  rate: number; 
  restaurantId: string; 
  restaurantName: string; 
  review: object[];
};

export default function Restaurants({ data }:RestaurantProps) {
  const window = useWindowDimensions();
  const item_width =
    Platform.OS === "ios" ? window.width * 0.89 : window.width * 0.55;
  const route = useRouter();

  const NavigateHandler = (RestaurantData:RestaurantData) => {
    return(
      route.push({
        pathname: "/screens/restaurantdetails",
        params: { data: JSON.stringify(RestaurantData) },
      })
    )
    
  };
  return (
    <>
      <FlatList
        data={data}
        snapToInterval={item_width}
        snapToAlignment="center"
        decelerationRate={Platform.OS === "ios" ? 0 : 0}
        renderItem={({ item }) => {
          const imgUrl = item.image
          return (
            <Card
              image={imgUrl}
              restaurantName={item.restaurantName}
              rate={item.rate}
              location={item.location}
              handlePress={() => NavigateHandler(item)}
              cardWidth={220}
            />
          );
        }}
        //estimatedItemSize={200}
        contentContainerStyle={styles.container}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: color.white,
  },
});
