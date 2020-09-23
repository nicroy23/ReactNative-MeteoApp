import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, View, Dimensions, TextInput } from 'react-native';

import WeekCards from './WeekCards';
import MoreInfo from "./MoreInfo";

const winHeight = Dimensions.get("window").height;
const winWidth = Dimensions.get("window").width;

export default function BottomBackground(props) {
    const [temp, setTemp] = useState(15);
    const [locationInfo, setLocationInfo] = useState({});
    const [forecast, setForecast] = useState([]);

    function txtColour(value) {
        let col = "#26D701";
        
        if(value > 66) {
            col = "#FF6363";
        } else if(value > 33) {
            col = "#FFF200";
        }

        return col;
    }

    function searchCity(event) {
        const city = event.nativeEvent.text;
        const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=c032f813f0944e46abf20521202209&q=${city}&days=7`;

        if (city.length > 0) {
            fetch(API_URL)
                .then((res) => { return res.json() })
                .then((jsonRes) => {
                    setTemp(jsonRes.current.temp_c);
                    setLocationInfo(jsonRes.location)
                    setForecast(jsonRes.forecast.forecastday);
                })
                .catch((err) => { console.log(err) });
        }
    }

    if (forecast.length > 0) {
        return (
            <View style={styles.bottomBg}>
                <ImageBackground style={styles.backImg} blurRadius={10} resizeMode="cover" source={props.background}>
                    <TextInput onSubmitEditing={(e) => searchCity(e)} keyboardAppearance="dark" returnKeyType="search" style={styles.location} placeholder="City name" placeholderTextColor={"lightgray"}>{locationInfo.name}</TextInput>
                    <Text style={styles.mainWeather}>{Math.round(temp)} °C</Text>
                    <WeekCards forecast={forecast}></WeekCards>
                    <MoreInfo windColour={txtColour(forecast[0].day.maxwind_kph)} rainColour={txtColour(parseInt(forecast[0].day.daily_chance_of_rain))} locationInfo={locationInfo} dayInfo={forecast[0]}></MoreInfo>
                </ImageBackground>
            </View>
        );
    } else {
        return (
            <View style={styles.bottomBg}>
                <ImageBackground style={styles.backImg} blurRadius={10} resizeMode="cover" source={props.background}>
                    <TextInput onSubmitEditing={(e) => searchCity(e)} keyboardAppearance="dark" returnKeyType="search" style={styles.location} placeholder="City name" placeholderTextColor={"lightgray"}></TextInput>
                </ImageBackground>
            </View>
        );
    }
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
        borderBottomColor: "white",
        fontFamily: "Quicksand_500Medium"
    },
    mainWeather: {
        color: 'white',
        fontSize: 40,
        fontFamily: "Quicksand_500Medium"
    },
    backImg: {
        width: winWidth,
        height: winHeight,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    }
});