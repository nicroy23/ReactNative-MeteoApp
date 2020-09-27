import React, { useState } from 'react';
import { ActivityIndicator, ImageBackground, StyleSheet, Text, View, Dimensions, TextInput, Image, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';

import WeekCards from './WeekCards';
import MoreInfo from "./MoreInfo";
import DayCard from './DayCard';

const winHeight = Dimensions.get("window").height;
const winWidth = Dimensions.get("window").width;

export default function BottomBackground(props) {
    const [temp, setTemp] = useState(15);
    const [locationInfo, setLocationInfo] = useState({});
    const [forecast, setForecast] = useState([]);
    const [loading, setLoading] = useState(false);
    const [focusDay, setFocusDay] = useState(0);

    /**
     * Takes in a value and chooses the right color dependig on the value
     * 
     * @param {number} value - The value of the field
     */
    function txtColour(value) {
        let col = "#26D701";

        if (value > 66) {
            col = "#FF6363";
        } else if (value > 33) {
            col = "#FFF200";
        }

        return col;
    }

    /**
     * Calculates the average temp of the 3-day forecast.
     */
    function weekAvg() {
        let total = 0;

        forecast.forEach(day => {
            total += day.day.avgtemp_c;
        });

        return Math.round(total / forecast.length);
    }

    /**
     * Makes the api call to the right path. Searches with the city entered by the user.
     * 
     * @param {*} event - The event, in this case a entre keypress.
     */
    function searchCity(event) {
        const city = event.nativeEvent.text;
        const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=c032f813f0944e46abf20521202209&q=${city}&days=7`;

        if (city.length > 0) {
            setLoading(true);
            fetch(API_URL)
                .then((res) => { return res.json() })
                .then((jsonRes) => {
                    setTemp(jsonRes.current.temp_c);
                    setLocationInfo(jsonRes.location)
                    setForecast(jsonRes.forecast.forecastday);
                    setLoading(false);
                })
                .catch((err) => { console.log(err) });
        } else {
            setForecast([]);
        }
    }

    /**
     * Calls the api, but this time it uses the longitude and latitude of the user.
     * 
     * @param {Object} info - The info object of the user 
     */
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

    /**
     * Function that gets called when the user presses the use my location button. It is used to ensure that the location services
     * have been accepted by the user, sets the loading icon on and formats the position before calling the search function.
     */
    async function useMyLocation() {
        setLoading(true);
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            setLoading(false);
        }

        if (status) {
            let location = await Location.getCurrentPositionAsync({});
            await searchCityLatLong(location.coords.latitude + "," + location.coords.longitude);
            setLoading(false);
        }
    }

    /**
     * The if is there to show the homescreen if no city or location are used.
     */
    if (forecast.length > 0) {
        return (
            <View style={styles.bottomBg}>
                <ImageBackground style={styles.backImg} blurRadius={10} resizeMode="cover" source={props.background}>
                    <TextInput onSubmitEditing={(e) => searchCity(e)} keyboardAppearance="dark" returnKeyType="search" style={styles.location} placeholder="City name" placeholderTextColor={"lightgray"}>{locationInfo.name}</TextInput>
                    {(!loading) ? <Text style={styles.mainWeather}>{Math.round(temp)} °C</Text> : <ActivityIndicator animating={loading} size="large" color="#FFF" />}
                    <View style={styles.weekCards}>
                        {forecast.map((day, i) =>
                            <TouchableOpacity key={i} onPress={() => {setFocusDay(i)}}>
                                <DayCard key={i} index={i} focus={focusDay} icon={day.day.condition.icon} day={new Date(day.date.replace(/-/g, '/')).toString().substr(0, 3)} temp={Math.round(day.day.avgtemp_c)}></DayCard>
                            </TouchableOpacity>
                        )}
                        <DayCard day={"Average"} index={10} temp={weekAvg()} icon={"//cdn.iconscout.com/icon/free/png-256/science-research-testtube-experiment-bubble-study-project-2-7248.png"}></DayCard>
                    </View>
                    <MoreInfo windColour={txtColour(forecast[focusDay].day.maxwind_kph)} rainColour={txtColour(parseInt(forecast[focusDay].day.daily_chance_of_rain))} locationInfo={locationInfo} dayInfo={forecast[focusDay]}></MoreInfo>
                </ImageBackground>
            </View>
        );
    } else {
        return (
            <View style={styles.bottomBg}>
                <ImageBackground style={styles.backImgNoInfo} blurRadius={10} resizeMode="cover" source={props.background}>
                    <Image source={require("./assets/logo_transparent.png")} style={{ width: 300, height: 300 }}></Image>
                    {(loading) ? <ActivityIndicator animating={loading} size="large" color="#FFF" /> : null}
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
        width: "60%",
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
        backgroundColor: "#06A94D",
        padding: 10,
        borderRadius: 30
    },
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