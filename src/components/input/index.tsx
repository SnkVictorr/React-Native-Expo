import React from "react";
import { View, TextInput, TextInputProps } from "react-native";
import { styles } from "./style";

export default function Input(props: TextInputProps) {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <View>
      <TextInput
        {...props}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={[styles.input, isFocused && styles.focused, props.style]}
        placeholderTextColor={props.placeholderTextColor || "#575555"}
      />
    </View>
  );
}
