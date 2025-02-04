import React, { useRef, useEffect, useState } from "react";
import MapboxGL from "@rnmapbox/maps";
import { View, StyleSheet, Dimensions, Image } from "react-native";

MapboxGL.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_KEY || null);

const { width: sWidth, height: sHeight } = Dimensions.get("window");

const Location = ({ data }) => {
  const pin = require("@/assets/images/pin.png");
  const longitude = data.longitude;
  const latitude = data.latitude;

  const [loaded, setLoaded] = useState(false);
  const cameraRef = useRef<MapboxGL.Camera>(null);

  useEffect(() => {
    if (loaded && cameraRef.current) {
      cameraRef.current.setCamera({
        centerCoordinate: [longitude, latitude],
        zoomLevel: 15,
        animationDuration: 1000,
      });
    }
  }, [loaded, longitude, latitude]);

  const onMapLoaded = () => {
    setLoaded(true);
  };

  return (
    <View style={styles.container}>
      <MapboxGL.MapView
        style={styles.map}
        styleURL={MapboxGL.StyleURL.Street}
        onMapLoaded={onMapLoaded}
      >
        <MapboxGL.Camera
          ref={cameraRef}
          centerCoordinate={[longitude, latitude]}
          zoomLevel={12}
        />

        {loaded && (
          <MapboxGL.PointAnnotation
            id="restaurantLocation"
            coordinate={[longitude, latitude]}
          >
            <Image source={pin} style={styles.pin} />
          </MapboxGL.PointAnnotation>
        )}
      </MapboxGL.MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: sWidth - 80,
    height: 150,
    borderRadius: 10,
    overflow: "hidden",
  },
  pin: {
    width: 50,
    height: 50,
  },
});

export default Location;
