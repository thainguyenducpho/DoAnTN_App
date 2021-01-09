import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import {
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryLabel,
} from "victory-native";
import * as firebase from "firebase";

const rootRef = firebase.database().ref();
const tempDHT = rootRef.child("logs/tempDHT");

var today = new Date();
var yesterday_1 = new Date(today);
var yesterday_2 = new Date(today);
var yesterday_3 = new Date(today);
var yesterday_4 = new Date(today);
var yesterday_5 = new Date(today);
var month = today.getMonth();

yesterday_1.setDate(today.getDate() - 1);
yesterday_2.setDate(today.getDate() - 2);
yesterday_3.setDate(today.getDate() - 3);
yesterday_4.setDate(today.getDate() - 4);
yesterday_5.setDate(today.getDate() - 5);

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.sendDataChart,
      loading: false,
    };
  }
  componentDidMount() {
    console.log("data draw chart", this.state.data);
  }

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     TempDHT: [],
  //     // HumDHT: [],
  //     // SoilMoist: [],
  //     // PumpStatus: [],
  //     // LampStatus: [],
  //     // LightStatus: [],
  //     loading: false,
  //   };
  // }

  // componentDidMount() {
  //   tempDHT.on("value", (childSnapshot) => {
  //     const TempDHT = [];
  //     childSnapshot.forEach((doc) => {
  //       TempDHT.push(doc.val());
  //     });
  //     this.setState({
  //       TempDHT: TempDHT,
  //     });
  //     // console.log("User data chart: ", TempDHT);
  //   });
  // }

  render() {
    return (
      <View style={styles.container}>
        <VictoryChart
          width={Dimensions.get("window").width}
          theme={VictoryTheme.material}
          minDomain={{ y: 0 }}
          maxDomain={{ y: 50 }}
        >
          <VictoryLine
            style={{
              data: { stroke: "#c43a31" },
              parent: { border: "1px solid #ccc" },
            }}
            data={this.state.data}
            interpolation="natural"
            categories={{
              x: [
                yesterday_5.getDate() + "-" + monthNames[month],
                yesterday_4.getDate() + "-" + monthNames[month],
                yesterday_3.getDate() + "-" + monthNames[month],
                yesterday_2.getDate() + "-" + monthNames[month],
                yesterday_1.getDate() + "-" + monthNames[month],
                today.getDate() + "-" + monthNames[month],
              ],
            }}
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 },
            }}
          />
        </VictoryChart>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff",
  },
});
