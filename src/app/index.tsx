import { Text, View } from "react-native";
import React, { Component } from "react";
import HomeScreen from "./main";
import Login from "./login";
import Dashboard from "./dashboard";

export default class index extends Component {
  render() {
    return (
      <>
        {/* <Dashboard /> */}
        <HomeScreen />
      </>
    );
  }
}
