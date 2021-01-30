import React, { Component } from "react";
import {
  Alert,
  Modal,
  View,
  SafeAreaView,
  StatusBar,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Avatar, Title, Caption, Text } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import * as firebase from "firebase";

import Constants from "expo-constants";
import Donut from "../components/Donut";

const rootRef = firebase.database().ref();
export default class ProfileScreen extends Component {
  static navigationOptions = { headerShown: false };

  constructor(props) {
    super(props);
    this.state = {
      currentPassword: "",
      newPassword: "",
      email: "",
      displayName: "",
      errorMessagage: null,
      root: [],
      show: false,
    };
  }

  componentDidMount() {
    const { email, displayName } = firebase.auth().currentUser;
    this.setState({ email, displayName });

    rootRef.on("value", (snapshot) => {
      const root = [];
      root.push(
        {
          percentage: snapshot.child("tempDHT").val(),
          color: "tomato",
          max: 40,
        },
        {
          percentage: snapshot.child("humDHT").val(),
          color: "skyblue",
          max: 100,
        },
        {
          percentage: snapshot.child("soilMoist").val(),
          color: "gold",
          max: 100,
        }
      );
      this.setState({
        root: root,
      });
      // console.log("root: ", root);
    });
  }

  signOutUser = () => {
    firebase.auth().signOut();
  };

  // Reauthenticates the current user and returns a promise...
  reauthenticate = (currentPassword) => {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    return user.reauthenticateWithCredential(cred);
  };

  // Changes user's password...
  onChangePasswordPress = () => {
    this.reauthenticate(this.state.currentPassword)
      .then(() => {
        var user = firebase.auth().currentUser;
        user
          .updatePassword(this.state.newPassword)
          .then(() => {
            Alert.alert("Password was changed");
            this.setState({ show: false });
          })
          .catch((error) => {
            console.log(error.message);
          });
      })
      .catch((error) => {
        this.setState({ errorMessagage: error.message });
      });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.userInfoSection}>
          <View style={{ flexDirection: "row", marginTop: 30 }}>
            <Avatar.Image
              source={require("../images/spkt_cee.png")}
              size={80}
            />
            <View style={{ marginLeft: 20 }}>
              <Title
                style={[
                  styles.title,
                  {
                    marginTop: 15,
                    marginBottom: 5,
                  },
                ]}
              >
                {this.state.displayName}
              </Title>
              <Caption style={styles.caption}>{this.state.email}</Caption>
            </View>
          </View>
        </View>

        <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <MaterialCommunityIcons
              name="map-marker-radius"
              color="#777777"
              size={20}
            />
            <Text style={{ color: "#777777", marginLeft: 20 }}>
              HCM city, Vietnam
            </Text>
          </View>
          <View style={styles.row}>
            <MaterialCommunityIcons name="phone" color="#777777" size={20} />
            <Text style={{ color: "#777777", marginLeft: 20 }}>
              +84-9999999999
            </Text>
          </View>
          <View style={styles.row}>
            <MaterialCommunityIcons name="email" color="#777777" size={20} />
            <Text style={{ color: "#777777", marginLeft: 20 }}>
              doantotnghiepkmt16@gmail.com
            </Text>
          </View>
        </View>

        <View style={styles.infoBoxWrapper}>
          <View style={styles.circle_ring}>
            <StatusBar hidden />
            <View
              style={{
                flexDirection: "column",
                justifyContent: "space-evenly",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              {this.state.root.map((p, i) => {
                return (
                  <Donut
                    key={i}
                    percentage={p.percentage}
                    color={p.color}
                    delay={500 + 100 * i}
                    max={p.max}
                  />
                );
              })}
            </View>
          </View>
        </View>
        <Modal transparent={true} visible={this.state.show}>
          <View style={{ backgroundColor: "#000000aa", flex: 1 }}>
            <View
              style={{
                flex: 2,
                backgroundColor: "#ffffff",
                margin: 50,
                padding: 40,
                borderRadius: 10,
              }}
            >
              <View style={styles.errorMessagage}>
                {this.state.errorMessagage && (
                  <Text style={styles.error}>{this.state.errorMessagage}</Text>
                )}
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  borderWidth: 2,
                  marginTop: 30,
                  paddingHorizontal: 10,
                  borderColor: "#00716F",
                  borderRadius: 23,
                  paddingVertical: 2,
                }}
              >
                <TextInput
                  secureTextEntry
                  placeholder="Current Password"
                  placeholderTextColor="#00716F"
                  onChangeText={(currentPassword) =>
                    this.setState({ currentPassword })
                  }
                  value={this.state.currentPassword}
                  style={{ paddingHorizontal: 10 }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
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
                  placeholder="New Password"
                  placeholderTextColor="#00716F"
                  onChangeText={(newPassword) => this.setState({ newPassword })}
                  value={this.state.newPassword}
                  style={{ paddingHorizontal: 10 }}
                />
              </View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 25,
                  backgroundColor: "#00716F",
                  paddingVertical: 10,
                  borderRadius: 23,
                  marginHorizontal: 10,
                }}
              >
                <TouchableOpacity onPress={this.onChangePasswordPress}>
                  <Text
                    style={{
                      color: "white",
                    }}
                  >
                    Change
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  marginHorizontal: 55,
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 5,
                  backgroundColor: "tomato",
                  paddingVertical: 10,
                  borderRadius: 23,
                  marginHorizontal: 10,
                }}
              >
                <TouchableOpacity
                  onPress={() => this.setState({ show: false })}
                >
                  <Text
                    style={{
                      color: "white",
                    }}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <View style={styles.menuWrapper}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Register");
              firebase.auth().signOut();
            }}
          >
            <View style={styles.menuItem}>
              <SimpleLineIcons name="user-follow" color="#FF6347" size={25} />
              <Text style={styles.menuItemText}>Add New Member</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({ show: true });
            }}
          >
            <View style={styles.menuItem}>
              <MaterialCommunityIcons
                name="key-change"
                color="#FF6347"
                size={25}
              />
              <Text style={styles.menuItemText}>Change Password</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.signOutUser}>
            <View style={styles.menuItem}>
              <AntDesign name="logout" color="#FF6347" size={25} />
              <Text style={styles.menuItemText}>Log Out</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  circle_ring: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#fff",
    padding: 8,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 120,
    justifyContent: "center",
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
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
