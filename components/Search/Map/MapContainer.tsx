import React, { useRef, useEffect, useState } from "react";
import { StyleSheet, useWindowDimensions, View, Image, Text, Dimensions } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from "react-native-maps";
import RestaurantsList from "./RestaurantsList";
import SearchComponent from "./SearchComponent";

export default function MapContainer({ restaurantsData, userLocation, displayAddress }) {
  const pin = require("../../../assets/images/pin.png");
  const ref = useRef(null);
  const mapRef = useRef(null);
  const window = useWindowDimensions();
  const CARD_WIDTH = window.width * 0.75;
  const [mapReady, setMapReady] = useState(false);

  // Flatten restaurants data for easier access
  const allRestaurants = restaurantsData.flatMap((section) => section.data);

  const handleMarkerPress = (restaurant) => {
    const index = allRestaurants.findIndex((item) => item._id === restaurant._id);

    if (ref.current && index !== -1) {
      const offset = index * CARD_WIDTH;
      ref.current.scrollToOffset({ offset, animated: true });
    }
  };

  // Center map on user location when component mounts
  useEffect(() => {
    if (mapReady && mapRef.current && userLocation) {
      mapRef.current.animateToRegion({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, [userLocation, mapReady]);

  return (
    <View style={styles.container}>

      <View style={styles.search}>
        <SearchComponent placeholderTxt={displayAddress} />
      </View>

      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        showsMyLocationButton
        initialRegion={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onMapReady={() => setMapReady(true)}
      >
        {allRestaurants.map((restaurant) => (
          <Marker
            key={restaurant._id}
            coordinate={{
              latitude: restaurant.latitude,
              longitude: restaurant.longitude,
            }}
            onPress={() => handleMarkerPress(restaurant)}
          >
            <Image source={pin} style={styles.markerImage} />
            <Callout>
              <View style={styles.callout}>
                <Text style={styles.calloutTitle}>{restaurant.restaurantName}</Text>
                <Text style={styles.calloutDescription}>{restaurant.location}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <View style={styles.res}>
        <RestaurantsList
          data={restaurantsData}
          scrollViewRef={ref}
          cardWidth={CARD_WIDTH}
        />
      </View>
    </View>
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
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  markerImage: {
    width: 30,
    height: 40,
    resizeMode: 'contain',
  },
  callout: {
    width: 200,
    padding: 10,
  },
  calloutTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 5,
  },
  calloutDescription: {
    fontSize: 12,
  }
});