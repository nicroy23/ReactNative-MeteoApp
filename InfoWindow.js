import React from 'react';
import { ImageBackground, StyleSheet, Text, View, Dimensions, TextInput } from 'react-native';

import WeekCards from './WeekCards';

const winHeight = Dimensions.get("window").height;
const winWidth = Dimensions.get("window").width;

export default function BottomBackground() {
    return (
        <View style={styles.bottomBg}>
            <ImageBackground style={styles.backImg} blurRadius={10} resizeMode="cover" source={require('./assets/vector-wallpaper3.png')}>
                <TextInput style={styles.location} placeholder="City" placeholderTextColor={"white"}></TextInput>
                <Text style={styles.mainWeather}>24 °C</Text>
                <WeekCards style={styles.weekCards}></WeekCards>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    bottomBg: {
        height: winHeight,
        width: winWidth,
    },
    location: {
        padding: 20,
        color: 'white',
        fontSize: 50,
        textAlign: "center"
    },
    mainWeather: {
        color: 'white',
        fontSize: 35,
    },
    backImg: {
        width: winWidth,
        height: winHeight,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    }
});