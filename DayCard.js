import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function DayCard(props) {
    // Puts the width of todays card to the good with but allows to change it too (maybe will add change on click...)
    const [cWidth, setCWidth] = useState(1);

    /**
     * Function that changes the width of the card so that the card which displays today is thicker.
     */
    // function cardWidth() {
    //     let width = 1;

    //     var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    //     var d = new Date();
    //     var dayName = days[d.getDay()];

    //     if (dayName === props.day) {
    //         width = 3;
    //     }

    //     return width;
    // }

    /**
     * Uses the useEffect react hook to choose the card with when the component loads.
     */
    useEffect(() => {
        if (props.index === props.focus) {
            setCWidth(3);
        } else {
            setCWidth(1);
        }
    });

    return (
        <View style={styles.bottomTriangle}>
            <View style={[styles.dayCard, { borderWidth: cWidth }]}>
                <Text style={styles.dayTitle}>{props.day}</Text>
                <Image style={{ width: 44, height: 44 }} source={{ uri: "https:" + props.icon }} />
                <Text style={styles.tempText}>{props.temp} °C</Text>
            </View>
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
    bottomTriangle: {

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