import React, { useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Ionicons } from "@expo/vector-icons";
import { color } from "@/constants/Colors";
import OrderDetailFooter from "./OrderDetailFooter";
import OrderDetailHeader from "./OrderDetailHeader";
import RenderMenu from "./RenderMenu";
import { router } from "expo-router";
import RenderMenuItem from "./RenderMenuItem";
import { FetchOrder } from "@/types";
import Header from "../Header";

interface prop {
  data: FetchOrder[] | undefined;
  refreshing: boolean;
  onRefresh: () => void;
}

const Orders = ({ data, refreshing, onRefresh }: prop) => {
  const [orders, setOrders] = useState(data?.orders || []);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isViewingDetails, setIsViewingDetails] = useState(false);

  const OrderListHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Order History</Text>
    </View>
  );

  return (
    <>
      {!isViewingDetails ? (
        <FlashList
          data={orders}
          renderItem={(item) => (
            <RenderMenu
              item={item}
              setSelectedOrder={setSelectedOrder}
              setIsViewingDetails={setIsViewingDetails}
            />
          )}
          estimatedItemSize={150}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={<Header HeaderTitle={'Order History'} />}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[color.green]}
            />
          }
        />
      ) : (
        <FlashList
          data={selectedOrder}
          renderItem={(item) => <RenderMenuItem item={item} />}
          estimatedItemSize={150}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={() => (
            <OrderDetailHeader
              setIsViewingDetails={setIsViewingDetails}
              selectedOrder={selectedOrder}
            />
          )}
          ListFooterComponent={() => (
            <OrderDetailFooter selectedOrder={selectedOrder} />
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[color.green]}
            />
          }
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  listContent: {
    paddingBottom: 24,
  },
  header: {
    padding: 16,
    paddingTop: 20,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#212529",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Orders;
