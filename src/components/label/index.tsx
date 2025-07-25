import { Text, View } from "react-native";
import React, { Component } from "react";
import { styles } from "./style";

export default function Label(props: { name?: string }) {
  {
    return (
      <View>
        {/* div */}
        <Text style={styles.label}>{props.name}</Text>
        {/* h1 ou p */}
      </View>
    );
  }
}
