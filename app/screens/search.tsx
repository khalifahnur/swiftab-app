import { StyleSheet, View, Text } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import MapContainer from '@/components/Search/Map/MapContainer'
import { useNavigation } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import * as Location from 'expo-location'
import { useQuery } from '@tanstack/react-query'
import { fetchNearMeRes } from '@/api/api'
import LottieView from 'lottie-react-native'
import { color } from '@/constants/Colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import Constants from "expo-constants";

interface LocationType {
  latitude: number | null;
  longitude: number | null;
}

export default function SearchScreen() {
  const navigation = useNavigation()
  const [location, setLocation] = useState<LocationType>({
      latitude: null,
      longitude: null,
    });
  const [displayAddress, setDisplayAddress] = useState('Locating...')
  const [isFetchingLocation, setIsFetchingLocation] = useState(true)

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['nearbyRestaurants', location.latitude, location.longitude],
    queryFn: () => fetchNearMeRes(location?.latitude!, location?.longitude!),
    enabled: !!location.latitude && !!location.longitude,
    staleTime: 10 * 60 * 1000
  })

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false })
  }, [])

  useEffect(() => {
    (async () => {
      try {
        // Request location permission
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          alert("Location permission denied");
          setDisplayAddress("Permission denied");
          return;
        }

        // Get high-accuracy location
        const { coords } = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,
        });
        const newLocation = { latitude: coords.latitude, longitude: coords.longitude };
        setLocation(newLocation);

        const address = await Location.reverseGeocodeAsync(newLocation);
        if (address.length > 0) {
          const { name, street, city, region, postalCode, country } = address[0];
          const formattedAddress = [
            name || street, 
            city || region, 
            postalCode,
            country,
          ]
            .filter(Boolean)
            .join(", ");
          setDisplayAddress(formattedAddress || "Unknown location");
        } else {
          setDisplayAddress("No address found");
        }

        const googleApiKey = Constants.expoConfig?.extra?.googleMapsApiKey;
        if (googleApiKey) {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&key=${googleApiKey}`
          );
          const data = await response.json();
          if (data.status === "OK" && data.results.length > 0) {
            setDisplayAddress(data.results[0].formatted_address);
          }
        }
      } catch (err: any) {
        console.error("Location Error:", err);
        alert("Error getting location");
        setDisplayAddress("Error fetching address");
      } finally {
        setIsFetchingLocation(false);
      }
    })();
  }, []);

  const transformedData = Array.isArray(data)
    ? data.map((item) => ({
        restaurantId: item._id,
        title: item.title,
        data: item.data?.map((entry) => ({
          ...entry,
          restaurantId: item._id,
        })) || [],
      }))
    : []

  if (isFetchingLocation || isLoading) {
    return (
      <View style={styles.loader}>
        <LottieView
          source={require('@/assets/images/lottie/loader.json')}
          autoPlay
          loop
          style={{ width: 100, height: 100 }}
        />
      </View>
    )
  }

  if (isError) {
    return (
      <View style={styles.container}>
        <Text>Error: {error.message}</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={color.green} style='auto'/>
      <MapContainer 
        restaurantsData={transformedData}
        userLocation={location}
        displayAddress={displayAddress}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})