import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ImageBackground,
  TouchableOpacity,
  NativeModules,
} from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import { ScrollView } from "react-native-gesture-handler";
import RNRestart from "react-native-restart";
import Deck from "../components/Deck";
import Cards from "../components/Cards";
import * as firebase from "firebase";

const rootRef = firebase.database().ref();
const tempDHT = rootRef.child("logs/tempDHT").limitToLast(6);
const humDHT = rootRef.child("logs/humDHT").limitToLast(6);
const soilMoist = rootRef.child("logs/soilMoist").limitToLast(6);

export default class NotificationScreen extends Component {
  static navigationOptions = { headerShown: false };

  state = {
    email: "",
    displayName: "",
  };

  constructor(props) {
    super(props);
    this.state = {
      root: [],
      TempDHT: [],
      HumDHT: [],
      SoilMoist: [],
      temp_display: "",
      humi_display: "",
      soil_display: "",
      loading: false,
    };
  }

  componentDidMount() {
    const { email, displayName } = firebase.auth().currentUser;
    this.setState({ email, displayName });

    rootRef.on("value", (snapshot) => {
      const data = snapshot.child("tempDHT").val();
      this.setState({
        temp_display: data,
      });
      // console.log("temp_display: ", data);
    });

    rootRef.on("value", (snapshot) => {
      const data = snapshot.child("humDHT").val();
      this.setState({
        humi_display: data,
      });
      // console.log("humi_display: ", data);
    });

    rootRef.on("value", (snapshot) => {
      const data = snapshot.child("soilMoist").val();
      this.setState({
        soil_display: data,
      });
      // console.log("soil_display: ", data);
    });

    rootRef.on("value", (snapshot) => {
      const root = [];
      root.push(
        {
          id: Math.floor(Math.random() * 10000) + 1,
          title: "TEMPERATURE",
          number: snapshot.child("tempDHT").val() + " ℃",
        },
        {
          id: Math.floor(Math.random() * 10000) + 1,
          title: "HUMIDITY",
          number: snapshot.child("humDHT").val() + " %",
        },
        {
          id: Math.floor(Math.random() * 10000) + 1,
          title: "SOIL MOIST",
          number: snapshot.child("soilMoist").val() + " %",
        },
        {
          id: Math.floor(Math.random() * 10000) + 1,
          title: "PUMP STATUS",
          number: snapshot.child("pumpStatus").val() == 1 ? "ON" : "OFF",
        },
        {
          id: Math.floor(Math.random() * 10000) + 1,
          title: "FAN STATUS",
          number: snapshot.child("fanStatus").val() == 1 ? "ON" : "OFF",
        },
        {
          id: Math.floor(Math.random() * 10000) + 1,
          title: "LAMP STATUS",
          number: snapshot.child("lampStatus").val() == 1 ? "ON" : "OFF",
        },
        {
          id: Math.floor(Math.random() * 10000) + 1,
          title: "LIGHT STATUS",
          number:
            snapshot.child("lightStatus").val() == 1 ? "Day Time" : "Nigh Time",
        }
      );
      this.setState({
        root: root,
      });
      // console.log("root: ", root);
    });

    tempDHT.on("value", (snapshot) => {
      const TempDHT = [];
      snapshot.forEach((doc) => {
        TempDHT.push(doc.val());
      });
      this.setState({
        TempDHT: TempDHT,
      });
    });

    humDHT.on("value", (snapshot) => {
      const HumDHT = [];
      snapshot.forEach((doc) => {
        HumDHT.push(doc.val());
      });
      this.setState({
        HumDHT: HumDHT,
      });
    });

    soilMoist.on("value", (snapshot) => {
      const SoilMoist = [];
      snapshot.forEach((doc) => {
        SoilMoist.push(doc.val());
      });
      this.setState({
        SoilMoist: SoilMoist,
      });
    });
  }
  onRefresh() {
    RNRestart.Restart();
  }

  signOutUser = () => {
    firebase.auth().signOut();
    // NativeModules.DevSettings.reload();
    // RNRestart.Restart();
  };

  renderCard(item) {
    return (
      <View key={item.id} style={styles.cardContainer}>
        <View style={styles.card}>
          <View>
            <Text style={styles.title}>{item.title}</Text>
            <Icon
              name="ios-remove"
              size={40}
              color="red"
              style={{ marginTop: 25 }}
            />
            <Text style={styles.number}>{item.number}</Text>
          </View>
          <View style={{ marginLeft: 150 }}>
            <Icon name="md-options" size={24} color="#FFF" />
            <Text style={styles.textCovid}>STATUS</Text>
          </View>
        </View>
      </View>
    );
  }

  renderNoMoreCards() {
    return (
      <View title="All Domne!">
        <Text style={styles.noCard}>NO MORE CARDS HERE</Text>
        <Button
          backgroundColor="#03A9F4"
          title="Get more!"
          onPress={this.onRefresh}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require("../images/3.png")} style={styles.map}>
          <View style={styles.col}>
            <View style={{ width: "50%" }}>
              <Icon name="md-remove" color="#FFF" size={26} />
              <Icon
                name="md-remove"
                color="#FFF"
                size={26}
                style={styles.minusIcon}
              />
            </View>
            <View style={styles.avatarContainer}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Profile")}
              >
                <Image
                  source={require("../images/spkt_cee.png")}
                  style={styles.avatar}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.textDash}>CONTROLS</Text>
        </ImageBackground>
        <Deck
          data={this.state.root}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
        />
        <ScrollView
          style={{ marginTop: 170 }}
          showsHorizontalScrollIndicator={false}
          horizontal
        >
          <Cards
            onPress={() =>
              this.props.navigation.navigate("Detail", {
                data: this.state.TempDHT,
                color: "tomato",
                text: "TEMPERATURE",
              })
            }
            icon="md-pulse"
            title="TEMPERATURE"
            bg="tomato"
            number={this.state.temp_display + " ℃"}
          />
          <Cards
            onPress={() =>
              this.props.navigation.navigate("Detail", {
                data: this.state.HumDHT,
                color: "skyblue",
                text: "HUMIDITY",
              })
            }
            icon="ios-git-network"
            title="HUMIDITY"
            bg="skyblue"
            number={this.state.humi_display + " %"}
          />
          <Cards
            onPress={() =>
              this.props.navigation.navigate("Detail", {
                data: this.state.SoilMoist,
                color: "greenyellow",
                text: "SOIL MOIST",
              })
            }
            icon="ios-heart-dislike"
            title="SOIL MOIST"
            bg="greenyellow"
            number={this.state.soil_display + " %"}
          />
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  cardContainer: {
    height: 150,
    width: 320,
    alignSelf: "center",
    backgroundColor: "#3E8D31",
    borderRadius: 30,
  },
  card: {
    height: 150,
    width: 260,
    paddingTop: 20,
    paddingHorizontal: 30,
    backgroundColor: "#3ED400",
    borderRadius: 30,
    flexDirection: "row",
  },
  title: {
    color: "#6A706E",
    width: 100,
    fontSize: 12,
    fontWeight: "bold",
  },
  number: {
    color: "#FFF",
    width: 100,
    fontSize: 22,
    fontWeight: "bold",
    marginTop: -10,
  },
  textCovid: {
    transform: [{ rotate: "-90deg" }],
    color: "#3a4b4f",
    fontSize: 14,
    width: 90,
    marginLeft: -35,
    fontWeight: "bold",
    marginTop: 20,
  },
  noCard: {
    marginBottom: 10,
    color: "#FFF",
    alignSelf: "center",
  },
  map: {
    height: 200,
    paddingTop: 35,
    paddingHorizontal: 30,
    marginBottom: 15,
  },
  col: {
    flexDirection: "row",
  },
  minusIcon: {
    marginTop: -20,
    marginLeft: 5,
  },
  avatarContainer: {
    width: "50%",
    alignItems: "flex-end",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  textDash: {
    color: "#FFF",
    fontSize: 20,
    alignSelf: "center",
    marginTop: 15,
    fontWeight: "bold",
  },
  colContainer: {
    flexDirection: "row",
    paddingHorizontal: 30,
    marginTop: 40,
    alignItems: "center",
  },
  textGlobal: {
    fontWeight: "bold",
    fontSize: 16,
    color: "red",
  },
  textRussia: {
    fontWeight: "bold",
    fontSize: 16,
    paddingHorizontal: 30,
    color: "#6a706e",
  },
  reloadContainer: {
    backgroundColor: "#FFF",
    elevation: 2,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 50,
  },
});
