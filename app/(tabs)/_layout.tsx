import React from "react";
import { Tabs } from "expo-router";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform
} from "react-native";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { color} from "@/constants/Colors";
import { BlurView } from "expo-blur";
import useStore from "@/store/useStore";

// const TabLayout: React.FC = () => {
//   const {hasActiveReservation} = useStore();

//   return (
//     <>
//       <Tabs
//         screenOptions={{
//           headerShown: false,
//           tabBarBackground: () => (
//             <BlurView
//               tint="default"
//               intensity={200}
//               style={StyleSheet.absoluteFill}
//             />
//           ),
//         }}
//         tabBar={({ state, descriptors, navigation }) => (
//           <View
//             style={{
//               flexDirection: "row",
//               justifyContent: "center",
//               borderRadius: 30,
//               alignItems:'center',
//               //backgroundColor: Colors[colorScheme??'light'].tabBackground,
//               backgroundColor: color.gray,
//               bottom: 3,
//               marginHorizontal:10,
//               elevation: 0,
//               height: 55,
//               position: "absolute",
//             }}
//           >
//             <View
//               style={{
//                 flexDirection: "row",
//                 justifyContent: "space-between",
//                 width: "100%",
//                 alignItems: "center",
//                 paddingHorizontal: 5,
//               }}
//             >
//               {state.routes.map((route, index) => {
//                 const { options } = descriptors[route.key];
//                 const isFocused = state.index === index;

//                 const onPress = () => {
//                   const event = navigation.emit({
//                     type: "tabPress",
//                     target: route.key,
//                     canPreventDefault: true,
//                   });

//                   if (!event.defaultPrevented) {
//                     navigation.navigate(route.name);
//                   }
//                 };

//                 return (
//                   <TouchableOpacity
//                     accessibilityRole="button"
//                     testID={options.tabBarTestID}
//                     accessibilityState={isFocused ? { selected: true } : {}}
//                     key={index}
//                     onPress={onPress}
//                     style={{ flex: 1, alignItems: "center" }}
//                   >
//                     {options.tabBarIcon &&
//                       options.tabBarIcon({ focused: isFocused })}
//                   </TouchableOpacity>
//                 );
//               })}
//             </View>
//           </View>
//         )}
//       >
//         {/* index screen */}
//         <Tabs.Screen
//           name="index"
//           options={{
//             headerShown: false,
//             tabBarIcon: ({ focused }) => (
//               <View
//                 style={[
//                   focused && styles.ActiveIconStyle,
//                   { alignItems: "center" },
//                 ]}
//               >
//                 {/* <Ionicons
//                     name="home-outline"
//                     size={focused ? 20 : 25}
//                     color={focused ? "#00932C" : "#1E1E1E"}
//                   /> */}
//                 <TabBarIcon
//                   name={focused ? "home" : "home-outline"}
//                   size={20}
//                   color={focused ? color.green : color.black}
//                 />
//                 {/* {focused && (
//                     <View>
//                       <Text style={{ color: "#00932C", fontSize: 9 }}>Home</Text>
//                     </View>
//                   )} */}
//               </View>
//             ),
//           }}
//         />
//         {/* favourite screen */}
//         <Tabs.Screen
//           name="wishlist"
//           options={{
//             tabBarIcon: ({ focused }) => (
//               <View
//                 style={[
//                   focused && styles.ActiveIconStyle,
//                   { alignItems: "center" },
//                 ]}
//               >
//                 <TabBarIcon
//                   name={focused ? "heart" : "heart-outline"}
//                   size={20}
//                   color={focused ? color.green : color.black}
//                 />
//               </View>
//             ),
//           }}
//         />
//         {/* scan screen */}
//         <Tabs.Screen
//           name="scan"
//           options={{
//             tabBarIcon: ({ focused }) => (
//               <View style={styles.container}>
//                 <View style={styles.iconContainer}>
//                   <View style={styles.iconWrapper}>
//                     <AntDesign
//                       name="scan1"
//                       size={30}
//                       color="#b1b1b1"
//                       style={styles.icon}
//                     />
//                   </View>
//                 </View>
//               </View>
//             ),
//           }}
//         />
//         {/* reserve screen */}
//       <Tabs.Screen
//         name="(toptabs)"
//         options={{
//           headerShown: true,
//           headerShadowVisible: false,
//           headerTitleAlign: "center",
//           headerStyle: { backgroundColor: "transparent" },
//           headerTitle: () => (
//             <Text
//               style={{
//                 fontSize: 16,
//                 fontWeight: "500",
//                 color: "#000",
//                 textAlign: "center",
//               }}
//             >
//               Reservation
//             </Text>
//           ),
//           tabBarIcon: ({ focused }) => (
//             <View style={{ alignItems: "center" }}>
//               <TabBarIcon
//                 name={focused ? "calendar" : "calendar-outline"}
//                 size={20}
//                 color={focused ? color.green : color.black}
//               />
//               {hasActiveReservation && (
//                 <View
//                   style={{
//                     position: "absolute",
//                     top: -5,
//                     right: -5,
//                     backgroundColor: "red",
//                     width: 10,
//                     height: 10,
//                     borderRadius: 5,
//                   }}
//                 />
//               )}
//             </View>
//           ),
//         }}
//       />
//         {/* settings screen */}
//         <Tabs.Screen
//           name="settings"
//           options={{
//             tabBarIcon: ({ focused }) => (
//               <View>
//                 <TabBarIcon
//                   name={focused ? "settings" : "settings-outline"}
//                   size={20}
//                   color={focused ? color.green : color.black}
//                 />
//               </View>
//             ),
//           }}
//         />
//       </Tabs>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   ActiveIconStyle: {
//     padding: 8,
//     borderRadius: 32,
//   },
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "white",
//   },
//   iconContainer: {
//     position: "absolute",
//     bottom: -2,
//     left: "0%",
//     transform: [{ translateX: -32 }],
//   },
//   iconWrapper: {
//     width: 64,
//     height: 64,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#1e1e1e",
//     borderRadius: 32,
//   },
//   icon: {
//     alignItems: "center",
//   },
//   addScreenContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "white",
//   },
// });

// export default TabLayout;

// app/_layout.tsx
// import { Tabs } from "expo-router";
// import { Ionicons, MaterialIcons } from "@expo/vector-icons";
// import { Platform, View, TouchableOpacity } from "react-native";
// import { colors } from "@/constants/Colors";

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

