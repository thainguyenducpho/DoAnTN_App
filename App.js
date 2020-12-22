import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import FirebaseKeys from "./config";
import { createAppContainer } from "react-navigation";
import Navigate from "./Navigate";

const AppContainer = createAppContainer(Navigate);

// export default class App extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <AppContainer />
//       </View>
//     );
//   }
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

const App = () => {
  return <AppContainer />;
};
export default App;
