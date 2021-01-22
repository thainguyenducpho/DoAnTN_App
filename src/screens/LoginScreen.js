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
import Icon from "@expo/vector-icons/AntDesign";
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

        <View style={styles.errorMessagage}>
          {this.state.errorMessagage && (
            <Text style={styles.error}>{this.state.errorMessagage}</Text>
          )}
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 55,
            borderWidth: 2,
            marginTop: 30,
            paddingHorizontal: 10,
            borderColor: "#00716F",
            borderRadius: 23,
            paddingVertical: 2,
          }}
        >
          <Icon name="mail" color="#00716F" size={24} />
          <TextInput
            style={{ paddingHorizontal: 10 }}
            placeholder="Email..."
            placeholderTextColor="#003f5c"
            autoCapitalize="none"
            onChangeText={(email) => this.setState({ email })}
            value={this.state.email}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 55,
            borderWidth: 2,
            marginTop: 15,
            paddingHorizontal: 10,
            borderColor: "#00716F",
            borderRadius: 23,
            paddingVertical: 2,
          }}
        >
          <Icon name="mail" color="#00716F" size={24} />
          <TextInput
            style={{ paddingHorizontal: 10 }}
            placeholder="Password..."
            placeholderTextColor="#003f5c"
            secureTextEntry
            autoCapitalize="none"
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}
          />
        </View>

        <View
          style={{
            marginHorizontal: 55,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 30,
            backgroundColor: "#00716F",
            paddingVertical: 10,
            borderRadius: 23,
          }}
        >
          <TouchableOpacity onPress={this.handleLogin}>
            <Text
              style={{
                color: "white",
              }}
            >
              Already a member
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          onPress={() => this.props.navigation.navigate("Register")}
          style={{
            alignSelf: "center",
            color: "#00716F",
            paddingVertical: 30,
            marginBottom: 30,
          }}
        >
          New User
        </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  errorMessagage: {
    height: 45,
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
});
