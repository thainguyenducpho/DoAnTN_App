import React, { Component } from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { LineChart, Path } from "react-native-svg-charts";
import * as shape from "d3-shape";

import * as theme from "../components/theme";
import { Block, Text } from "../components";
import mocks from "../components/settings";
import * as firebase from "firebase";

const rootRef = firebase.database().ref();
class Dashboard extends Component {
  static navigationOptions = { headerShown: false };

  constructor(props) {
    super(props);
    this.state = {
      lampStatus: "black",
      pumpStatus: "black",
      fanStatus: "black",
      modeStatus: "black",
      temp_display: "",
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
    });

    rootRef.on("value", (snapshot) => {
      const data = snapshot.child("lampStatus").val();
      this.setState({
        lampStatus: data,
      });
    });

    rootRef.on("value", (snapshot) => {
      const data = snapshot.child("pumpStatus").val();
      this.setState({
        pumpStatus: data,
      });
    });

    rootRef.on("value", (snapshot) => {
      const data = snapshot.child("fanStatus").val();
      this.setState({
        fanStatus: data,
      });
    });

    rootRef.on("value", (snapshot) => {
      const data = snapshot.child("mode").val();
      this.setState({
        modeStatus: data,
      });
    });
  }

  onLampButtonPress = () => {
    this.state.lampStatus == 1
      ? rootRef.child("lampStatus").set(0)
      : rootRef.child("lampStatus").set(1);
  };

  onFanButtonPress = () => {
    this.state.fanStatus == 1
      ? rootRef.child("fanStatus").set(0)
      : rootRef.child("fanStatus").set(1);
  };

  onPumpButtonPress = () => {
    this.state.pumpStatus == 1
      ? rootRef.child("pumpStatus").set(0)
      : rootRef.child("pumpStatus").set(1);
  };

  onModeButtonPress = () => {
    this.state.modeStatus == 1
      ? rootRef.child("mode").set(0)
      : rootRef.child("mode").set(1);
  };

  render() {
    const { settings } = this.props;
    const LightIcon = settings["light"].icon;
    const ACIcon = settings["ac"].icon;
    const TempIcon = settings["temperature"].icon;
    const FanIcon = settings["fan"].icon;
    const WiFiIcon = settings["wi-fi"].icon;
    const ElectricityIcon = settings["electricity"].icon;
    const PumpIcon = settings["pump"].icon;
    const AutoIcon = settings["auto"].icon;

    lampStyle = (myColor) => {
      return {
        backgroundColor: myColor == 1 ? "#3ED400" : "black",
        width: 120,
        height: 120,
        borderRadius: 151 / 2,
      };
    };

    fanStyle = (myColor) => {
      return {
        backgroundColor: myColor == 1 ? "#3ED400" : "black",
        width: 120,
        height: 120,
        borderRadius: 151 / 2,
      };
    };

    pumpStyle = (myColor) => {
      return {
        backgroundColor: myColor == 1 ? "#3ED400" : "black",
        width: 120,
        height: 120,
        borderRadius: 151 / 2,
      };
    };

    modeStyle = (myColor) => {
      return {
        backgroundColor: myColor == 1 ? "#3ED400" : "black",
        width: 120,
        height: 120,
        borderRadius: 151 / 2,
      };
    };

    return (
      <Block style={styles.dashboard}>
        <Block column style={{ marginVertical: theme.sizes.base * 2 }}>
          <Text welcome>Hello</Text>
          <Text name>{this.state.displayName}</Text>
        </Block>

        <Block row style={{ paddingVertical: 10 }}>
          <Block flex={1.5} row style={{ alignItems: "flex-end" }}>
            <Text h1>{this.state.temp_display}</Text>
            <Text h1 size={34} height={80} weight="600" spacing={0.1}>
              °C
            </Text>
          </Block>
          <Block flex={1} column>
            <Text caption>Humidity</Text>
            <LineChart
              yMax={100}
              yMin={0}
              data={[0, 20, 25, 15, 20, 55, 60]}
              style={{ flex: 0.8 }}
              curve={shape.curveNatural}
              svg={{ stroke: theme.colors.accent, strokeWidth: 3 }}
            />
          </Block>
        </Block>

        <ScrollView
          contentContainerStyle={styles.buttons}
          showsVerticalScrollIndicator={false}
        >
          <Block column space="between">
            <Block
              row
              space="around"
              style={{
                marginVertical: theme.sizes.base,
              }}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={this.onModeButtonPress}
                onLongPress={() =>
                  this.props.navigation.navigate("Settings", { name: "auto" })
                }
              >
                <Block center middle style={modeStyle(this.state.modeStatus)}>
                  <AutoIcon size={38} />
                  <Text button style={{ marginTop: theme.sizes.base * 0.5 }}>
                    {settings["auto"].name}
                  </Text>
                </Block>
              </TouchableOpacity>

              <TouchableOpacity
                disabled={this.state.modeStatus == 1 ? true : false}
                activeOpacity={0.8}
                onPress={this.onFanButtonPress}
                onLongPress={() =>
                  this.props.navigation.navigate("Settings", { name: "fan" })
                }
              >
                <Block center middle style={fanStyle(this.state.fanStatus)}>
                  <FanIcon size={38} />
                  <Text button style={{ marginTop: theme.sizes.base * 0.5 }}>
                    {settings["fan"].name}
                  </Text>
                </Block>
              </TouchableOpacity>
            </Block>

            <Block
              row
              space="around"
              style={{ marginVertical: theme.sizes.base }}
            >
              <TouchableOpacity
                disabled={this.state.modeStatus == 1 ? true : false}
                activeOpacity={0.8}
                onPress={this.onPumpButtonPress}
                onLongPress={() =>
                  this.props.navigation.navigate("Settings", {
                    name: "pump",
                  })
                }
              >
                <Block center middle style={pumpStyle(this.state.pumpStatus)}>
                  <PumpIcon size={38} />
                  <Text button style={{ marginTop: theme.sizes.base * 0.5 }}>
                    {settings["pump"].name}
                  </Text>
                </Block>
              </TouchableOpacity>

              <TouchableOpacity
                disabled={this.state.modeStatus == 1 ? true : false}
                activeOpacity={0.8}
                onPress={this.onLampButtonPress}
                onLongPress={() =>
                  this.props.navigation.navigate("Settings", { name: "light" })
                }
              >
                <Block center middle style={lampStyle(this.state.lampStatus)}>
                  <LightIcon size={38} />
                  <Text button style={{ marginTop: theme.sizes.base * 0.5 }}>
                    {settings["light"].name}
                  </Text>
                </Block>
              </TouchableOpacity>
            </Block>

            {/* <Block
              row
              space="around"
              style={{ marginVertical: theme.sizes.base }}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  this.props.navigation.navigate("Settings", { name: "wi-fi" })
                }
              >
                <Block center middle style={styles.button}>
                  <WiFiIcon size={38} />
                  <Text button style={{ marginTop: theme.sizes.base * 0.5 }}>
                    {settings["wi-fi"].name}
                  </Text>
                </Block>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  this.props.navigation.navigate("Settings", {
                    name: "electricity",
                  })
                }
              >
                <Block center middle style={styles.button}>
                  <ElectricityIcon size={38} />
                  <Text button style={{ marginTop: theme.sizes.base * 0.5 }}>
                    {settings["electricity"].name}
                  </Text>
                </Block>
              </TouchableOpacity>
            </Block> */}
          </Block>
        </ScrollView>
      </Block>
    );
  }
}

Dashboard.defaultProps = {
  settings: mocks,
};

export default Dashboard;

const styles = StyleSheet.create({
  dashboard: {
    flex: 1,
    padding: theme.sizes.base * 2,
    marginBottom: -theme.sizes.base * 6,
  },
  buttons: {
    flex: 1,
    marginBottom: -theme.sizes.base * 6,
  },
  button: {
    backgroundColor: theme.colors.button,
    justifyContent: "center",
    width: 120,
    height: 120,
    borderRadius: 151 / 2,
  },
  btnNormal: {
    borderColor: "blue",
    borderWidth: 1,
    borderRadius: 10,
    height: 30,
    width: 100,
  },
  btnPress: {
    borderColor: "blue",
    borderWidth: 1,
    height: 30,
    width: 100,
  },
});
