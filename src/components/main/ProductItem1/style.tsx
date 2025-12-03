import colors from "@/src/app/styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    flex: 1,
  },
  ProductItem: {
    padding: 12,

    width: 160,
    minHeight: 235, // altura fixa garante igualdade
    backgroundColor: colors.white,
    borderRadius: 9,
    marginRight: 12,
    flexDirection: "column",
    // borderWidth: 1,
    // borderColor: colors.gray[400],
    // shadowColor: "#000",        // sombra para iOS
    boxShadow: "0px 4px 6px #e0e0e029", // sombra para Android
    elevation: 3, // sombra para Android
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
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
    textAlign: "center",
    marginTop: 5,
    maxWidth: 180,
    fontSize: 13,
    lineHeight: 16, // padroniza altura de linha
    // fontWeight: "bold",
    color: colors.gray[800],
  },
  infoContainer: {
    marginTop: "auto", // empurra até o fundo do CARD
  },
  price: {
    textAlign: "center",

    fontSize: 11,
    // fontWeight: "500",        // evite "medium" no Android
    color: colors.gray[400],
    textDecorationLine: "line-through",
  },
  precoComDesconto: {
    textAlign: "center",
    fontSize: 17,
    // fontWeight: "700",
    color: colors.principal,
  },
});
