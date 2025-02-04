import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import ModalScreen from "./Modal";
import { MenuItem } from "@/types";
import LottieView from "lottie-react-native";

export default function Container() {
  const params = useLocalSearchParams();
  const { width: MAX_WIDTH } = useWindowDimensions();
  const menuType = params.menuType as string;
  const router = useRouter();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState<MenuItem>();
  const [data, setData] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataString = Array.isArray(params.data)
          ? params.data[0]
          : params.data;
        const parsedData: MenuItem[] = dataString ? JSON.parse(dataString) : [];
        setData(parsedData);
      } catch (error) {
        console.error("Error parsing data:", error);
      }
    };

    fetchData();
  }, [params.data]);

  // Reset imagesLoaded when data changes
  useEffect(() => {
    setImagesLoaded(0);
  }, [data]);

  useEffect(() => {
    if (data.length === 0) {
      setLoading(false); // No data to load
    } else if (imagesLoaded === data.length) {
      setLoading(false);
    }
  }, [imagesLoaded, data]);

  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };

  const handleImageError = () => {
    setImagesLoaded((prev) => prev + 1);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <LottieView
          source={require("@/assets/images/lottie/loader.json")}
          autoPlay
          loop
          style={{ width: 100, height: 100 }}
        />
      </View>
    );
  }

  const handleModal = (item: MenuItem) => {
    setModalVisible(true);
    setModalData(item);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, { gap: (MAX_WIDTH * 1) / 2 - 80 }]}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <AntDesign name="arrowleft" size={20} color="black" />
        </Pressable>
        <Text style={styles.headerText}>{menuType.toUpperCase()}</Text>
      </View>

      <View style={styles.menuList}>
        {data?.map((item, index) => (
          <Pressable
            onPress={() => handleModal(item)}
            key={item._id}
            style={styles.cartStyle}
          >
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: item.image }}
                style={styles.itemImage}
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            </View>
            <View style={styles.itemDetails}>
              <Text>{item.name}</Text>
              <Text
                style={styles.itemDescription}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.description}
              </Text>
              <Text style={styles.itemCost}>Ksh.{item.cost}</Text>
            </View>
          </Pressable>
        ))}
      </View>
      <ModalScreen
        modalVisible={modalVisible}
        data={modalData}
        setModalVisible={setModalVisible}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    marginTop: 5,
    paddingHorizontal: 20,
    alignItems: "center",
    marginVertical:5
  },
  backButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 20,
  },
  headerText: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "PlusJakartaSansMedium",
  },
  menuList: {
    marginTop: 20,
    paddingHorizontal: 20,
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
  imageContainer: {
    flex: 0.2,
  },
  itemImage: {
    width: 50,
    height: 50,
  },
  itemDetails: {
    flex: 0.8,
  },
  itemDescription: {
    fontSize: 14,
    fontWeight: "600",
    paddingTop: 10,
    textAlign: "justify",
  },
  itemCost: {
    fontSize: 14,
    fontWeight: "600",
    paddingTop: 10,
  },
});
