import { color } from "@/constants/Colors";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
} from "@react-navigation/material-top-tabs";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { withLayoutContext } from "expo-router";
import { memo } from "react";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

const TopTabLayout = () => {
  return (
    <MaterialTopTabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "transparent",
        },
        tabBarPressOpacity:0,
        tabBarPressColor:"transparent",
        tabBarActiveTintColor: color.green,
        tabBarInactiveTintColor: "#1E1E1E",
        tabBarIndicatorStyle: {
          backgroundColor: color.green,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "500",
        },
        
      }}
    >
      <MaterialTopTabs.Screen name="index" options={{ title: "Active" }} />
      <MaterialTopTabs.Screen name="history" options={{ title: "Completed" }} />
      <MaterialTopTabs.Screen name="cancel" options={{ title: "Cancelled" }} />
    </MaterialTopTabs>
  );
};

export default TopTabLayout;
