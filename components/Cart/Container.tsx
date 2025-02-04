import {
  ActivityIndicator,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/Store";
import { removeItems } from "@/redux/CartSlice";
import { color } from "@/constants/Colors";
import LottieView from "lottie-react-native";
import QRCode from "react-native-qrcode-svg";

export default function Container() {
  const [Loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation();
  const router = useRouter();
  const window = useWindowDimensions();
  const MAX_WIDTH = window.width;

  const cart = useSelector((state: RootState) => state.cart.cart);
  const dispatch = useDispatch();
  // console.log(JSON.stringify(cart));

  const [modalVisible, setModalVisible] = useState(false);

  const HandleCheckOut = () => {
    if (cart !== null && cart.length > 0) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setModalVisible(true);
      }, 2000);
    } else {
      console.warn("Cart is empty or null.");
    }
  };

  const subTotal = cart.reduce(
    (acc, item) => acc + item.cost * item.quantity,
    0
  );
  const HandleRemoveItem = (id: number) => {
    dispatch(removeItems(id));
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  return (
    <>
      {cart?.length > 0 ? (
        <SafeAreaView style={styles.container}>
          <View style={[styles.header, { gap: (MAX_WIDTH * 1) / 2 - 80 }]}>
            <Pressable
              onPress={() => router.navigate("/(tabs)/")}
              style={{ backgroundColor: "#fff", padding: 10, borderRadius: 20 }}
            >
              <AntDesign name="arrowleft" size={20} color="black" />
            </Pressable>
            <Text
              style={{
                textAlign: "center",
                fontSize: 18,
                fontFamily: "PlusJakartaSansMedium",
              }}
            >
              Cart
            </Text>
          </View>

          <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
            {cart?.map((desc, index) => (
              <View key={index} style={styles.cartStyle}>
                <View style={{ flex: 0.2 }}>
                  <Image
                    source={{uri:desc.image}}
                    style={{ width: 50, height: 50 }}
                  />
                </View>
                <View style={{ flex: 0.7, alignItems: "center" }}>
                  <Text>{desc.name}</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      gap: 5,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "600",
                        paddingTop: 10,
                      }}
                    >
                      Ksh.{desc.cost}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "600",
                        paddingTop: 10,
                      }}
                    >
                      x
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "600",
                        paddingTop: 10,
                      }}
                    >
                      {desc.quantity}
                    </Text>
                  </View>
                </View>
                <View>
                  <Pressable
                    onPress={() => HandleRemoveItem(desc.id)}
                    style={{
                      backgroundColor: "#e8e8e8",
                      padding: 10,
                      borderRadius: 20,
                    }}
                  >
                    <AntDesign name="delete" size={20} color="#84d76b" />
                  </Pressable>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.cartTotalStyle}>
            <View
              style={{
                borderColor: "#e8e8e8",
                borderWidth: 1,
                marginBottom: 10,
              }}
            />
            <View style={styles.subtotal}>
              <Text
                style={{ fontSize: 16, fontWeight: "500", color: "#1e1e1e" }}
              >
                Subtotal
              </Text>
              <Text style={{ fontSize: 16, fontWeight: "500", color: "#000" }}>
                Ksh. {subTotal ? subTotal.toFixed(2) : "0.00"}
              </Text>
            </View>
            <Pressable style={styles.addToCartButton} onPress={HandleCheckOut}>
              {Loading && <ActivityIndicator size="small" color="white" />}
              <Text style={styles.addToCartText}>Generate QR-code</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      ) : (
        <View style={styles.container}>
        <Pressable style={styles.closeButton} onPress={()=>router.navigate("/(tabs)/")}>
        <AntDesign name="close" size={20} color="#fff" />
      </Pressable>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <LottieView
            source={require("@/assets/images/lottie/emptycart.json")}
            autoPlay
            loop
            style={{ width: 100, height: 100 }}
          />
          <Text>Cart is Empty</Text>
        </View>
        </View>
      )}

      {modalVisible && (
        <Modal
          visible={modalVisible}
          transparent={false}
          animationType="fade"
          statusBarTranslucent={true}
        >
          <View style={styles.centeredView}>
            <Pressable
              style={{ alignItems: "center", justifyContent: "center" }}
              onPress={()=>setModalVisible(false)}
            >
              <AntDesign name="closecircleo" size={24} color="black" />
            </Pressable>
            <View style={styles.modalView}>
              <QRCode value={JSON.stringify(cart)} size={200} />
            </View>
          </View>
          <Text
            style={{ textAlign: "center", fontSize: 12, fontWeight: "500" }}
          >
            Please wait for the waiter to take your order by scanning the qrcode
          </Text>
        </Modal>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F4F7",
  },
  header: {
    flexDirection: "row",
    marginTop: 5,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  cartStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    backgroundColor: "#fff",
    shadowColor: "#fff",
    shadowOffset: {
      width: 10,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 15,
  },
  cartTotalStyle: {
    paddingHorizontal: 20,
    position: "absolute",
    flex: 0.5,
    bottom: 20,
    left: 0,
    right: 0,
  },

  addToCartButton: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: color.green,
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  addToCartText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
  },
  subtotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 5,
    paddingTop: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    marginTop:50,
    marginRight:10,
    alignSelf: "flex-end",
    backgroundColor: color.gray,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
