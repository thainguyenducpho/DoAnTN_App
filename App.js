import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import FirebaseKeys from "./config";
import { createAppContainer } from "react-navigation";
import Navigate from "./Navigate";

const AppContainer = createAppContainer(Navigate);

const App = () => {
  return <AppContainer />;
};
export default App;
