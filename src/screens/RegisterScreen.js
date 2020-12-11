import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as firebase from "firebase";

export default class RegisterScreen extends Component {
  static navigationOptions = { headerShown: false };

  state = {
    name: "",
    email: "",
    password: "",
    errorMessagage: null,
  };

  handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((userCredentials) => {
        return userCredentials.user.updateProfile({
          displayName: this.state.name,
        });
      })
      .catch((error) => this.setState({ errorMessagage: error.message }));
  };

  render() {
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

        <TouchableOpacity
          style={styles.back}
          onPress={() => this.props.navigation.goBack()}
        >
          <Ionicons name="ios-arrow-round-back" size={32} color="#FFF" />
        </TouchableOpacity>

        <View
          style={{
            position: "absolute",
            top: 40,
            alignItems: "center",
            width: "100%",
          }}
        >
          <Text style={styles.greeting}>
            {"Hello again. \nSign up to get started"}
          </Text>
          <TouchableOpacity style={styles.avatar}>
            <Ionicons
              name="ios-add"
              size={40}
              color="#FFF"
              style={{ marginTop: 6, marginLeft: 2 }}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.errorMessagage}>
          {this.state.errorMessagage && (
            <Text style={styles.error}>{this.state.errorMessagage}</Text>
          )}
        </View>
        <View style={styles.form}>
          <View>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              placeholder="Full Name..."
              placeholderTextColor="#003f5c"
              onChangeText={(name) => this.setState({ name })}
              value={this.state.name}
            />
          </View>

          <View style={{ marginTop: 25 }}>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              placeholder="Email..."
              placeholderTextColor="#003f5c"
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email}
            />
          </View>

          <View style={{ marginTop: 25 }}>
            <TextInput
              style={styles.input}
              secureTextEntry
              autoCapitalize="none"
              placeholder="Password..."
              placeholderTextColor="#003f5c"
              onChangeText={(password) => this.setState({ password })}
              value={this.state.password}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
            <Text style={{ color: "#FFF", fontWeight: "bold" }}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ alignSelf: "center", marginTop: 32 }}
            onPress={() => this.props.navigation.navigate}
          >
            <Text style={{ color: "#414959", fontSize: 13 }}>
              New to Manager Account?
              <Text style={{ fontWeight: "500", color: "#E9446A" }}>Login</Text>
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
    fontSize: 18,
    fontWeight: "400",
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
  back: {
    position: "absolute",
    top: 28,
    left: 28,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(21,22,48,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#E1E2E6",
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});
