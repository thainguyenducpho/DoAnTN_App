import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import {
  VictoryArea,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryScatter,
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
      color: this.props.sendColor,
      loading: false,
    };
  }
  componentDidMount() {
    console.log("data draw chart", this.state.color);
  }

  render() {
    return (
      <View style={styles.container}>
        <VictoryChart
          width={Dimensions.get("window").width}
          theme={VictoryTheme.material}
          minDomain={{ y: 10 }}
          maxDomain={{ y: 100 }}
          domain={{ x: [0, 5] }}
        >
          <VictoryAxis dependentAxis style={{ tickLabels: { angle: -60 } }} />
          <VictoryAxis />
          <VictoryArea
            style={{
              data: {
                fill: this.state.color,
                fillOpacity: 0.15,
                stroke: this.state.color,
                strokeWidth: 3,
              },
            }}
            labels={({ datum }) => datum.y}
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
              duration: 1500,
              onLoad: { duration: 700 },
            }}
          />
          <VictoryScatter
            style={{ data: { fill: this.state.color } }}
            size={5}
            data={this.state.data}
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
