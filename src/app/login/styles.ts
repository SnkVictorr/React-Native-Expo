import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    alignItems: "center",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    elevation: 5, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    color: "#dabb3fff", // Adjusted to match the label color from the image
    marginVertical: 8,
    textAlign: "left",
    marginLeft: 10,
    width: "80%",
  },
  input: {
    width: "80%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  button: {
    width: "80%",
    height: 50,
    backgroundColor: "#007bff",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  socialButton: {
    width: "80%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
  },
  linkText: {
    color: "#007bff",
    fontSize: 14,
    textDecorationLine: "underline",
    alignSelf: "flex-end",
    marginTop: 10,
    marginBottom: 10,
  },
});
