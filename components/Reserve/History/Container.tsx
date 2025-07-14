import { RefreshControl, StyleSheet } from "react-native";
import React from "react";
import { FlashList } from "@shopify/flash-list";
import { color } from "@/constants/Colors";
import ReservationCard from "./ReserveCard";

interface dataprops {
  date: string;
  time: number;
  location: string;
  rate: string;
  image: string;
  restaurantName: string;
}
interface prop {
  data: dataprops[] | undefined;
  refreshing: boolean;
  onRefresh: () => void;
}

export default function Container({ data, refreshing, onRefresh }: prop) {
  return (
    <FlashList
      data={data}
      renderItem={({ item }) => <ReservationCard items={item} />}
      estimatedItemSize={50}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[color.green]} />
      }
    />
  );
}

const styles = StyleSheet.create({});
