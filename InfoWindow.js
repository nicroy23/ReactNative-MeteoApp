import React from 'react';
import { ImageBackground, StyleSheet, Text, View, Dimensions, TextInput } from 'react-native';

import WeekCards from './WeekCards';

const winHeight = Dimensions.get("window").height;
const winWidth = Dimensions.get("window").width;

export default function BottomBackground() {
    return (
        <View style={styles.bottomBg}>
            <ImageBackground style={styles.backImg} blurRadius={10} resizeMode="cover" source={require('./assets/vector-wallpaper3.png')}>
                <TextInput onSubmitEditing={(e) => searchCity(e)} keyboardAppearance="dark" returnKeyType="search" style={styles.location} placeholder="City name" placeholderTextColor={"lightgray"}></TextInput>
                <Text style={styles.mainWeather}>24 °C</Text>
                <WeekCards style={styles.weekCards}></WeekCards>
            </ImageBackground>
        </View>
    );
}

function searchCity(event) {
    const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=c032f813f0944e46abf20521202209&q=${event.nativeEvent.text}&days=7`;

    fetch(API_URL)
        .then((res) => {return res.json()})
        .then((json) => {console.log(json);})
        .catch((err) => {console.log(err)});
}

const styles = StyleSheet.create({
    bottomBg: {
        height: winHeight,
        width: winWidth,
    },
    location: {
        margin: 20,
        color: 'white',
        fontSize: 40,
        textAlign: "center",
        borderBottomWidth: 1,
        borderBottomColor: "white"
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