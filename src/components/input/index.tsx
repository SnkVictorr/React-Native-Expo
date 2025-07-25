import { TextInput, View } from "react-native";
import React from "react";
import { styles } from "./style";

export default function Input(props: { text?: string }) {
  return (
    <View>
      <TextInput style={styles.input} placeholder={props.text}></TextInput>
    </View>
  );
}
