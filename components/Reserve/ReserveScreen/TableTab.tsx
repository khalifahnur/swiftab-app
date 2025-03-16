import React, { useEffect, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
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

export default function TableTab({
  availableTables,
  diningAreas,
  tablePosition,
}: LayoutData) {
  const { selectedFloorTxt, setSelectedFloorTxt } = useStore();

  useEffect(() => {
    if (diningAreas.length > 0 && !selectedFloorTxt) {
      setSelectedFloorTxt(diningAreas[0]);
    }
  }, [diningAreas]);

  const isTableAvailable = (tableName: string) => {
    if (!availableTables || !Array.isArray(availableTables.availability))
      return false;
    return availableTables.availability.some(
      (table) => table.tableNumber === tableName && table.isAvailable
    );
  };

  const TablesArrangement = useMemo(() => {
    if (!tablePosition || !selectedFloorTxt) return null;

    const floorIndex = diningAreas.findIndex(
      (area) => area === selectedFloorTxt
    );
    const selectedFloorId = (floorIndex + 1).toString();

    return tablePosition
      .filter((item) => item.floorId === selectedFloorId)
      .map((item) => {
        const totalChairs = item.chairs.length;
        if (item.shape === "rectangle") {
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
        } else if (item.shape === "round") {
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
      });
  }, [tablePosition, selectedFloorTxt, availableTables]);

  const handleTabPress = (floor: string) => {
    setSelectedFloorTxt(floor);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Select Table</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsContainer}
      >
        {diningAreas.map((area, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.tab,
              selectedFloorTxt === area && styles.selectedTab,
            ]}
            onPress={() => handleTabPress(area)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabText,
                selectedFloorTxt === area && styles.selectedTabText,
              ]}
            >
              {area}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.legendContainer}>
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, styles.reservedDot]} />
            <Text style={styles.legendText}>Reserved</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, styles.availableDot]} />
            <Text style={styles.legendText}>Available</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, styles.selectedDot]} />
            <Text style={styles.legendText}>Selected</Text>
          </View>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Ionicons name="information-circle-outline" size={16} color="#666" />
        <Text style={styles.infoText}>Tap on a table to select it</Text>
      </View>

      <ScrollView contentContainerStyle={styles.floorPlanContainer}>
        <View style={styles.floorPlan}>{TablesArrangement}</View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  tabsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#eaeaea",
  },
  selectedTab: {
    backgroundColor: "#3498db",
    borderColor: "#2980b9",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
  },
  selectedTabText: {
    color: "#ffffff",
    fontWeight: "600",
  },
  legendContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  legend: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  reservedDot: {
    backgroundColor: "#ff4d4d",
  },
  availableDot: {
    backgroundColor: "#4cd964",
  },
  selectedDot: {
    backgroundColor: "#007aff",
  },
  legendText: {
    fontSize: 12,
    color: "#555",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  infoText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
  floorPlanContainer: {
    padding: 16,
  },
  floorPlan: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 16,
    minHeight: 400,
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    borderWidth: 1,
    borderColor: "#eaeaea",
  },
});
