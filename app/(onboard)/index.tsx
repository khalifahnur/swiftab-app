import {
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  ViewToken,
  SafeAreaView,
  Platform,
} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
} from 'react-native-reanimated';

import { Button } from '@/components/Onboard/Button';
import { Pagination } from '@/components/Onboard/Pagination';
import { theme } from '@/constants/themes/theme';
import { data, type Data } from '@/components/Onboard/Screens';
import LottieView from 'lottie-react-native';
import { StatusBar } from 'expo-status-bar';
import { color } from '@/constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React from 'react';

const RenderItem = ({
  item,
  index,
  x,
}: {
  item: Data;
  index: number;
  x: SharedValue<number>;
}) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const lottieRef = React.useRef<LottieView>(null);
  const insets = useSafeAreaInsets();

  React.useEffect(() => {
    if (lottieRef.current) {
      // Slight delay before starting animation for a smoother effect
      setTimeout(() => {
        lottieRef.current?.play();
      }, 100);
    }
  }, []);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    const opacityAnimation = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [0, 1, 0],
      Extrapolation.CLAMP
    );

    const scaleAnimation = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [0.8, 1, 0.8],
      Extrapolation.CLAMP
    );

    const translateYAnimation = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [50, 0, 50],
      Extrapolation.CLAMP
    );

    return {
      width: SCREEN_WIDTH * 0.8,
      height: SCREEN_WIDTH * 0.8,
      opacity: opacityAnimation,
      transform: [
        { translateY: translateYAnimation },
        { scale: scaleAnimation }
      ],
    };
  });

  const textAnimatedStyle = useAnimatedStyle(() => {
    const opacityAnimation = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [0, 1, 0],
      Extrapolation.CLAMP
    );

    const translateYAnimation = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [30, 0, 30],
      Extrapolation.CLAMP
    );

    return {
      opacity: opacityAnimation,
      transform: [{ translateY: translateYAnimation }],
    };
  });

  return (
    <View style={[styles.itemContainer, { width: SCREEN_WIDTH }]}>
      <StatusBar backgroundColor={color.green} style="auto" />
      <Animated.View
        style={[
          {
            justifyContent: "center",
            alignItems: "center",
            flex: 0.6,
            marginTop: insets.top,
          },
          imageAnimatedStyle
        ]}
      >
        <View>
          <LottieView
            ref={lottieRef}
            source={item.image}
            autoPlay
            loop
            style={styles.lottieAnimation}
            speed={0.8}
          />
        </View>
      </Animated.View>

      <Animated.View style={[textAnimatedStyle, { flex: 0.4, width: '100%' }]}>
        <View style={styles.textContainer}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemText}>{item.text}</Text>
        </View>
      </Animated.View>
    </View>
  );
};

export default function OnboardingScreen() {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const flatListRef = useAnimatedRef<FlatList>();
  const insets = useSafeAreaInsets();

  const flatListIndex = useSharedValue(0);
  const x = useSharedValue(0);

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: Array<ViewToken>;
  }) => {
    if (viewableItems[0]?.index !== undefined) {
      flatListIndex.value = withTiming(viewableItems[0].index);
    }
  };

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.FlatList
        ref={flatListRef as any}
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item, index }) => (
          <RenderItem index={index} item={item} x={x} />
        )}
        onScroll={onScroll}
        scrollEventThrottle={16}
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        pagingEnabled
        onViewableItemsChanged={onViewableItemsChanged}
        decelerationRate="fast"
      />

      <View style={[styles.footerContainer, { paddingBottom: Math.max(insets.bottom, 20) }]}>
        <Pagination data={data} screenWidth={SCREEN_WIDTH} x={x} />

        <Button
          flatListRef={flatListRef}
          flatListIndex={flatListIndex}
          dataLength={data.length}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: theme.colors.backgroundColor,
  },
  itemContainer: {
    flex: 1,
    backgroundColor: theme.colors.backgroundColor,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderBottomLeftRadius:50,
    borderBottomRightRadius:50,
  },
  lottieAnimation: {
    width: 250,
    height: 250,
  },
  textContainer: {
    width: '90%',
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 16,
    backgroundColor: Platform.OS === 'ios' ? 'rgba(255,255,255,0.8)' : 'transparent',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 0,
      },
    }),
  },
  itemTitle: {
    color: theme.colors.textColor,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-medium',
  },
  itemText: {
    color: theme.colors.textColor,
    textAlign: 'center',
    lineHeight: 24,
    fontSize: 16,
    marginHorizontal: 16,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
    opacity: 0.8,
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: 'transparent',
  },
});