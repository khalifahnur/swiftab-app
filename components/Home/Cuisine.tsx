import {
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import React from "react";
import NewSubHeader from "./NewSubHeader";
import { FlashList } from "@shopify/flash-list";

const data = [
  {
    id: 9,
    image: require("../../assets/images/cuisine/us.jpeg"),
    name: "American",
  },
  {
    id: 10,
    image: require("../../assets/images/cuisine/italia.jpeg"),
    name: "Italian",
  },
  {
    id: 11,
    image: require("../../assets/images/cuisine/somali.jpeg"),
    name: "Somali",
  },
  {
    id: 12,
    image: require("../../assets/images/cuisine/kenyan.jpeg"),
    name: "Kenyan",
  },
  {
    id: 13,
    image: require("../../assets/images/cuisine/seafood.jpeg"),
    name: "Sea Food",
  },
  {
    id: 14,
    image: require("../../assets/images/cuisine/arab.jpeg"),
    name: "Arab",
  },
  {
    id: 15,
    image: require("../../assets/images/cuisine/japanese.jpeg"),
    name: "Japanese",
  },
];
export default function Cuisine() {
  const window = useWindowDimensions();
  const item_width =
    Platform.OS === "ios" ? window.width * 0.89 : window.width * .5;

  return (
      <FlashList
        data={data}
        // snapToInterval={item_width}
        snapToAlignment="center"
        decelerationRate={Platform.OS === "ios" ? 0 : 0.2}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity style={styles.subContainer}>
            <ImageBackground source={item.image} style={styles.restaurantImage}>
              <Text style={styles.overlayText}>{item.name}</Text>
            </ImageBackground>
            </TouchableOpacity>
          );
        }}
        contentContainerStyle={styles.container}
        ListHeaderComponent={()=><NewSubHeader headerTitle="Browse by cuisine" />}
        ListHeaderComponentStyle={{alignItems:'center',justifyContent:'center',}}
        horizontal
        estimatedItemSize={150}
        showsHorizontalScrollIndicator={false}
      />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  subContainer: {
    paddingHorizontal: 10,
    paddingVertical:5
  },
  restaurantImage: {
    height:70,
    width:70,
    borderRadius: 50,
    overflow:'hidden'

  },
  overlayText: {
    color: 'white',
    fontSize: 10,
    lineHeight: 70,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
});
