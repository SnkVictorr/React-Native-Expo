import colors from "@/src/app/styles/colors";
import { Container } from "lucide-react-native";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: { flex: 1 },
  imgContainer: {
    zIndex: 1,
    borderWidth: 1,
    backgroundColor: colors.white,
    borderRadius: 8,
  },
  img: {
    zIndex: -1,
    resizeMode: "contain",
    width: "100%",
    height: 320,
  },
  title: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "semibold",
  },
  favoriteContainer: {
    right: 15,
  },
  mainContent: {
    marginTop: 12,
    marginBottom: 32,
    paddingHorizontal: 18,
  },
});

export default styles;
