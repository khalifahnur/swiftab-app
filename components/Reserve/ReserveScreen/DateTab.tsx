import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import useStore from "@/store/useStore";

export default function DateTab() {
  const { selectedDate, setSelectedDate } = useStore();
  const now = moment().format("YYYY-MM-DD");
  const nextthirtydays = moment().add(30, "days").format("YYYY-MM-DD");

  const handleDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
  };

  return (
    <>
      <Text style={styles.title}>Select Date</Text>
      <Calendar
        onDayPress={handleDayPress}
        disableArrowLeft={true}
        minDate={now}
        maxDate={nextthirtydays}
        theme={{
          backgroundColor: "#ffffff",
          calendarBackground: "#ffffff",
          textSectionTitleColor: "#b6c1cd",
          selectedDayBackgroundColor: "#00adf5",
          selectedDayTextColor: "#ffffff",
          todayTextColor: "#00adf5",
          dayTextColor: "#2d4150",
          textDisabledColor: "#dd99ee",
        }}
        markedDates={{
          [selectedDate]: {
            selected: true,
            disableTouchEvent: true,
            selectedDotColor: "orange",
          },
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
});
