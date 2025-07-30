import { Text, View } from "react-native";
import React from "react";
import { styles } from "./style";

export default function Label(props: { name?: string }) {
  return (
    <View>
      <Text style={styles.label}>{props.name}</Text>
    </View>
  );
}
