import React from "react";
import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform
} from "react-native";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { color} from "@/constants/Colors";

function CustomTabButton({ children, onPress }: any) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        top: -20,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: "black",
          justifyContent: "center",
          alignItems: "center",
          ...Platform.select({
            ios: {
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 3,
            },
            android: {
              elevation: 5,
            },
          }),
        }}
      >
        {children}
      </View>
    </TouchableOpacity>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: color.graywhite,
          borderTopWidth: 0,
          height: 50,
          marginHorizontal: 2,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          borderTopEndRadius: 20,
          borderTopStartRadius: 20,
          //borderRadius: 20,
          ...Platform.select({
            ios: {
              shadowColor: "#000",
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.1,
              shadowRadius: 3,
            },
            android: {
              elevation: 8,
            },
          }),
        },
        // tabBarActiveTintColor: color.gray,
        // tabBarInactiveTintColor: color.black,
      }}
    >
      <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View
                
              >
                <TabBarIcon
                  name={focused ? "home" : "home-outline"}
                  size={24}
                  color={focused ? color.green : color.black}
                />
              </View>
            ),
            title: ""
          }}
        />
        {/* favourite screen */}
        <Tabs.Screen
          name="wishlist"
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                
              >
                <TabBarIcon
                  name={focused ? "heart" : "heart-outline"}
                  size={24}
                  color={focused ? color.green : color.black}
                />
              </View>
            ),
            title: ""
          }}
        />

      <Tabs.Screen
        name="scan"
        options={{
          tabBarIcon: () => (
            <View
              style={{
                // width: 56,
                // height: 56,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialIcons
                name="qr-code-scanner"
                size={30}
                color="#FFF"
                style={{ paddingTop: 2 }}
              />
            </View>
          ),
          tabBarButton: (props) => <CustomTabButton {...props} />,
          title: "",
        }}
      />
      <Tabs.Screen
        name="(toptabs)"
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "transparent" },
          title: "",
          headerTitle: () => (
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                color: "#000",
                textAlign: "center",
              }}
            >
              Reservation
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <TabBarIcon
                name={focused ? "calendar" : "calendar-outline"}
                size={24}
                color={focused ? color.green : color.black}
              />
              {/* {hasActiveReservation && (
                <View
                  style={{
                    position: "absolute",
                    top: -5,
                    right: -5,
                    backgroundColor: "red",
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                  }}
                />
              )} */}
            </View>

          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <TabBarIcon
                name={focused ? "settings" : "settings-outline"}
                size={24}
                color={focused ? color.green : color.black}
              />
            </View>
          ),
          title: ""
        }}
      />
    </Tabs>
  );
}
const styles = StyleSheet.create({
    ActiveIconStyle: {
      padding: 8,
      borderRadius: 32,
    },
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
    },
    iconContainer: {
      position: "absolute",
      bottom: -2,
      left: "0%",
      transform: [{ translateX: -32 }],
    },
    iconWrapper: {
      width: 64,
      height: 64,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#1e1e1e",
      borderRadius: 32,
    },
    icon: {
      alignItems: "center",
    },
    addScreenContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
    },
  });

