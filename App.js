import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';

import InfoWindow from './InfoWindow';

const winHeight = Dimensions.get("window").height;
const winWidth = Dimensions.get("window").width;

export default function App() {
  return (
    <View style={styles.container}>
      <InfoWindow></InfoWindow>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
