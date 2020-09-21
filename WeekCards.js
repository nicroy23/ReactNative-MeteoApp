import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

const winHeight = Dimensions.get("window").height;

import DayCard from './DayCard';

const days = [
    { day: "Mon", temp: 12, icon: "🌧️" },
    { day: "Tue", temp: 16, icon: "☀" },
    { day: "Wed", temp: 14, icon: "🌦️" },
    { day: "Thu", temp: 10, icon: "⛈️" },
    { day: "Fri", temp: 15, icon: "☀️" },
    { day: "Sat", temp: 18, icon: "☀️" },
    { day: "Sun", temp: 8, icon: "⛈️" }
];

function weekAvg() {
    let total = 0;

    days.forEach(day => {
        total += day.temp;
    });

    return Math.round(total / days.length);
}

export default function WeekCards() {
    return (
        <View style={styles.weekCards}>
            {days.map((day) =>
                <DayCard key={day.index} day={day.day} temp={day.temp} icon={day.icon}></DayCard>
            )}
            <DayCard day={"Avg"} temp={weekAvg()} icon={"👨‍🔬️"}></DayCard>
        </View>
    );
}

const styles = StyleSheet.create({
    weekCards: {
        flexWrap: 'wrap',
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        height: winHeight / 2,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 10
    }
});