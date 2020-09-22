import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';

import InfoWindow from './InfoWindow';

const winHeight = Dimensions.get("window").height;
const winWidth = Dimensions.get("window").width;

export default function App() {
  const [bg, setBg] = useState(chooseBg());

  function chooseBg() {
    if (new Date().getHours().time > 20) {
      return require("./assets/vector-wallpaper.png");
    } else {
      return require("./assets/vector-wallpaper3.png");
    }
  }

  return (
    <View style={styles.container}>
      <InfoWindow background={bg}></InfoWindow>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
