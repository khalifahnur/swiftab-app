import { RefreshControl, StyleSheet } from "react-native";
import React from "react";
import { FlashList } from "@shopify/flash-list";
import ReservationCard from "./ReservationCard";
import { color } from "@/constants/Colors";
import SpaceBelow from "./SpaceBelow";

interface dataprops {
  date: string;
  time: number;
  location: string;
  rate: string;
  image: string;
  restaurantName: string;
  restaurantId:string;
  reservationId:string;
  id:string;
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
      ListFooterComponent={()=><SpaceBelow />}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({});
