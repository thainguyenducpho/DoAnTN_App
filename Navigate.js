import React from "react";
import { createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Ionicons } from "@expo/vector-icons";

import LoadingScreen from "./src/screens/LoadingScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";

import Dashboard from "./src/screens/Dashboard";
import Settings from "./src/screens/Settings";

import NotificationScreen from "./src/screens/NotificationScreen";
import DetailsScreen from "./src/screens/DetailsScreen";

import ProfileScreen from "./src/screens/ProfileScreen";

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen,
});

const HomeStackNavigator = createStackNavigator({
  Dashboard: Dashboard,
  Settings: Settings,
});

const NotificationStackNavigator = createStackNavigator({
  Notification: NotificationScreen,
  Detail: DetailsScreen,
});

const AppTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStackNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-leaf" size={24} color={tintColor} />
        ),
      },
    },
    Notification: {
      screen: NotificationStackNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-megaphone" size={24} color={tintColor} />
        ),
      },
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-person" size={24} color={tintColor} />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: "greenyellow",
      inactiveTintColor: "#B8BBC4",
      showLabel: false,
    },
  }
);

export default createSwitchNavigator(
  {
    Loading: LoadingScreen,
    App: AppTabNavigator,
    Auth: AuthStack,
  },
  {
    initialRouteName: "Loading",
  }
);
