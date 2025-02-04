// MapContainer.js
import React, { useRef } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import Mapbox, {
  Camera,
  UserLocation,
  MapView,
  ShapeSource,
  SymbolLayer,
  Images,
  CircleLayer,
} from "@rnmapbox/maps";
import { color } from "@/constants/Colors";
import RestaurantsList from "./RestaurantsList";
import SearchComponent from "./SearchComponent";
import { SafeAreaView } from "react-native-safe-area-context";

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_KEY || "");

export default function MapContainer({
  restaurantsData,
  userLocation,
  displayAddress,
}) {
  const pin = require("../../../assets/images/pin.png");
  const ref = useRef(null);
  const window = useWindowDimensions();
  const CARD_WIDTH = window.width * 0.75;

  const AvailableRes = {
    type: "FeatureCollection",
    features: restaurantsData.flatMap((item) =>
      item.data.map((restaurant) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [restaurant.longitude, restaurant.latitude],
        },
        properties: {
          id: restaurant._id,
          name: restaurant.restaurantName,
          description: restaurant.location,
        },
      }))
    ),
  };

  const HandlePress = (id) => {
    const restaurants = restaurantsData.flatMap((section) => section.data);
    const index = restaurants.findIndex((item) => item._id === id);

    if (ref.current && index !== -1) {
      const offset = index * CARD_WIDTH;
      ref.current.scrollToOffset({ offset, animated: true });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.search}>
        <SearchComponent placeholderTxt={displayAddress} />
      </View>

      <MapView style={styles.map}>
        <Camera
          zoomLevel={12}
          centerCoordinate={[userLocation.longitude, userLocation.latitude]}
        />
        <UserLocation visible={true} showsUserHeadingIndicator={true} />

        <ShapeSource
          id="restaurants"
          cluster
          shape={AvailableRes}
          onPress={(e) => HandlePress(e.features?.[0]?.properties?.id)}
        >
          <CircleLayer id="cluster" style={{ circleColor: color.green }} />
          <SymbolLayer
            id="restaurants-icons"
            style={{
              iconImage: "pin",
              iconAllowOverlap: true,
              iconSize: 0.08,
              iconAnchor: "bottom",
            }}
          />
          <Images images={{ pin }} />
        </ShapeSource>
      </MapView>

      <View style={styles.res}>
        <RestaurantsList
          data={restaurantsData}
          scrollViewRef={ref}
          cardWidth={CARD_WIDTH}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  map: {
    flex: 1,
  },
  res: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "20%",
    paddingVertical: 2,
    width: "100%",
  },
  search: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    zIndex: 1,
    backgroundColor:'transparent'
  },
});
