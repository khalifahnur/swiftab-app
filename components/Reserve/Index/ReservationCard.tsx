import { color } from "@/constants/Colors";
import { userCancellationReservation } from "@/hooks/reservationhooks/reservehook";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Switch,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

interface prop {
  items: {
    date: string;
    time: number;
    location: string;
    rate: string;
    image: string;
    restaurantName: string;
    restaurantId: string;
    reservationId: string;
    id: string;
  };
}

interface UserData {
  email: string;
  name: string;
  phoneNumber: string;
  userId: string;
}

type cancelParams = {
  id:string;
  userId:string;
  restaurantId:string;
  reservationId:string;
}

const ReservationCard = ({ items }: prop) => {
  console.log(items)
  const [isRemind, setIsRemind] = useState(false);
  const [userData, setUserData] = useState<UserData>({} as UserData);

  const formattedTime = moment(items.time).format("MMM - DD, YYYY  HH:mm A");
  const image = items.image;
  const location = items.location;
  const rate = items.rate;
  const restaurantName = items.restaurantName;
  const reservationId = items.reservationId;
  const restaurantId = items.restaurantId;
  const id = items.id

  //console.log(formattedTime);

  useEffect(() => {
    const FetchData = async () => {
      const userObj = JSON.parse(
        (await AsyncStorage.getItem("userObj")) || "{}"
      );
      setUserData(userObj.user);
    };
    FetchData();
  }, []);

  const {userId} = userData;

  const handleCancelMutate = userCancellationReservation();

  const handleCancelReservation = ({id,userId,reservationId,restaurantId}:cancelParams)=>{
     if (!id || !userId || !reservationId || ! restaurantId){
      return console.log("all fields are required")
     }

     handleCancelMutate.mutate({id,userId,restaurantId,reservationId})

  }

  return (
    <View style={styles.cardContainer}>
      {/* Date and Reminder */}
      <View style={styles.header}>
        <Text style={styles.dateText}>{formattedTime}</Text>
        <View style={styles.reminder}>
          <Text style={styles.remindText}>Remind me</Text>
          <Switch
            value={isRemind}
            onValueChange={(value) => setIsRemind(value)}
            trackColor={{ false: "#ccc", true: "#008080" }}
            thumbColor={isRemind ? "#008080" : "#f4f3f4"}
          />
        </View>
      </View>
      <View style={styles.divider} />
      {/* Image and Details */}
      <View style={styles.detailsRow}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.info}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{restaurantName}</Text>
            <View style={styles.rating}>
              <Icon name="star" size={16} color="gold" />
              <Text style={styles.ratingText}>{rate}</Text>
            </View>
          </View>
          <View style={styles.iconRow}>
            <Icon name="time-outline" size={16} color="#6F7A8A" />
            <Text style={styles.iconText}>15 min</Text>
            <Icon name="restaurant-outline" size={16} color="#6F7A8A" />
            <Text style={styles.iconText}>Italian</Text>
          </View>
          <View style={styles.iconRow}>
            <Icon name="location-outline" size={16} color="#6F7A8A" />
            <Text style={styles.iconText}>{location}</Text>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View>
        <TouchableOpacity style={styles.cancelButton} onPress={()=>handleCancelReservation({id,userId,reservationId,restaurantId})}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.navigateButton}>
          <Text style={styles.navigateText}>Navigate</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    marginVertical: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    alignItems: "center",
  },
  dateText: {
    fontSize: 14,
    color: "#6F7A8A",
  },
  reminder: {
    flexDirection: "row",
    alignItems: "center",
  },
  remindText: {
    fontSize: 14,
    marginRight: 5,
  },
  detailsRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  nameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  name: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#333",
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 12,
    color: "#6F7A8A",
    marginLeft: 3,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
  },
  iconText: {
    fontSize: 12,
    color: "#6F7A8A",
    marginLeft: 5,
    marginRight: 15,
  },

  cancelButton: {
    backgroundColor: color.green,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    width: "40%",
    alignSelf: "flex-end",
  },
  cancelText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  navigateButton: {
    backgroundColor: "#A19BFC",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  navigateText: {
    color: "#fff",
    fontWeight: "bold",
  },
  divider: {
    width: "100%",
    marginBottom: 3,
    borderWidth: 1,
    borderColor: "#f8f8f8",
  },
});

export default ReservationCard;
