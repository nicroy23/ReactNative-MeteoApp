import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

import WeekCards from './WeekCards';

const winHeight = Dimensions.get("window").height;
const winWidth = Dimensions.get("window").width;

export default function BottomBackground() {
    return (
        <View style={styles.bottomBg}>
            <Text style={styles.location}>Laval</Text>
            <Text style={styles.mainWeather}>24 °C</Text>
            <WeekCards style={styles.weekCards}></WeekCards>
        </View>
    );
}

const styles = StyleSheet.create({
    bottomBg: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'column',
        height: winHeight * 5 / 6,
        width: winWidth,
        backgroundColor: "#10A5F5",
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    location: {
        padding: 20,
        color: 'white',
        fontSize: 50,
    },
    mainWeather: {
        color: 'white',
        fontSize: 35,
    }
});