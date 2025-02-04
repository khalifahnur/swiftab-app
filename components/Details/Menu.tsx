import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground } from "react-native";
import { useRouter } from "expo-router";
import { MenuItem } from "@/types";

type MenuProps = {
  menu: {
    _id: string;
    breakfast: MenuItem[];
    lunch: MenuItem[];
    dinner: MenuItem[];
  };
};

const Menu: React.FC<MenuProps> = ({ menu }) => {
  const router = useRouter();

  const handleMenuNavigation = (items: MenuItem[], menuType: string) => {
    router.navigate({
      pathname: "/screens/menu",
      params: { data: JSON.stringify(items), menuType },
    });
  };

  const imageButtons = [
    { id: 10, image: require("../../assets/images/menu/breakfast.jpeg") },
    { id: 20, image: require("../../assets/images/menu/lunch.jpeg") },
    { id: 30, image: require("../../assets/images/menu/dinner.jpeg") },
  ];

  // Exclude _id from menu keys
  const menuTypes = Object.keys(menu).filter((key) => key !== "_id") as Array<
    keyof Omit<typeof menu, "_id">
  >;

  return (
    <View style={styles.container}>
      <Text style={styles.menuTitle}>Menu</Text>
      <View style={styles.menuList}>
        {menuTypes.map((menuType, index) => {
          const items = menu[menuType];
          const image = imageButtons[index]?.image || require("../../assets/images/menu/notfound.png");

          return (
            items.length > 0 && (
              <TouchableOpacity
                key={menuType}
                style={styles.menuButton}
                onPress={() => handleMenuNavigation(items, menuType)}
              >
                <ImageBackground
                  source={image}
                  style={styles.imageBackground}
                  resizeMode="cover"
                  imageStyle={styles.imageStyle}
                >
                  <Text style={styles.menuTypeText}>{menuType}</Text>
                  <Text style={styles.itemCountText}>{items.length} items</Text>
                </ImageBackground>
              </TouchableOpacity>
            )
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  menuTitle: {
    color: "#000",
    fontSize: 20,
    fontWeight: "700",
    paddingBottom: 15,
  },
  menuList: {
    flexDirection: "column",
    gap: 20,
  },
  menuButton: {
    height: 80,
    marginBottom: 10,
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    padding: 15,
  },
  imageStyle: {
    borderRadius: 15,
  },
  menuTypeText: {
    color: "#000",
    fontSize: 17,
    fontWeight: "600",
  },
  itemCountText: {
    color: "#000",
    fontSize: 15,
    fontWeight: "400",
  },
});

export default Menu;
