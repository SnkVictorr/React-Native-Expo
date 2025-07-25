import { Button, Text, View } from "react-native";
import React from "react";
import { styles } from "../components/label/style";
import { router } from "expo-router";

export default function Dashboard() {
  const handleBack = () => {
    router.back();
  };
  return (
    <View>
      <Text style={styles.label}>dashboard</Text>
      <Button onPress={handleBack} title={"Voltar"} />
    </View>
  );
}
