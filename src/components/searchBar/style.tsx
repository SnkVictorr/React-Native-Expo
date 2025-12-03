import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",

    paddingRight: 20,
    paddingLeft: 5,
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomColor: "#c7a31516",
    borderBottomWidth: 1,
  },
  searchBar: {
    flexGrow: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    borderRadius: 12,
    paddingHorizontal: 15,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    color: "#fff",
    fontSize: 14,
  },
});

export default styles;
