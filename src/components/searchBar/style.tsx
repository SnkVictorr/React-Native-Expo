import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: 25,

    paddingBottom: 20,
    borderBottomColor: "#c7a31516",
    borderBottomWidth: 1,
    marginBottom: 15,
    marginTop: 20,
  },
  searchBar: {
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
