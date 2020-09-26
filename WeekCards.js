import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';

const winHeight = Dimensions.get("window").height;

import DayCard from './DayCard';

export default function WeekCards(props) {
    console.log(props.forecast[0]);
    const [days, setDays] = useState(props.forecast)

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
                <TouchableOpacity key={i}>
                    <DayCard key={i + 1} icon={day.day.condition.icon} day={new Date(day.date.replace(/-/g, '/')).toString().substr(0, 3)} temp={Math.round(day.day.avgtemp_c)}></DayCard>
                </TouchableOpacity>
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