import {
  Image,
  StyleSheet,
  Text,
  View,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { color } from "@/constants/Colors";

type cardProps = {
  image: ImageSourcePropType;
  restaurantName: string;
  rate: number;
  location: string;
  handlePress?: () => void;
  cardWidth?:number | 220
};
export default function Card({
  image,
  restaurantName,
  rate,
  location,
  handlePress,
  cardWidth
}: cardProps) {
  return (
    <View style={styles.restaurantCard}>
      <TouchableOpacity onPress={handlePress}>
        <Image source={{ uri: image }} style={styles.restaurantImage} />
        <View style={styles.restaurantInfo}>
          <Text style={styles.restaurantName}>{restaurantName}</Text>
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={16} color="#666" />
            <Text style={styles.locationText}>{location}</Text>
          </View>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>{rate}</Text>
            <Ionicons name="star" size={14} color="#FFD700" />
          </View>
        </View>
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  restaurantCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginLeft: 20,
    width: 250,
    overflow: 'hidden',
  },
  restaurantImage: {
    width: '100%',
    height: 150,
  },
  restaurantInfo: {
    padding: 15,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  locationText: {
    color: '#666',
    marginLeft: 5,
    fontSize: 14,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginRight: 5,
    fontWeight: '600',
  }
})
