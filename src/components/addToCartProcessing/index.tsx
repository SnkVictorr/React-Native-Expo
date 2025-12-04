import React, { useEffect } from "react";
import { View, Text, Modal } from "react-native";
import LottieView from "lottie-react-native";

export default function AddToCartProcessing({ visible }: { visible: boolean }) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.7)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LottieView
          autoPlay
          loop
          style={{ width: 160, height: 160 }}
          source={require("@/assets/animations/add-to-cart.json")}
        />
      </View>
    </Modal>
  );
}
