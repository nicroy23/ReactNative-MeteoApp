import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

export default function DayCard(props) {
    return(
        <View style={styles.dayCard}>
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
        borderWidth: 1,
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