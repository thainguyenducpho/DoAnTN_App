import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  LayoutAnimation,
} from "react-native";
import * as firebase from "firebase";

export default class LoginScreen extends Component {
  static navigationOptions = { headerShown: false };

  state = {
    email: "",
    password: "",
    errorMessagage: null,
  };

  handleLogin = () => {
    const { email, password } = this.state;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => this.setState({ errorMessagage: error.message }));
  };

  render() {
    LayoutAnimation.easeInEaseOut();

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"></StatusBar>
        <Image
          source={require("../images/Paradise.png")}
          style={{ flex: 1, width: null, height: null, resizeMode: "contain" }}
        />
        <Image
          source={require("../images/test.png")}
          style={{
            position: "absolute",
            bottom: -300,
            right: -250,
          }}
        />
        <Text style={styles.greeting}> {"Hello again. \nWelcome back"} </Text>
        <View style={styles.errorMessagage}>
          {this.state.errorMessagage && (
            <Text style={styles.error}>{this.state.errorMessagage}</Text>
          )}
        </View>
        <View style={styles.form}>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Email..."
              placeholderTextColor="#003f5c"
              autoCapitalize="none"
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email}
            />
          </View>

          <View style={{ marginTop: 32 }}>
            <TextInput
              style={styles.input}
              placeholder="Password..."
              placeholderTextColor="#003f5c"
              secureTextEntry
              autoCapitalize="none"
              onChangeText={(password) => this.setState({ password })}
              value={this.state.password}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
            <Text style={{ color: "#FFF", fontWeight: "bold" }}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ alignSelf: "center", marginTop: 32 }}
            onPress={() => this.props.navigation.navigate("Register")}
          >
            <Text style={{ color: "#414959", fontSize: 13 }}>
              New to Manager Account?{" "}
              <Text style={{ fontWeight: "500", color: "#E9446A" }}>
                Sign Up
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  greeting: {
    marginTop: 32,
    fontSize: 23,
    fontWeight: "bold",
    textAlign: "center",
  },
  errorMessagage: {
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
  },

  error: {
    color: "#E9446A",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
  form: {
    marginBottom: 48,
    marginHorizontal: 30,
  },
  input: {
    backgroundColor: "#E0E0E0",
    borderRadius: 20,
    justifyContent: "center",
    padding: 15,
    height: 50,
    color: "#228B22",
  },
  button: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 20,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
    marginHorizontal: 30,
  },
});
