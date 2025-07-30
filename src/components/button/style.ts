import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  button: {
    backgroundColor: "#c7a315",
    padding: 8,
    borderRadius: 10,
    width: 340,
    marginTop: 20,
    alignSelf: "center",
  },
  pressed: {
    backgroundColor: "gray",
    opacity: 0.5,
    transitionDuration: "5s",
  },
  text: {
    color: "#ececec",
    fontSize: 16,
    textAlign: "center",
  },
});
