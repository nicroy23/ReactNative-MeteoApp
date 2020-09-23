import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function MoreInfo(props) {
    return (
        <View style={styles.moreInfo}>
            <Text style={styles.fullLocation}>Laval, Quebec, Canada</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    moreInfo: {
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        width: "95%",
        height: "55%",
        margin: "auto",
        marginTop: 8,
        borderRadius: 30
    },
    fullLocation: {
        fontFamily: "Quicksand_600SemiBold",
        fontSize: 20,
        color: "white",
        padding: 10,
        textDecorationLine: "underline"
    }
});