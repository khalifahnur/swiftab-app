import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Ionicons,
  Entypo,
  MaterialIcons,
  FontAwesome,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from 'expo-router';
import { BackHandler } from 'react-native';
import BottomModal from "./BottomModal";
import { color } from "@/constants/Colors";
import LottieView from "lottie-react-native";
import BottomPayment from "./BottomPayment";
import MpesaModal from "./MpesaModal";

export default function Setting() {
  const router = useRouter();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [notOff, setNotOff] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);

  const [mpesaModal, setMpesaModal] = useState<boolean>(false);
  
    const LogOutHandler = async () => {
      try {
        await AsyncStorage.clear();
        
        // Reset navigation stack
        router.replace({
          pathname: "/(auth)/signin",
          params: {
            screen: "signin",
            params: { session: Date.now() }
          }
        });
  
        // Handle Android back button after logout
        const backAction = () => {
          BackHandler.exitApp();
          return true;
        };
  
        BackHandler.addEventListener('hardwareBackPress', backAction);
  
        return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
  
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };


  const handleVisible = () => {
    setPaymentModal(false);
    setMpesaModal(true)
  };

  const handleVisibleMpesaModal = ()=>{
    setMpesaModal(false)
  }

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <LottieView
          source={require("@/assets/images/lottie/loader.json")}
          autoPlay
          loop
          style={{ width: 100, height: 100 }}
        />
      </View>
    );
  }

  return (
    <>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={20} color="#000" />
            </TouchableOpacity>
            <Text style={styles.title}>Settings</Text>
          </View>

          {/* Notifications */}
          <TouchableOpacity
            style={styles.details}
            onPress={() => setNotOff(!notOff)}
          >
            <View style={styles.detailRow}>
              <Ionicons name="notifications" size={24} color="black" />
              <Text style={styles.detailText}>Notifications</Text>
              <FontAwesome
                name={notOff ? "toggle-on" : "toggle-off"}
                size={24}
                color="black"
              />
            </View>
          </TouchableOpacity>

          {/* Payment */}
          <TouchableOpacity
            style={styles.details}
            onPress={() => setPaymentModal(true)}
          >
            <View style={styles.detailRow}>
              <MaterialIcons name="language" size={24} color="black" />
              <Text style={styles.detailText}>Payment</Text>
              <Entypo name="chevron-right" size={24} color="black" />
            </View>
          </TouchableOpacity>

          {/* Log Out */}
          <TouchableOpacity
            style={styles.details}
            onPress={() => setModalVisible(true)}
          >
            <View style={styles.detailRow}>
              <MaterialIcons name="logout" size={24} color="black" />
              <Text style={styles.detailText}>Log Out</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {modalVisible && <BottomModal logOutHandle={LogOutHandler} />}
      {paymentModal && <BottomPayment visibleModal={handleVisible}  closeModal={() => setPaymentModal(false)} />}

      <Modal animationType="slide"  visible={mpesaModal}>
        <MpesaModal 
        visibilityModal={handleVisibleMpesaModal} 
        />
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: color.graywhite,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: "auto",
    marginRight: "auto",
  },
  backButton: {
    backgroundColor: "#e8e8e8",
    padding: 10,
    borderRadius: 20,
  },
  details: {
    marginTop: 10,
    padding: 15,
    backgroundColor: "#f8f8f8",
    borderColor: "#e8e8e8",
    borderWidth: 2,
    borderRadius: 10,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailText: {
    marginRight: "auto",
    marginLeft: 30,
    fontSize: 16,
  },
  loaderContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
