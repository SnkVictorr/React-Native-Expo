import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  input: {
    backgroundColor: "rgba(255,255,255,0.85)", // fundo translúcido
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 16,
    color: "#333",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "transparent",
  },
  focused: {
    borderColor: "#c7a315", // dourado quando focado
    borderWidth: 2,
  },
});
