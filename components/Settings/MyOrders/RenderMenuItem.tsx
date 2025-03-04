import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { formatCurrency } from "@/lib/helpers";

export default function RenderMenuItem({ item }) {
  console.log(item)
  return (
    <View style={styles.menuItem}>
      <Image
        source={{ uri: item.item.image }}
        style={styles.menuImage}
        resizeMode="cover"
      />
      <View style={styles.menuItemInfo}>
        <Text style={styles.menuItemName}>{item.item.name}</Text>
        <Text style={styles.menuItemDescription}>{item.item.description}</Text>
        <View style={styles.priceRow}>
          <View style={styles.quantityContainer}>
            <Text style={styles.quantityText}>
              {item.item.quantity.$numberInt}x
            </Text>
          </View>
          <Text style={styles.menuItemTotal}>
            {formatCurrency(
              parseInt(item.cost.$numberInt) *
                parseInt(item.item.quantity.$numberInt)
            )}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  menuImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: "#f0f0f0",
  },
  menuItemInfo: {
    flex: 1,
    marginLeft: 16,
    justifyContent: "space-between",
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#212529",
    marginBottom: 4,
  },
  menuItemDescription: {
    fontSize: 14,
    color: "#6c757d",
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  quantityContainer: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  quantityText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#212529",
  },
  menuItemTotal: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#212529",
  },
});
