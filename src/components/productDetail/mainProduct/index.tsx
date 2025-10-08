import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import React, { Component, useEffect, useState } from "react";
import { Image } from "react-native";
import styles from "./style";
import FavoriteButton from "../favoriteButton";
import colors from "@/src/app/styles/colors";
import Avaliacoes from "../avaliacoes";
import RatingReadOnly from "../avaliacoes";
import { Produto } from "@/src/app/types/produto";

import { Barcode, CreditCard } from "lucide-react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs, useLocalSearchParams } from "expo-router";
import ProductTabs from "../tabs";
import getProducts from "@/src/app/services/products/get";
import { Ionicons } from "@expo/vector-icons";
import BackButton from "../../backButton";
import { TextInputMask } from "react-native-masked-text";
import Frete from "../../Frete";

export default function MainProduct() {
  const { id } = useLocalSearchParams();
  const [instrumento, setInstrumento] = React.useState<Produto | null>(null);
  const [cep, setCep] = useState("");
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const products = await getProducts();
        const foundProduct = products.find(
          (p: { id_produto: unknown }) => Number(p.id_produto) === Number(id)
        );
        setInstrumento(foundProduct || null);
      } catch (err) {
        setError("Erro ao carregar o produto.");
        console.error(err);
      }
    };
    loadProduct();
  }, [id]);
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imgContainer}>
          <BackButton style={{ top: 15, left: 15 }} />
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
          <View
            style={{ flexDirection: "row", alignItems: "baseline", gap: 8 }}
          >
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
            <Text style={{ fontSize: 16, color: colors.gray[400] }}>
              à vista
            </Text>
          </View>
          <Text style={{ fontSize: 13, color: "rgb(74 222 128)" }}>
            (com 10% de desconto no Pix / Boleto Bancário / 1x no Cartão de
            Crédito)
          </Text>
          <Text
            style={{ fontSize: 14, color: colors.gray[400], marginBottom: 10 }}
          >
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
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <Barcode color={colors.gray[400]} />
              <Text style={{ color: colors.gray[400] }}>Boleto</Text>
            </View>
          </View>
          <Frete />
          {/* <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              marginTop: 12,
              color: colors.white,
            }}
          >
            Consultar Frete
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",

              borderColor: "#ccc",
              borderRadius: 6,
              backgroundColor: "#333",
              paddingHorizontal: 8,
              marginTop: 12,
            }}
          >
            <MaterialIcons
              name="location-pin"
              size={24}
              color={colors.principal}
              style={{ marginRight: 4 }}
            />
            <TextInputMask
              maxLength={9}
              type="zip-code"
              // type={"custom"}
              // options={{
              //   mask: "99999-999",
              // }}
              keyboardType="numeric"
              value={cep}
              onChangeText={setCep}
              placeholder="Digite seu CEP"
              placeholderTextColor="#aaa"
              style={{
                flex: 1,
                color: "#fff",
                paddingVertical: 10,
              }}
            />
          </View> */}
          <View
            style={{
              marginTop: 20,
              borderBottomWidth: 1,
              borderBottomColor: colors.gray[500],
            }}
          />
          <Pressable
            style={{
              marginTop: 20,
              backgroundColor: colors.principal,
              paddingVertical: 12,
              borderRadius: 6,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <Image
              width={33}
              height={18}
              style={{ marginRight: 8, paddingTop: 1, width: 20, height: 20 }}
              source={require("@/assets/images/icones/carrinho.png")}
              tintColor={colors.white}
            />
            <Text
              style={{ color: colors.white, fontSize: 16, fontWeight: "500" }}
            >
              Adicionar ao carrinho
            </Text>
          </Pressable>
          <Pressable
            style={{
              marginTop: 12,
              borderColor: colors.principal,

              borderWidth: 1,
              paddingVertical: 12,
              borderRadius: 6,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: colors.principal,
                fontSize: 16,
                fontWeight: "500",
              }}
            >
              Comprar agora
            </Text>
          </Pressable>
          <ProductTabs />
        </View>
      </ScrollView>
    </View>
  );
}
function setError(arg0: string) {
  throw new Error("Function not implemented.");
}
