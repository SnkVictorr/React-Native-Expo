import { Text, View } from "react-native";
import React, { Component } from "react";
import { Image } from "react-native";
import styles from "./style";
import FavoriteButton from "../favoriteButton";
import colors from "@/src/app/styles/colors";
import Avaliacoes from "../avaliacoes";
import RatingReadOnly from "../avaliacoes";
import { Barcode, CreditCard } from "lucide-react-native";

export default function MainProduct() {
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <FavoriteButton />
        <Image
          style={styles.img}
          source={require("@/assets/images/violãoGewa.png")}
        />
      </View>
      <View style={styles.mainContent}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingBottom: 7,
          }}
        >
          <Text style={{ color: colors.gray[400] }}>Marca</Text>
          <RatingReadOnly value={4.5} />
        </View>
        <Text style={styles.title}>
          Violão Gewa de Madeira, com 6 cordas, cor madeira natural
        </Text>
        <Text
          style={{
            marginTop: 7,
            fontSize: 16,
            // fontWeight: "500",        // evite "medium" no Android
            color: colors.gray[600],
            textDecorationLine: "line-through",
          }}
        >
          R$ 1.200,00
        </Text>
        <View style={{ flexDirection: "row", alignItems: "baseline", gap: 8 }}>
          <Text
            style={{
              marginTop: 1,
              fontSize: 25,
              fontWeight: "500", // evite "medium" no Android
              color: colors.principal,
            }}
          >
            R$ 900,00
          </Text>
          <Text style={{ fontSize: 16, color: colors.gray[400] }}>à vista</Text>
        </View>
        <Text style={{ fontSize: 13, color: "rgb(74 222 128)" }}>
          (com 10% de desconto no Pix / Boleto Bancário / 1x no Cartão de
          Crédito)
        </Text>
        <Text style={{ fontSize: 14, color: colors.gray[400] }}>
          ou em 10x de R$80.10 sem juros no cartão
        </Text>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginRight: 16,
              gap: 4,
            }}
          >
            <CreditCard color={colors.gray[400]} />
            <Text style={{ color: colors.gray[400] }}>Cartão</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <Barcode color={colors.gray[400]} />
            <Text style={{ color: colors.gray[400] }}>Boleto</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
