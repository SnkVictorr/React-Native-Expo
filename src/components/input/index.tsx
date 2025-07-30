import { View, TextInput } from "react-native";
import React from "react";
import { styles } from "./style";

export default function Input(props: { text?: string }) {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <View>
      <TextInput
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
        style={[styles.input, isFocused && styles.focused]}
        placeholder={props.text}
        placeholderTextColor="#ececec3d"
      ></TextInput>
    </View>
  );
}
