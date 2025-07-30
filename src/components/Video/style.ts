import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  video: {
    marginTop: 20,
    width: "100%",
    height: 500,
    objectFit: "contain",
    borderRadius: 10,
  },
  videoBackground: {
    //     position
    position: "relative",

    top: 0,
    left: 0,
    width: "100%",
    height: "100%" /* Ou a altura desejada */,

    zIndex: 1,
  },
});
