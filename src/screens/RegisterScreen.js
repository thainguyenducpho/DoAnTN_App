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
  // static navigationOptions = { headerShown: false };

  state = {
    name: "",
    email: "",
    password: "",
    confirmpass: "",
    errorMessagage: null,
  };

  handleSignUp = () => {
    const { password, confirmpass } = this.state;
    if (password !== confirmpass) {
      alert("Passwords don't match");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((userCredentials) => {
          return userCredentials.user.updateProfile({
            displayName: this.state.name,
          });
        })
        .catch((error) => this.setState({ errorMessagage: error.message }));
    }
  };

  render() {
    return (
      <View style={{ backgroundColor: "#FFF", height: "100%" }}>
        <Image
          source={require("../images/image.jpg")}
          style={{ width: "100%", height: "43%" }}
        />
        <Text
          style={{
            fontSize: 30,
            alignSelf: "center",
          }}
        >
          Nông trại xanh
        </Text>

        <Text
          style={{
            marginHorizontal: 55,
            textAlign: "center",
            marginTop: 5,
            opacity: 0.4,
          }}
        >
          Ứng dụng hiệu quả công nghệ để có một cuộc sống tốt đẹp hơn!
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 55,
            borderWidth: 2,
            marginTop: 10,
            paddingHorizontal: 10,
            borderColor: "#00716F",
            borderRadius: 23,
            paddingVertical: 2,
          }}
        >
          <TextInput
            placeholder="Name"
            placeholderTextColor="#00716F"
            onChangeText={(name) => this.setState({ name })}
            value={this.state.name}
            style={{ paddingHorizontal: 10 }}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 55,
            borderWidth: 2,
            marginTop: 10,
            paddingHorizontal: 10,
            borderColor: "#00716F",
            borderRadius: 23,
            paddingVertical: 2,
          }}
        >
          <TextInput
            placeholder="Email"
            placeholderTextColor="#00716F"
            onChangeText={(email) => this.setState({ email })}
            value={this.state.email}
            style={{ paddingHorizontal: 10 }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 55,
            borderWidth: 2,
            marginTop: 10,
            paddingHorizontal: 10,
            borderColor: "#00716F",
            borderRadius: 23,
            paddingVertical: 2,
          }}
        >
          <TextInput
            secureTextEntry
            placeholder="Password"
            placeholderTextColor="#00716F"
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}
            style={{ paddingHorizontal: 10 }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 55,
            borderWidth: 2,
            marginTop: 10,
            paddingHorizontal: 10,
            borderColor: "#00716F",
            borderRadius: 23,
            paddingVertical: 2,
          }}
        >
          <TextInput
            secureTextEntry
            placeholder="Confirm Password"
            placeholderTextColor="#00716F"
            onChangeText={(confirmpass) => this.setState({ confirmpass })}
            value={this.state.confirmpass}
            style={{ paddingHorizontal: 10 }}
          />
        </View>

        <View
          style={{
            marginHorizontal: 55,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 25,
            backgroundColor: "#00716F",
            paddingVertical: 10,
            borderRadius: 23,
          }}
        >
          <TouchableOpacity onPress={this.handleSignUp}>
            <Text
              style={{
                color: "white",
              }}
            >
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
