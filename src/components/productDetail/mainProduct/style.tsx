import colors from "@/src/app/styles/colors";
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
    height: 310,
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
  item: {
    marginTop: -20,
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    paddingVertical: 8,
    position: "relative",
  },
  itemFocused: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#c7a3151f",
    borderRadius: 17,
  },
  label: {
    fontSize: 12,
  },
  underline: {
    position: "absolute",
    bottom: 0,
    height: 3,
    width: "35%",
    borderRadius: 2,
    backgroundColor: colors.principal,
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    backgroundColor: "#1a1a1a",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: 500,
  },

  // Novos estilos para o modal de prévia
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.gray[100],
  },
  closeButton: {
    padding: 4,
  },
  modalContent: {
    padding: 16,
  },
  productInfo: {
    flexDirection: "row",
    marginBottom: 20,
  },
  modalImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  productDetails: {
    flex: 1,
    justifyContent: "space-between",
  },
  productName: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.gray[100],
    marginBottom: 4,
  },
  productBrand: {
    fontSize: 14,
    color: colors.gray[100],
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.principal,
  },
  quantitySelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.gray[100],
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.gray[100],
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.gray[100],
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.gray[100],
    minWidth: 40,
    textAlign: "center",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.gray[100],
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.principal,
  },
  modalFooter: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.gray[100],
  },
  confirmButton: {
    backgroundColor: colors.principal,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 8,
    gap: 8,
  },
  confirmButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  continueButton: {
    borderColor: colors.principal,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    marginTop: 8,
    borderRadius: 8,
    gap: 8,
  },
  continueButtonText: {
    color: colors.principal,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default styles;
