import React, { Component } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import LottieView from "lottie-react-native";
import * as firebase from "firebase";

export default class LoadingScreen extends Component {
  componentDidMount() {
    // this.animation.play(30, 1000);
    firebase.auth().onAuthStateChanged((user) => {
      this.props.navigation.navigate(user ? "App" : "Auth");
    });
    // setTimeout(
    //   function () {

    //   }.bind(this),
    //   5000
    // );
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#7fffd4" />
        {/* <LottieView
          ref={(animation) => {
            this.animation = animation;
          }}
          source={require("../components/39011-loader-validator.json")}
          autoPlay
          loop
        /> */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
