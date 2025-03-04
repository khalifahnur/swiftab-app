import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import useStore from "@/store/useStore";
import TimeExample from "./TimeExample";

export default function TimeTab() {
  const {
    selectedStartTime,
    setSelectedStartTime,
    selectedEndTime,
    setSelectedEndTime,
  } = useStore();

  const timeSlots = [
    {
      title: "Breakfast",
      times: ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00"],
    },
    {
      title: "Lunch",
      times: [
        "12:30",
        "13:00",
        "13:30",
        "14:00",
        "14:30",
        "15:00",
        "15:30",
        "16:00",
        "16:30",
        "17:00",
      ],
    },
    {
      title: "Dinner",
      times: [
        "17:30",
        "18:00",
        "18:30",
        "19:00",
        "19:30",
        "20:00",
        "20:30",
        "21:00",
        "21:30",
        "22:00",
      ],
    },
  ];

  // const handleTimeSelect = (time: string) => {
  //   if (!selectedStartTime || selectedEndTime) {
  //     setSelectedStartTime(time);
  //     setSelectedEndTime(''); // Reset end time if a new start time is selected
  //   } else {
  //     if (time > selectedStartTime) {
  //       setSelectedEndTime(time);
  //     } else {
  //       alert("End time must be after start time");
  //     }
  //   }
  // };

  return (
    <View style={styles.timeSlots}>
      <Text style={styles.title}>Select Time</Text>
      {/* {timeSlots.map((slot, index) => (
        <View key={index} style={styles.timeGroup}>
          <Text style={styles.groupTitle}>{slot.title}</Text>
          <View style={styles.timeRow}>
            {slot.times.map((time, timeIndex) => (
              <Pressable
                key={timeIndex}
                onPress={() => handleTimeSelect(time)}
                style={[
                  styles.timeButton,
                  selectedStartTime === time && styles.timeStartSelected,
                  selectedEndTime === time && styles.timeEndSelected,
                ]}
              >
                <Text
                  style={
                    selectedStartTime === time || selectedEndTime === time
                      ? styles.timeTextSelected
                      : styles.timeText
                  }
                >
                  {time}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      ))} */}
      <TimeExample />
    </View>
  );
}

const styles = StyleSheet.create({
  timeSlots: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
});
