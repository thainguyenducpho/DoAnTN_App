import React, { Component } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import Chart from "../components/Chart";

export default class DetailsScreen extends Component {
  static navigationOptions = { headerShown: false };

  constructor(props) {
    super(props);
    this.state = {
      data: this.props.navigation.getParam("data"),
      color: this.props.navigation.getParam("color"),
      textScreen: this.props.navigation.getParam("text"),
      loading: false,
    };
  }

  onPressAdd = () => {
    console.log("data passing: ", this.state.data);
  };

  render() {
    return (
      <View style={styles.page}>
        {/* <View style={styles.headContainer}>
          <View style={styles.humContainer}>
            <Icon name="md-remove" size={26} />
            <Icon name="md-remove" size={26} style={styles.hum} />
          </View>
          <View style={styles.profileContainer}>
            <Image
              source={require("../images/1.jpeg")}
              style={styles.profile}
            />
          </View>
        </View> */}
        <View style={styles.locationContainer}>
          <Text style={styles.textGlobal}>{this.state.textScreen}</Text>
        </View>
        <Chart sendDataChart={this.state.data} sendColor={this.state.color} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFF",
    flex: 1,
  },
  // headContainer: {
  //   marginHorizontal: 20,
  //   flexDirection: "row",
  //   marginTop: 40,
  // },
  // humContainer: {
  //   width: "50%",
  // },
  // hum: {
  //   marginTop: -20,
  //   marginLeft: 5,
  // },
  // profileContainer: {
  //   width: "50%",
  //   alignItems: "flex-end",
  // },
  profile: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  locationContainer: {
    alignSelf: "center",
    flexDirection: "row",
    paddingHorizontal: 30,
    marginTop: 40,
    alignItems: "center",
  },
  textGlobal: {
    fontWeight: "bold",
    fontSize: 16,
    color: "black",
  },
  bottomCard: {
    backgroundColor: "#1c2732",
    height: 220,
    marginTop: 5,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  bottomCol: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 20,
  },
  textSymptoms: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  infoContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  button: {
    borderRadius: 15,
    borderColor: "red",
    borderWidth: 1,
    marginHorizontal: 30,
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 5,
  },
  btnText: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },
});
