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

// import React, { Component } from "react";
// import { createAppContainer } from "react-navigation";
// import Navigate from "./Navigate";
// import FirebaseKeys from "./config";

// import * as firebase from "firebase";
// var firebaseConfig = FirebaseKeys;
// firebase.initializeApp(firebaseConfig);

// const AppContainer = createAppContainer(Navigate);

// const App = () => {
//   return <AppContainer />;
// };
// export default App;
