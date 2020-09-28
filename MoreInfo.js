import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function MoreInfo(props) {
    return (
        <View style={[styles.moreInfo, {opacity: props.winOpacity}]}>
            <View style={[styles.rowBox, { borderBottomWidth: 0 }]}>
                <Text style={[styles.rowTxt, { fontSize: 30 }, { fontFamily: "Quicksand_600SemiBold" }, { color: "#FCAE1E" }]}>{props.locationInfo.name}</Text>
                <Text style={[styles.rowTxt, { fontSize: 30 }, { fontFamily: "Quicksand_600SemiBold" }, { color: "#74BBFB" }]}>{(props.locationInfo.localtime).substr(-5)}</Text>
            </View>
            <View style={styles.rowBox}>
                <Text style={styles.rowTxt}>Chances of rain:</Text>
                <Text style={[styles.rowTxt, { color: props.rainColour }]}>{props.dayInfo.day.daily_chance_of_rain} %</Text>
            </View>
            <View style={styles.rowBox}>
                <Text style={styles.rowTxt}>Total precipitations:</Text>
                <Text style={[styles.rowTxt, { color: props.rainColour }]}>{props.dayInfo.day.totalprecip_mm} mm</Text>
            </View>
            <View style={styles.rowBox}>
                <Text style={styles.rowTxt}>Wind:</Text>
                <Text style={[styles.rowTxt, { color: props.windColour }]}>{props.dayInfo.day.maxwind_mph} km/h</Text>
            </View>
            <View style={styles.rowBox}>
                <View style={styles.joinTxtIcon}>
                    <Text style={[styles.rowTxt, { fontSize: 15 }]}>Maximum temperature:</Text>
                    <Image style={{ width: 18, height: 18 }} source={{ uri: "https://cdn.iconscout.com/icon/premium/png-256-thumb/triangle-230-632427.png" }}></Image>
                </View>
                <Text style={[styles.rowTxt, { fontSize: 15 }]}>{props.dayInfo.day.maxtemp_c} °C</Text>
            </View>
            <View style={styles.rowBox}>
                <View style={styles.joinTxtIcon}>
                    <Text style={[styles.rowTxt, { fontSize: 15 }]}>Minimum temperature:</Text>
                    <Image style={{ width: 20, height: 20 }} source={{ uri: "https://cdn.iconscout.com/icon/free/png-256/down-button-red-back-arrow-37821.png" }}></Image>
                </View>
                <Text style={[styles.rowTxt, { fontSize: 15 }]}>{props.dayInfo.day.mintemp_c} °C</Text>
            </View>
            <View style={styles.rowBox}>
                <View style={styles.joinTxtIcon}>
                    <Text style={styles.rowTxt}>Sunrise:</Text>
                    <Image style={{ width: 25, height: 25 }} source={{ uri: "https://cdn.iconscout.com/icon/premium/png-256-thumb/sunrise-1532951-1299337.png" }}></Image>
                </View>
                <Text style={styles.rowTxt}>{props.dayInfo.astro.sunrise}</Text>
            </View>
            <View style={[styles.rowBox, { borderBottomWidth: 0 }]}>
                <View style={styles.joinTxtIcon}>
                    <Text style={styles.rowTxt}>Sunset:</Text>
                    <Image style={{ width: 25, height: 25 }} source={{ uri: "https://cdn.iconscout.com/icon/free/png-256/sunset-1532950-1299336.png" }}></Image>
                </View>
                <Text style={styles.rowTxt}>{props.dayInfo.astro.sunset}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    rowBox: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        padding: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: "white",
        width: "80%",
        margin: "auto"
    },
    rowTxt: {
        fontSize: 20,
        color: "white",
    },
    joinTxtIcon: {
        display: "flex",
        flexDirection: "row"
    }
});