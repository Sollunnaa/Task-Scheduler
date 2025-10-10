import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export default function DateSelector({
  onDateSelect,
  showDays = 14,
  tz = dayjs.tz.guess(), 
}: {
  onDateSelect: (date: string) => void;
  showDays?: number;
  tz?: string;
}) {
//   const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
    const today = dayjs().tz(tz);
    const [selectedDate, setSelectedDate] = useState(today.format('YYYY-MM-DD'));
    const days = useMemo(() => Array.from({ length: showDays }, (_, i) => today.add(i, 'day')), [showDays]);
  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    onDateSelect(date);
  };
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
            {days.map((day,idx) => {
                const dateStr = day.format('YYYY-MM-DD');
                const isSelected = dateStr === selectedDate;
                return (
                    <TouchableOpacity
                        key={idx}
                        style={[styles.dateButton, isSelected && styles.selectedDateButton]}
                        onPress={() => handleDateSelect(dateStr)}
                    >
                        <Text style={[styles.dayText, isSelected && styles.selectedDayText]}>
                            {day.format('dd')}
                        </Text>
                        <Text style={[styles.weekdayText, isSelected && styles.selectedWeekdayText]}>
                            {day.format('D')}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 10,
  },
  dateButton: {
    width: 60,
    height: 70,
    marginHorizontal: 5,
    borderRadius: 12,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedDateButton: {
    backgroundColor: "#5b50ff",
  },
  weekdayText: {
    fontSize: 14,
    color: "#555",
    fontWeight: "500",
  },
  selectedWeekdayText: {
    color: "#fff",
  },
  dayText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  selectedDayText: {
    color: "#fff",
  },
});

