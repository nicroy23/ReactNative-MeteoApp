import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';

const winHeight = Dimensions.get("window").height;

import DayCard from './DayCard';

export default function WeekCards(props) {
    const days = props.forecast; 
    
    /*[
        { day: "Mon", temp: 12, icon: "🌧️" },
        { day: "Tue", temp: 16, icon: "☀" },
        { day: "Wed", temp: 14, icon: "🌦️" },
        { day: "Thu", temp: 10, icon: "⛈️" },
        { day: "Fri", temp: 15, icon: "☀️" },
        { day: "Sat", temp: 18, icon: "☀️" },
        { day: "Sun", temp: 8, icon: "⛈️" }
    ];*/
    
    function weekAvg() {
        let total = 0;
    
        days.forEach(day => {
            total += day.day.avgtemp_c;
        });
    
        return Math.round(total / days.length);
    }

    return (
        <View style={styles.weekCards}>
            {days.map((day, i) =>
                <DayCard key={i} icon={day.day.condition.icon} day={new Date(day.date.replace(/-/g, '/')).toString().substr(0, 3)} temp={Math.round(day.day.avgtemp_c)}></DayCard>
            )}
            <DayCard day={"Average"} temp={weekAvg()} icon={"//cdn.iconscout.com/icon/free/png-256/science-research-testtube-experiment-bubble-study-project-2-7248.png"}></DayCard>
        </View>
    );
}

const styles = StyleSheet.create({
    weekCards: {
        flexWrap: 'wrap',
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 10
    }
});