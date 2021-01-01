import React, { Component } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  Platform,
  TouchableHighlight,
  TextInput,
} from "react-native";

import * as firebase from "firebase";
import FirebaseKeys from "../../config";

const rootRef = firebase.database().ref();
const logRef = rootRef.child("logs/tempDHT");
const tempDHTRef = rootRef.child("tempDHT");
export default class DatabaseComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      root: [],
      TempDHT: [],
      fanStatus: "",
      humDHT: "",
      lampStatus: "",
      lightStatus: "",
      pumpStatus: "",
      soilMoist: "",
      tempDHT: "",
      loading: false,
    };
  }

  componentDidMount() {
    rootRef.once("value").then(function (snapshot) {
      const root = [];
      root.push({
        humDHT: snapshot.child("humDHT").val(),
        tempDHT: snapshot.child("tempDHT").val(),
        soilMoist: snapshot.child("soilMoist").val(),
        pumpStatus: snapshot.child("pumpStatus").val(),
        lampStatus: snapshot.child("lampStatus").val(),
        lightStatus: snapshot.child("lightStatus").val(),
      });
      console.log("User data: ", root);
    });
  }

  onPressAdd = () => {
    if (this.state.newTempDHT.trim() === "") {
      alert("Animal name is blank");
      return;
    }
    animalRef.push(this.state.newTempDHT);
  };
  render() {
    return (
      <View style={{ flex: 1, marginTop: Platform.OS === "ios" ? 34 : 0 }}>
        <View
          style={{
            backgroundColor: "green",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            height: 64,
          }}
        >
          <TextInput
            style={{
              height: 40,
              width: 200,
              margin: 10,
              padding: 10,
              borderColor: "white",
              borderWidth: 1,
              color: "white",
            }}
            keyboardType="default"
            placeholderTextColor="white"
            placeholder="Enter animal name"
            autoCapitalize="none"
            onChangeText={(text) => {
              this.setState({ newTempDHT: text });
            }}
            value={this.state.newTempDHT}
          />
          <TouchableHighlight
            style={{ marginRight: 10 }}
            underlayColor="tomato"
            onPress={this.onPressAdd}
          >
            <Image
              style={{ width: 35, height: 35 }}
              source={require("../images/1.jpeg")}
            />
          </TouchableHighlight>
        </View>
        <FlatList
          data={this.state.animals}
          renderItem={({ item, index }) => {
            return (
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  margin: 10,
                }}
              >
                {item.value}
              </Text>
            );
          }}
        ></FlatList>
      </View>
    );
  }
}
