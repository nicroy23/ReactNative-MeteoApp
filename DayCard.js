import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function DayCard(props) {
    // Puts the width of todays card to the good with but allows to change it too (maybe will add change on click...)
    const[cWidth, setCWidth] = useState(cardWidth())
    
    /**
     * Function that changes the width of the card so that the card which displays today is thicker.
     */
    function cardWidth() {
        let width = 1;

        var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        var d = new Date();
        var dayName = days[d.getDay()];

        if (dayName === props.day) {
            width = 3;
        }

        return width;
    }

    return (
        <View style={[styles.dayCard, { borderWidth: cWidth }]}>
            <Text style={styles.dayTitle}>{props.day}</Text>
            <Image style={{ width: 44, height: 44 }} source={{ uri: "https:" + props.icon }} />
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
        fontFamily: "Quicksand_500Medium"
    },
    tempText: {
        color: 'white',
        fontSize: 15,
        fontFamily: "Quicksand_700Bold",
        fontWeight: 'bold',
    },
    icon: {
        fontSize: 30
    }
});