import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Dimensions, ImageBackground } from 'react-native';
import { useFonts, Quicksand_500Medium, Quicksand_700Bold, Quicksand_600SemiBold } from "@expo-google-fonts/quicksand";

import InfoWindow from './InfoWindow';

const winHeight = Dimensions.get("window").height;
const winWidth = Dimensions.get("window").width;

export default function App() {
  const [bg, setBg] = useState(require("./assets/vector-wallpaper3.png"));

  let [fontsLoaded] = useFonts({
    Quicksand_500Medium,
    Quicksand_700Bold,
    Quicksand_600SemiBold
  });

  /**
   * Uses the react useEffect function to choose the background of the app depending on the time of the day it is. It 
   * changes the background state.
   */
  useEffect(() => {
    if (new Date().getHours() > 18) {
      setBg(require("./assets/vector-wallpaper.png"));
    } else {
      setBg(require("./assets/vector-wallpaper3.png"));
    }
  });

  /**
   * The if statement is in place to ensure that the fonts used in the app are loaded before is it loads all of the assets.
   */
  if (!fontsLoaded) {
    return <View>
      <ImageBackground source={bg} blurRadius={20} style={{ width: winWidth, height: winHeight, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Image source={require("./assets/logo_transparent.png")} style={{ width: 400, height: 400 }}></Image>
      </ImageBackground>
    </View>;
  } else {
    return (
      <View style={styles.container}>
        <InfoWindow background={bg}></InfoWindow>
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
