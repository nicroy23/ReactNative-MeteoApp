import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

export default function DayCard(props) {
    /**
     * Function that changes the width of the card so that the card which displays today is thicker.
     */
    function cardWidth() {
        let width = 1;

        var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        var d = new Date();
        var dayName = days[d.getDay()];

        if(dayName === props.day) {
            width = 3;
        }

        return width;
    }

    return (
        <View style={[styles.dayCard, { borderWidth: cardWidth()}]}>
            <Text style={styles.dayTitle}>{props.day}</Text>
            <Text style={styles.icon}>{props.icon}</Text>
            <Text style={styles.tempText}>{props.temp} °C</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    dayCard: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderRadius: 30,
        height: 120,
        width: 80,
        borderColor: 'white',
        margin: 5
    },
    dayTitle: {
        fontSize: 15,
        color: 'white',
    },
    tempText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15
    },
    icon: {
        fontSize: 30
    }
});