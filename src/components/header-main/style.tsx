import colors from "@/src/app/styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#1a1a1a",
    marginBottom: 5,
  },
  menuButton: {
    padding: 5,
  },
  logoContainer: {
    flex: 1,
    alignItems: "center",
  },
  logo: {
    width: 50,
    height: 50,
  },
  logoText: {
    fontSize: 20,
  },
  cartButton: {
    width: 44,
    height: 24,
    padding: 5,
    tintColor: "#c5a12f",
  },
});
