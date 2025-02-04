import { RootState } from "@/redux/store/Store";
import { removeToWishlist } from "@/redux/WishlistSlice";
import { RestaurantParam } from "@/types";
import { AntDesign } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";

const Container = () => {
  const wishlistData = useSelector(
    (state: RootState) => state.wishlist.wishlist
  );
  const dispatch = useDispatch();

  const handleRemoveFromWishlist = (_id: string) => {
    dispatch(removeToWishlist(_id));
  };

  const NavigateHandler = (data: RestaurantParam) => {
    router.navigate({
      pathname: "/screens/restaurantdetails",
      params: { data: JSON.stringify(data) },
    });
  };

  const renderItem = ({ item }) => (
    <>
      <TouchableOpacity
        style={styles.card}
        onPress={() => NavigateHandler(item)}
      >
        {/* Restaurant Image */}
        <Image source={{ uri: item.image }} style={styles.image} />

        {/* Restaurant Details */}
        <View style={styles.details}>
          <Text style={styles.restaurantName}>{item.restaurantName}</Text>

          {/* Wishlist Heart Icon */}
          <TouchableOpacity
            style={styles.heartIcon}
            onPress={() => handleRemoveFromWishlist(item._id)}
          >
            <AntDesign name="heart" size={20} color={"red"} />
          </TouchableOpacity>

          {/* Location */}
          <Text style={styles.location} ellipsizeMode="tail" numberOfLines={1}>
            <Icon name="location-outline" size={12} color="#6F7A8A" />
            {item.about.map((loc) => loc.location).join(", ")} {item.location}
          </Text>

          {/* Rating */}
          <View style={styles.ratingContainer}>
            <Icon name="star" size={14} color="orange" />
            <Text style={styles.ratingText}>{item.rate}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.divider} />
    </>
  );

  return (
    <>
      {wishlistData.length > 0 ? (
        <FlashList
          data={wishlistData}
          renderItem={renderItem}
          ListHeaderComponent={() => (
            <View style={{ paddingVertical: 10,alignItems:'center' }}>
              <Text style={styles.header}>Wishlist</Text>
            </View>
          )}
          ListHeaderComponentStyle={{marginBottom:10}}
          estimatedItemSize={200}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <LottieView
            source={require("@/assets/images/lottie/emptywishlist.json")}
            autoPlay
            loop
            style={{ width: 100, height: 100 }}
          />
          <Text>Wishlist is empty</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 15,
    marginBottom: 10,
    paddingHorizontal:20
  },
  image: {
    width: 70,
    height: 80,
    borderRadius:20
  },
  heartIcon: {
    position: "absolute",
    top: 0,
    right: 5,
    padding: 5,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth:1,
    borderColor:"transparent",
    width: 40,
    height: 40,
  },
  details: {
    padding: 5,
    flex: 0.9,
  },
  restaurantName: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 2,
  },
  location: {
    color: "#6F7A8A",
    fontSize: 12,
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 5,
    color: "#6F7A8A",
    fontSize: 14,
  },
  divider: {
    width: "100%",
    borderColor: "#d8d8d8",
    borderWidth: 1,
    marginBottom: 10,
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  header: {
    fontSize: 16,
    color: "#000",
    textAlign: "left",
    fontWeight: "500",
  },
});

export default Container;
