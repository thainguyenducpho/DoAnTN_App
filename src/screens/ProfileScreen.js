import React from "react";
import { View, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native-gesture-handler";
import Constants from "expo-constants";
import Donut from "../components/Donut";

const data = [
  {
    percentage: 8,
    color: "tomato",
    max: 10,
  },
  {
    percentage: 14,
    color: "skyblue",
    max: 20,
  },
  {
    percentage: 92,
    color: "gold",
    max: 100,
  },
];

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: "row", marginTop: 30 }}>
          <Avatar.Image source={require("../images/spkt_cee.png")} size={80} />
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
              Anh Thai
            </Title>
            <Caption style={styles.caption}>@tndp</Caption>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="map-marker-radius" color="#777777" size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            HCM city, Vietnam
          </Text>
        </View>
        <View style={styles.row}>
          <Icon name="phone" color="#777777" size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            +84-9999999999
          </Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" color="#777777" size={20} />
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
            {data.map((p, i) => {
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

      <View style={styles.menuWrapper}>
        <TouchableRipple>
          <View style={styles.menuItem}>
            <Icon name="heart-outline" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Your Favorites</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple>
          <View style={styles.menuItem}>
            <Icon name="credit-card-marker" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Payment</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple>
          <View style={styles.menuItem}>
            <Icon name="share-outline" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Tell Your Friends</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple>
          <View style={styles.menuItem}>
            <Icon name="account-check-outline" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Support</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple>
          <View style={styles.menuItem}>
            <Icon name="settings-outline" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Settings</Text>
          </View>
        </TouchableRipple>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

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
});

// import * as React from "react";
// import { Text, StatusBar, View, StyleSheet } from "react-native";
// import Constants from "expo-constants";
// import Donut from "../components/Donut";

// const data = [
//   {
//     percentage: 8,
//     color: "tomato",
//     max: 10,
//   },
//   {
//     percentage: 14,
//     color: "skyblue",
//     max: 20,
//   },
//   {
//     percentage: 92,
//     color: "gold",
//     max: 100,
//   },
// ];

// export default function ProfileScreen() {
//   return (
//     <View style={styles.container}>
//       <StatusBar hidden />
//       <View
//         style={{
//           flexDirection: "row",
//           justifyContent: "space-evenly",
//           flexWrap: "wrap",
//           alignItems: "center",
//         }}
//       >
//         {data.map((p, i) => {
//           return (
//             <Donut
//               key={i}
//               percentage={p.percentage}
//               color={p.color}
//               delay={500 + 100 * i}
//               max={p.max}
//             />
//           );
//         })}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     paddingTop: Constants.statusBarHeight,
//     backgroundColor: "#fff",
//     padding: 8,
//   },
//   paragraph: {
//     margin: 24,
//     fontSize: 18,
//     fontWeight: "bold",
//     textAlign: "center",
//   },
// });
