import colors from "@/src/app/styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginLeft: 6,
  },
  ProductItem: {
    padding: 12,
    width: 160,
    height: 235, // altura fixa garante igualdade
    backgroundColor: colors.white,
    borderRadius: 9,
    marginRight: 12,
    flexDirection: "column",
  },
  content: {
    flex: 1, // <-- ESSENCIAL
    flexDirection: "column",
  },
  image: {
    alignSelf: "center",
    width: 120,
    height: 120,
    borderRadius: 12,
  },
  title: {
    marginTop: 10,
    maxWidth: 180,
    fontSize: 14,
    lineHeight: 20, // padroniza altura de linha
    fontWeight: "bold",
    color: colors.gray[800],
  },
  infoContainer: {
    marginTop: "auto", // empurra até o fundo do CARD
  },
  price: {
    fontSize: 10,
    // fontWeight: "500",        // evite "medium" no Android
    color: colors.gray[500],
    textDecorationLine: "line-through",
  },
  precoComDesconto: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.principal,
  },
});
