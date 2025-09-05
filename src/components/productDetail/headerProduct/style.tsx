import colors from "@/src/app/styles/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  header: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  title: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "semibold",
  },
});

export default styles;
