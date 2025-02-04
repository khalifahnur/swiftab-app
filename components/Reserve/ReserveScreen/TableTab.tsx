import React, {  useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import useStore from "@/store/useStore";
import Two from "./Chairs/Two";
import RecFour from "@/components/Reserve/ReserveScreen/RectangleTables/RecFour";
import CircFour from "./CircleTables/CircFour";

export interface TableAvailability {
  availability: {
    isAvailable: boolean;
    tableNumber: string;
  }[];
  tables: string[];
}

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface TablePosition {
  _id: string;
  chairs: string[];
  floorId: string;
  id: string;
  name: string;
  position: Position;
  rotation: number;
  shape: string;
  size: Size;
  status: string;
}

export interface LayoutData {
  availableTables: TableAvailability;
  diningAreas: string[];
  tablePosition: TablePosition[];
}

const { width: screenWidth } = Dimensions.get("window");


export default function TableTab({
  availableTables,
  diningAreas,
  tablePosition,
}: LayoutData) {
  const [selectedFloor, setSelectedFloor] = useState("1");
  const { selectedFloorTxt, setSelectedFloorTxt } = useStore();
  const animation = useRef(new Animated.Value(0)).current;

  const handlePress = (index: number, floor: string) => {
    setSelectedFloor((index + 1).toString());
  
    Animated.spring(animation, {
      toValue: index,
      friction: 2,
      tension: 10,
      useNativeDriver: true,
    }).start(() => {
      setSelectedFloorTxt(floor); // Update Zustand state after animation
    });
  };

  const translateX = animation.interpolate({
    inputRange: diningAreas.map((_, i) => i), // [0, 1, 2, ...]
    outputRange: diningAreas.map((_, i) => i * (screenWidth / diningAreas.length)), // [0, tabWidth, 2 * tabWidth, ...]
  });


  const isTableAvailable = (tableName: string) => {
    if (!availableTables || !Array.isArray(availableTables.availability))
      return false;
    return availableTables.availability.some(
      (table) => table.tableNumber === tableName && table.isAvailable
    );
  };

  const TablesArrangement = useMemo(
    () =>
      tablePosition.map((item) => {
        const totalChairs = item.chairs.length;
        if (item.shape === "rectangle" && item.floorId == selectedFloor) {
          switch (totalChairs) {
            case 2:
              return <Two key={item.id} />;
            case 4:
              return (
                <RecFour
                  key={item.id}
                  id={item.name}
                  isAvailable={isTableAvailable(item.name)}
                />
              );
            default:
              return null;
          }
        } else if (item.shape === "round" && item.floorId == selectedFloor) {
          switch (totalChairs) {
            case 2:
              return <Two key={item.id} />;
            case 4:
              return (
                <CircFour
                  key={item.id}
                  id={item.name}
                  isAvailable={isTableAvailable(item.name)}
                />
              );
            default:
              return null;
          }
        } else {
          return null;
        }
      }),
    [tablePosition, selectedFloor]
  );

  return (
    <View style={styles.container}>
      <View style={styles.floorSelector}>
        <LinearGradient
          colors={["#ffffff", "#f0f0f0"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.background}
        >
          {diningAreas.map((area, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.floorButton,
                selectedFloor === (index + 1).toString() &&
                  styles.selectedFloor,
              ]}
              onPress={() => handlePress(index, area)}
            >
              <Text
                style={[
                  styles.floorText,
                  selectedFloor === (index + 1).toString() &&
                    styles.selectedFloorText,
                ]}
              >
                {area}
              </Text>
            </TouchableOpacity>
          ))}
          <Animated.View
            style={[
              styles.indicator,
              {
                width: `${100 / diningAreas.length}%`,
                transform: [{ translateX }],
              },
            ]}
          />
        </LinearGradient>
      </View>
      <View style={styles.legend}>
        {["Reserved", "Available", "Selected"].map((item) => (
          <View key={item} style={styles.legendItem}>
            {item === "Reserved" ? (
              <Text style={styles.legendTxt}>🔴</Text>
            ) : item === "Available" ? (
              <Text style={styles.legendTxt}>🟢</Text>
            ) : (
              <Text style={styles.legendTxt}>🔵</Text>
            )}
            <Text style={styles.legendTxt}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={styles.floorPlan}>{TablesArrangement}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f8f8",
  },
  legend: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 5,
  },
  legendItem: {
    gap: 5,
    flexDirection: "row",
  },
  legendTxt: {
    fontSize: 12,
  },
  floorSelector: {
    borderRadius: 25,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginBottom: 5,
  },
  background: {
    flexDirection: "row",
    borderRadius: 25,
    padding: 4,
  },
  floorButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    backgroundColor: "transparent",
  },
  selectedFloor: {
    backgroundColor: "transparent",
  },
  floorText: {
    color: "#666",
    fontSize: 8,
    textAlign: "justify",
    fontWeight: "500",
  },
  selectedFloorText: {
    color: "#3498db",
    fontWeight: "bold",
  },
  indicator: {
    position: "absolute",
    bottom: 4,
    height: 3,
    backgroundColor: "#3498db",
    borderRadius: 2,
    zIndex: 1,
  },
  floorPlan: {
    flex: 1,
    backgroundColor: "rgba(254, 255, 254, 0.1)",
    height: 600,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  },
});