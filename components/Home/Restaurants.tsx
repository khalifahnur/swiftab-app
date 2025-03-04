import {
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import Card from "../Card";
import { color } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { Menu, RestaurantData } from "@/types";
import NewSubHeader from "./NewSubHeader";

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

interface Section {
  title: string;
  data: RestaurantData[];
}

export default function Restaurants({
  title,
  data,
}: {
  title: string;
  data: SectionData[];
}) {
  const window = useWindowDimensions();
  const item_width =
    Platform.OS === "ios" ? window.width * 0.89 : window.width * 0.55;
  const route = useRouter();

  const NavigateHandler = (RestaurantData: RestaurantData) => {
    return route.replace({
      pathname: "/screens/restaurantdetails",
      params: { data: JSON.stringify(RestaurantData) },
    });
  };

  const sectionRestaurants = data.filter((item) => item.title === title);

  return (
    <View style={styles.section}>
      <NewSubHeader headerTitle={title} btnText="More" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        decelerationRate={Platform.OS === "ios" ? 0 : 0}
      >
        {sectionRestaurants.map((restaurant) =>
          restaurant.data.map((item: RestaurantData) => (
            <Card
              key={item._id}
              restaurantName={item.restaurantName}
              location={item.location}
              rate={item.rate}
              handlePress={() => NavigateHandler(item)}
              image={item.image}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
  },
});
