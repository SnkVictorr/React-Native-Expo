import colors from "@/src/app/styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    marginRight: 16,
    marginLeft: 16,
  },
  card: {
    width: 90,
    height: 68,
    borderRadius: 20, // círculo perfeito
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 6,
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3, // sombra no Android
    borderWidth: 2,
    borderColor: "#ffee002b",
  },
  logo: {
    width: 65,
  },
});
