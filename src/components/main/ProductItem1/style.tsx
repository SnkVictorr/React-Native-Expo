import colors from "@/src/app/styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginLeft: 6,
  },
  ProductItem: {
    padding: 12,
    width: 200,
    height: 280, // altura fixa garante igualdade
    backgroundColor: colors.white,
    borderRadius: 12,
    marginRight: 12,
    flexDirection: "column",
  },
  content: {
    flex: 1, // <-- ESSENCIAL
    flexDirection: "column",
  },
  image: {
    alignSelf: "center",
    width: 150,
    height: 150,
    borderRadius: 12,
  },
  title: {
    marginTop: 5,
    maxWidth: 200,
    fontSize: 16,
    lineHeight: 20, // padroniza altura de linha
    fontWeight: "bold",
    color: colors.gray[800],
  },
  infoContainer: {
    marginTop: "auto", // empurra até o fundo do CARD
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 4,
  },
  price: {
    fontSize: 12,
    // fontWeight: "500",        // evite "medium" no Android
    color: colors.gray[500],
    textDecorationLine: "line-through",
  },
  precoComDesconto: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.principal,
  },
});
