import React from "react";
import { Tabs } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { color} from "@/constants/Colors";
import { BlurView } from "expo-blur";
import useStore from "@/store/useStore";

const TabLayout: React.FC = () => {
  const {hasActiveReservation} = useStore();

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarBackground: () => (
            <BlurView
              tint="default"
              intensity={200}
              style={StyleSheet.absoluteFill}
            />
          ),
        }}
        tabBar={({ state, descriptors, navigation }) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              borderRadius: 30,
              alignItems:'center',
              //backgroundColor: Colors[colorScheme??'light'].tabBackground,
              backgroundColor: color.gray,
              bottom: 5,
              marginHorizontal:20,
              elevation: 0,
              height: 55,
              position: "absolute",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
                paddingHorizontal: 5,
              }}
            >
              {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const isFocused = state.index === index;

                const onPress = () => {
                  const event = navigation.emit({
                    type: "tabPress",
                    target: route.key,
                    canPreventDefault: true,
                  });

                  if (!event.defaultPrevented) {
                    navigation.navigate(route.name);
                  }
                };

                return (
                  <TouchableOpacity
                    accessibilityRole="button"
                    testID={options.tabBarTestID}
                    accessibilityState={isFocused ? { selected: true } : {}}
                    key={index}
                    onPress={onPress}
                    style={{ flex: 1, alignItems: "center" }}
                  >
                    {options.tabBarIcon &&
                      options.tabBarIcon({ focused: isFocused })}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}
      >
        {/* index screen */}
        <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View
                style={[
                  focused && styles.ActiveIconStyle,
                  { alignItems: "center" },
                ]}
              >
                {/* <Ionicons
                    name="home-outline"
                    size={focused ? 20 : 25}
                    color={focused ? "#00932C" : "#1E1E1E"}
                  /> */}
                <TabBarIcon
                  name={focused ? "home" : "home-outline"}
                  size={20}
                  color={focused ? color.green : color.black}
                />
                {/* {focused && (
                    <View>
                      <Text style={{ color: "#00932C", fontSize: 9 }}>Home</Text>
                    </View>
                  )} */}
              </View>
            ),
          }}
        />
        {/* favourite screen */}
        <Tabs.Screen
          name="wishlist"
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={[
                  focused && styles.ActiveIconStyle,
                  { alignItems: "center" },
                ]}
              >
                <TabBarIcon
                  name={focused ? "heart" : "heart-outline"}
                  size={20}
                  color={focused ? color.green : color.black}
                />
              </View>
            ),
          }}
        />
        {/* scan screen */}
        <Tabs.Screen
          name="scan"
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.container}>
                <View style={styles.iconContainer}>
                  <View style={styles.iconWrapper}>
                    <AntDesign
                      name="scan1"
                      size={30}
                      color="#b1b1b1"
                      style={styles.icon}
                    />
                  </View>
                </View>
              </View>
            ),
          }}
        />
        {/* reserve screen */}
      <Tabs.Screen
        name="(toptabs)"
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "transparent" },
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
                size={20}
                color={focused ? color.green : color.black}
              />
              {hasActiveReservation && (
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
              )}
            </View>
          ),
        }}
      />
        {/* settings screen */}
        <Tabs.Screen
          name="settings"
          options={{
            tabBarIcon: ({ focused }) => (
              <View>
                <TabBarIcon
                  name={focused ? "settings" : "settings-outline"}
                  size={20}
                  color={focused ? color.green : color.black}
                />
              </View>
            ),
          }}
        />
      </Tabs>
    </>
  );
};

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

export default TabLayout;
