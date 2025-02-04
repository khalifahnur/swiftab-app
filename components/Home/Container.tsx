import React, { useState, useEffect } from "react";
import {
  LayoutChangeEvent,
  SectionList,
  StyleSheet,
  View,
  RefreshControl,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import LottieView from "lottie-react-native"; // Import LottieView
import Restaurants from "@/components/Home/Restaurants";
import NewSubHeader from "./NewSubHeader";
import Promotions from "./Promotions";
import Header from "./Header";
import { color } from "@/constants/Colors";
import Cuisine from "./Cuisine";
import { RestaurantData } from "@/types";

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);

interface Section {
  title: string;
  data: RestaurantData[];
}

interface ContainerProps {
  data: Section[];
  refreshing: boolean;
  onRefresh: () => void;
  isLoading: boolean; // Add isLoading prop
}

export default function Container({
  data,
  refreshing,
  onRefresh,
  isLoading,
}: ContainerProps) {
  const translateY = useSharedValue(0);
  const scrollY = useSharedValue(0);
  const previousScrollY = useSharedValue(0);
  const clampedScrollY = useSharedValue(0);
  const [customHeight, setCustomHeight] = useState({
    stickyHeader: 0,
    promotion: 0,
  });
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isLayoutReady) {
        setIsLayoutReady(true);
      }
    }, 1000); 

    return () => clearTimeout(timeout);
  }, [isLayoutReady]);

  const onLayout =
    (type: "stickyHeader" | "promotion") => (event: LayoutChangeEvent) => {
      const height = event.nativeEvent.layout.height;
      if (customHeight[type] !== height) {
        setCustomHeight((prev) => {
          const newCustomHeight = { ...prev, [type]: height };
          if (newCustomHeight.stickyHeader > 0 && newCustomHeight.promotion > 0) {
            setIsLayoutReady(true);
          }
          return newCustomHeight;
        });
      }
    };

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const currentScrollY = event.contentOffset.y;
      scrollY.value = currentScrollY;

      const isScrollingDown = currentScrollY > previousScrollY.value;

      if (isScrollingDown) {
        clampedScrollY.value = interpolate(
          currentScrollY,
          [0, customHeight.stickyHeader],
          [0, -50]
        );
      } else {
        clampedScrollY.value = interpolate(currentScrollY, [0, 100], [10, 10]);
      }

      translateY.value = -clampedScrollY.value;
      previousScrollY.value = currentScrollY;
    },
  });

  const headerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          translateY.value,
          [0, 100],
          [0, -100],
          Extrapolation.CLAMP
        ),
      },
    ],
  }));

  if (!isLayoutReady || isLoading) {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <LottieView
          source={require("@/assets/images/lottie/loader.json")}
          autoPlay
          loop
          style={{ width: 100, height: 100 }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <Animated.View
        style={[styles.header, headerStyle]}
        onLayout={onLayout("stickyHeader")}
      >
        <Header />
      </Animated.View>

      {/* SectionList */}
      <AnimatedSectionList
        sections={data}
        renderSectionHeader={({ section }) => (
          <View style={styles.subContainer}>
            <NewSubHeader headerTitle={section.title} btnText="More" />
            <Restaurants data={section.data} />
          </View>
        )}
        renderItem={() => null}
        ListHeaderComponent={() => (
          <View
            onLayout={onLayout("promotion")}
            style={[
              styles.promotion,
              {
                marginTop: customHeight.stickyHeader,
                backgroundColor: color.green,
              },
            ]}
          >
            <Promotions />
          </View>
        )}
        ListFooterComponent={() => (
          <>
            <Cuisine />
          </>
        )}
        ListFooterComponentStyle={{ backgroundColor: color.green, flex: 1 }}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    backgroundColor: color.white,
    marginBottom: 5,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    backgroundColor: "#003366",
    shadowColor: "#fff",
    shadowRadius: 5,
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 1,
    elevation: 5,
    zIndex: 44,
  },
  promotion: {
    width: "100%",
    paddingHorizontal: 20,
    shadowColor: "#fff",
    shadowRadius: 5,
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.5,
    elevation: 5,
  },
});