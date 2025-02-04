import { ImageBackground, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import DetailsTabs from "./DetailsTab";
import { color } from "@/constants/Colors";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/CartSlice";
import ModalLoader from "@/components/ModalLoader";
import { useRouter } from "expo-router";

type modalLoaderProps = {
  modalVisible: boolean;
  data: {
    id: number;
    image: string;
    cost: number;
    rate: number;
    description: string;
    name: string;
  };
  setModalVisible: (visible: boolean) => void;
};
export default function ModalScreen({
  modalVisible,
  setModalVisible,
  data,
}: modalLoaderProps) {
  const [selectedValue, setSelectedValue] = useState<string>("Reviews");
  const [cost, setCost] = useState<number>(1);
  const [btnLoading,setBtnLoading] = useState(false);

  const dispatch = useDispatch();
  const route = useRouter();

  const HandleAdd = () => {
    setCost(cost + 1);
  };

  const HandleSub = () => {
    if (cost > 1) {
      setCost(cost - 1);
    } else {
      setCost(1);
    }
  };

  const HandleAddToCart = () => {
    setBtnLoading(true);
    if (data) {
      dispatch(
        addToCart({
          id: data?.id,
          name: data?.name,
          image: data?.image,
          cost: data.cost * cost,
          quantity: cost,
          description:data.description,
          rate:data.rate
        })
      );
      setTimeout(()=>{
        setBtnLoading(false)
      },3000)
      
      route.navigate("/(tabs)/")
    }
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      statusBarTranslucent={false}
    >
      <>
        <View style={styles.overlay}>
          <ImageBackground source={{uri:data?.image}} resizeMode="cover"
                  imageStyle={styles.upperContainer} style={{flex:1}}>
            <View style={styles.header}>
              <Pressable
                style={styles.iconButton}
                onPress={() => setModalVisible(false)}
              >
                <Ionicons name="close" size={20} color="black" />
              </Pressable>
            </View>
            {/* <View style={styles.img}>
              <Image source={{uri:data?.image}} style={styles.image} />
            </View> */}
          </ImageBackground>

          <View style={styles.bottomContainer}>
            <View style={styles.productDetails}>
              <View>
                <Text style={styles.productName}>{data?.name}</Text>
              </View>
              <Text style={styles.productPrice}>
                Ksh.{data?.cost * cost}.00
              </Text>
            </View>
            <DetailsTabs
              selectedTab={selectedValue}
              setSelectedTab={setSelectedValue}
              tabsName={["Reviews", "Ratings"]}
            >
              {selectedValue === "Reviews" ? (
                <Text>
                  {data?.description}
                  {/* <Text style={styles.seeMore}>See more.</Text> */}
                </Text>
              ) : (
                <Text>{data?.rate}</Text>
              )}
            </DetailsTabs>
          </View>
        </View>

        {/* bottom container */}
        <View style={styles.cartContainer}>
          <View style={styles.quantityContainer}>
            <Pressable
              style={[
                styles.quantityButton,
                { backgroundColor: cost > 1 ? "#cce9d5" : "#fff" },
              ]}
              onPress={HandleSub}
            >
              <AntDesign name="minus" size={24} color={"black"} />
            </Pressable>
            <Text style={styles.quantityText}>{cost}</Text>
            <Pressable style={styles.quantityButton} onPress={HandleAdd}>
              <Ionicons name="add-outline" size={24} color="black" />
            </Pressable>
          </View>
          <Pressable
            style={styles.addToCartButton}
            onPress={HandleAddToCart}
          >
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </Pressable>
        </View>
        {
          btnLoading && (
            <ModalLoader loading={btnLoading} />
          )
        }
      </>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#F2F4F7",
  },
  upperContainer: {
    //backgroundColor: color.green,
    borderBottomLeftRadius: 200,
    borderBottomRightRadius: 200,
    paddingBottom: 20,
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  iconButton: {
    backgroundColor: "#f8f8f8",
    padding: 10,
    borderRadius: 20,
  },
  imageContainer: {
    position: "absolute",
    bottom: -40,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 20,
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingTop: 70,
    flex: 0.4,
  },
  productDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  productName: {
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
  },
  productCategory: {
    fontSize: 14,
    color: "#666",
  },
  productPrice: {
    fontSize: 17,
    fontWeight: "400",
    color: "red",
    textAlign: "center",
  },
  seeMore: {
    color: "red",
  },
  cartContainer: {
    backgroundColor: "#F2F4F7",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 100,
    paddingHorizontal: 20,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 20,
  },
  quantityButton: {
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: "#cce9d5",
    borderRadius: 20,
  },
  quantityText: {
    fontSize: 20,
    fontWeight: "500",
    marginHorizontal: 10,
  },
  addToCartButton: {
    backgroundColor: color.green,
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  addToCartText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
  },
  img:{
    position:'absolute',
    bottom:0,
    right:0,
    top:330,
    left:0,
    alignItems:'center',
    justifyContent:'center',
  },
});
