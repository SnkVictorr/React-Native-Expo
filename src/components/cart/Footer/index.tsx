import { SafeAreaView, TouchableOpacity, View } from "react-native";
import React, { Component } from "react";
import colors from "@/src/app/styles/colors";
import { OutfitText } from "../../OutfitText";
import formatter from "@/src/app/utils/formatadorDeMoeda";
import Frete from "../../Frete";
import { router } from "expo-router";
import { editCart } from "@/src/app/services/carrinho/put";
import ItemCarrinho from "@/src/app/types/carrinho";

interface FooterCarrinhoProps {
  total: number;
  carrinho: ItemCarrinho[] | null;
  clienteId: number | null;
}

export default function FooterCarrinho(props: FooterCarrinhoProps) {
  const { total, carrinho, clienteId } = props;
  return (
    <SafeAreaView
      style={{
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: colors.gray[700],
        borderRadius: 8,
        backgroundColor: "#111111",
        zIndex: 50,
        paddingBottom: 15,
        paddingTop: 15,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingBottom: 15,
          paddingTop: 15,
        }}
      >
        <OutfitText style={{ fontSize: 16, color: colors.white }}>
          Total
        </OutfitText>

        <OutfitText style={{ fontSize: 16, color: colors.white }}>
          {formatter.format(total)}
        </OutfitText>
      </View>

      <TouchableOpacity
        onPress={() => {
          if (Array.isArray(carrinho) && carrinho.length > 0) {
            carrinho.forEach((item) =>
              editCart(item.id_produto, clienteId as number, item.quantidade)
            );
          }
          router.push("/checkout");
        }}
        style={{
          alignItems: "center",
          backgroundColor: colors.principal,
          padding: 13,
          borderRadius: 15,
        }}
      >
        <OutfitText style={{ color: colors.white }}>Continuar</OutfitText>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
