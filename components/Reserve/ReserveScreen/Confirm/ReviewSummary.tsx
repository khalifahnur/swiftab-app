import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import useStore from "@/store/useStore";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import "moment-timezone";
import Header from "@/components/Details/Header";
import { color } from "@/constants/Colors";
import Details from "./Details";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCreateReservation } from "@/hooks/reservationhooks/reservehook";
import { Reservation, ReservationResponse } from "@/types";
import SuccessModal from "./SuccessfulModal";

interface UserData {
  email: string;
  name: string;
  phoneNumber: string;
  userId: string;
}

const ReviewSummary: React.FC = () => {
  const param = useLocalSearchParams();
  const navigate = useNavigation();
  const {
    selectedDate,
    guestCount,
    selectedTableId,
    selectedStartTime,
    selectedEndTime,
    selectedFloorTxt,
  } = useStore();

  const [userData, setUserData] = useState<UserData>({} as UserData);
  const [fcmToken, setFcmToken] = useState<string | null>();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [reservationDetails, setReservationDetails] =
    useState<ReservationResponse | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reserveMutation = useCreateReservation({
    onSuccess: (data) => {
      setReservationDetails(data);
      setShowSuccessModal(true);
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    },
  });

  const handleModalVisible = () => {
    setShowSuccessModal(!showSuccessModal);
  };

  const image = Array.isArray(param.image) ? param.image[0] : param.image;
  const location = Array.isArray(param.location)
    ? param.location[0]
    : param.location;
  const rate = Array.isArray(param.rate) ? param.rate[0] : param.rate;
  const restaurantName = Array.isArray(param.restaurantName)
    ? param.restaurantName[0]
    : param.restaurantName;
  const restaurantId = Array.isArray(param.restaurantId)
    ? param.restaurantId[0]
    : param.restaurantId;
  const longitude = Array.isArray(param.longitude)
    ? param.longitude[0]
    : param.longitude;
  const latitude = Array.isArray(param.latitude)
    ? param.latitude[0]
    : param.latitude;

  useEffect(() => {
    const FetchData = async () => {
      const userObj = JSON.parse(
        (await AsyncStorage.getItem("userObj")) || "{}"
      );
      const fcmToken = await AsyncStorage.getItem("fcmToken");
      setUserData(userObj.user);
      setFcmToken(fcmToken);
    };
    FetchData();
  }, []);

  const dateTimeString = `${selectedDate}T${selectedStartTime}:00`;
  
  const dateTime = moment.tz(dateTimeString, "Africa/Nairobi");

  const formattedDateTime = dateTime.format("MMM Do, YYYY | HH:mm A");

  const normalizeStartTime = dateTime.toDate();

  const fullEndTime = moment.tz(
    `${selectedDate}T${selectedEndTime}:00`,
    "Africa/Nairobi"
  ).toDate()

  const nowInNairobi = moment.tz("Africa/Nairobi").format("MMM Do, YYYY | HH:mm A");

  // console.log("startTime", formattedDateTime);
  // console.log("normalized start time", normalizeStartTime);
  // console.log("fullEndTime", fullEndTime);

  // console.log(nowInNairobi)

  const { email, name, phoneNumber, userId } = userData;

  const handleReservation = () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    if (!userData || !restaurantId || !userId) {
      Alert.alert("Error", "Missing user or restaurant information");
      return;
    }

    const reservationData: Reservation = {
      restaurantInfo: {
        restaurantId,
        restaurantName,
        image,
        location,
        longitude,
        latitude,
        rate,
      },
      reservationInfo: {
        userId,
        name,
        email,
        phoneNumber,
        bookingDate: normalizeStartTime,
        bookingFor: normalizeStartTime,
        endTime: fullEndTime,
        guest: guestCount,
        tableNumber: selectedTableId,
        diningArea: selectedFloorTxt,
      },
    };

    reserveMutation.mutate({
      restaurantId,
      userId,
      fcmToken,
      data: reservationData,
    });
  };

  useEffect(() => {
    if (!showSuccessModal) setIsSubmitting(false);
  }, [showSuccessModal]);

  useLayoutEffect(() => {
    navigate.setOptions({
      headerShown: false,
    });
  });

  return (
    <>
      <Header headerText="Summary" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={{ uri: image }} style={styles.restaurantImage} />
          <View style={styles.restaurantInfo}>
            <Text style={styles.restaurantName}>{param.restaurantName}</Text>
            <Text style={styles.restaurantDetails}>15 min • Italian</Text>
            <Text style={styles.restaurantAddress}>{param.location}</Text>
          </View>
        </View>

        <Details
          name={name}
          email={email}
          phoneNumber={phoneNumber}
          bookingDate={nowInNairobi} // Use formatted date for display
          formattedDateTime={formattedDateTime}
          guestCount={guestCount}
          selectedTableId={selectedTableId}
          selectedFloor={selectedFloorTxt}
        />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleReservation}>
          <Text style={styles.buttonText}>Confirm Booking</Text>
        </TouchableOpacity>
      </View>
      <SuccessModal
        visible={showSuccessModal}
        handleModalVisible={handleModalVisible}
        reservationDetails={reservationDetails}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    marginBottom: 20,
  },
  restaurantImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  restaurantInfo: {
    marginLeft: 15,
    justifyContent: "center",
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  restaurantDetails: {
    fontSize: 14,
    color: "#666666",
    marginVertical: 5,
  },
  restaurantAddress: {
    fontSize: 12,
    color: "#666666",
  },
  footer: {
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: color.green,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    bottom: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ReviewSummary;
