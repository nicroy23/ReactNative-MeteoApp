import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, View, Dimensions, TextInput, Image, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';

import WeekCards from './WeekCards';
import MoreInfo from "./MoreInfo";

const winHeight = Dimensions.get("window").height;
const winWidth = Dimensions.get("window").width;

export default function BottomBackground(props) {
    const [temp, setTemp] = useState(15);
    const [locationInfo, setLocationInfo] = useState({});
    const [forecast, setForecast] = useState([]);
    const [loading, setLoading] = useState(null);

    function txtColour(value) {
        let col = "#26D701";

        if (value > 66) {
            col = "#FF6363";
        } else if (value > 33) {
            col = "#FFF200";
        }

        return col;
    }

    function searchCity(event) {
        const city = event.nativeEvent.text;
        const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=c032f813f0944e46abf20521202209&q=${city}&days=7`;

        if (city.length > 0) {
            setLoading("Loading...");
            fetch(API_URL)
                .then((res) => { return res.json() })
                .then((jsonRes) => {
                    setTemp(jsonRes.current.temp_c);
                    setLocationInfo(jsonRes.location)
                    setForecast(jsonRes.forecast.forecastday);
                    setLoading(null);
                })
                .catch((err) => { console.log(err) });
        } else {
            setForecast([]);
        }
    }

    async function searchCityLatLong(info) {
        const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=c032f813f0944e46abf20521202209&q=${info}&days=7`;


        if (info.length > 0) {
            fetch(API_URL)
                .then((res) => { return res.json() })
                .then((jsonRes) => {
                    setTemp(jsonRes.current.temp_c);
                    setLocationInfo(jsonRes.location)
                    setForecast(jsonRes.forecast.forecastday);
                })
                .catch((err) => { console.log(err) });
        } else {
            setForecast([]);
        }
    }

    async function useMyLocation() {
        setLoading("Loading...");
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            setLoading('Permission to access location was denied...');
        }

        if (status) {
            let location = await Location.getCurrentPositionAsync({});
            await searchCityLatLong(location.coords.latitude + "," + location.coords.longitude);
            setLoading(null);
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
                <ImageBackground style={styles.backImgNoInfo} blurRadius={10} resizeMode="cover" source={props.background}>
                    <Image source={require("./assets/logo_transparent.png")} style={{ width: 300, height: 300 }}></Image>
                    <Text style={{ color: "white", fontSize: 30, fontFamily: "Quicksand_500Medium" }}>{loading}</Text>
                    <TextInput onSubmitEditing={(e) => searchCity(e)} keyboardAppearance="dark" returnKeyType="search" style={styles.location} placeholder="City name" placeholderTextColor={"lightgray"}></TextInput>
                    <TouchableOpacity onPress={() => useMyLocation()} style={styles.locationBtn}>
                        <Text style={{ color: "white", fontSize: 15, fontFamily: "Quicksand_500Medium" }}>Use my location</Text>
                    </TouchableOpacity>
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
    },
    backImgNoInfo: {
        width: winWidth,
        height: winHeight,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    locationBtn: {
        backgroundColor: "#187BCD",
        padding: 10,
        borderRadius: 30
    }
});