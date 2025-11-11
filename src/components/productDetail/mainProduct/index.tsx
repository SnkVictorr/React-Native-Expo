import { Pressable, ScrollView, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import styles from "./style";
import FavoriteButton from "../favoriteButton";
import colors from "@/src/app/styles/colors";
import RatingReadOnly from "../avaliacoes";
import { Produto } from "@/src/app/types/produto";
import { Barcode, CreditCard } from "lucide-react-native";
import { useLocalSearchParams } from "expo-router";
import ProductTabs from "../tabs";
import getProducts from "@/src/app/services/products/get";
import BackButton from "../../backButton";
import Frete from "../../Frete";
import { BASE_URL } from "@/src/app/config/api";
import formatter from "@/src/app/utils/formatadorDeMoeda";

export default function MainProduct() {
  const { id } = useLocalSearchParams();
  const [instrumento, setInstrumento] = useState<Produto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const products = await getProducts();
        const foundProduct = products.find(
          (p: { id_produto: unknown }) => Number(p.id_produto) === Number(id)
        );
        setInstrumento(foundProduct || null);
      } catch (err) {
        setError("Erro ao carregar o produto.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <Text style={{ color: "#FFFFFF" }}>Carregando produto...</Text>
      </View>
    );
  }

  if (error || !instrumento) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <Text style={{ color: "#FFFFFF" }}>
          {error || "Produto não encontrado"}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imgContainer}>
          <BackButton style={{ top: 15, left: 15 }} />
          <FavoriteButton productId={58} clienteId={8} />
          <Image
            style={styles.img}
            source={{uri: `${BASE_URL}/produtos/imagens/${instrumento.imagem}`}}
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
            <Text style={{ color: colors.gray[400] }}>{instrumento.marca}</Text>
            <RatingReadOnly value={4.5} />
          </View>
          <Text style={styles.title}>
            {instrumento.produto}
          </Text>
          <Text
            style={{
              marginTop: 7,
              fontSize: 16,
              color: colors.gray[600],
              textDecorationLine: "line-through",
            }}
          >
            {formatter.format(instrumento.preco)}
          </Text>
          <View
            style={{ flexDirection: "row", alignItems: "baseline", gap: 8 }}
          >
            <Text
              style={{
                marginTop: 1,
                fontSize: 25,
                fontWeight: "500",
                color: colors.principal,
              }}
            >
              {formatter.format(instrumento.preco - instrumento.desconto)}
            </Text>
            <Text style={{ fontSize: 16, color: colors.gray[400] }}>
              à vista
            </Text>
          </View>
          <Text style={{ fontSize: 13, color: "rgb(74 222 128)" }}>
            Com 10% de desconto no Pix / Boleto Bancário / 1x no Cartão de
            Crédito
          </Text>
          <Text
            style={{ fontSize: 14, color: colors.gray[400], marginBottom: 10 }}
          >
            ou até 10x de{" "}
            {formatter.format((instrumento.preco - instrumento.desconto) / 10)}
            {" "}sem juros no cartão
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
          <ProductTabs produtosObj={instrumento}/>
        </View>
      </ScrollView>
    </View>
  );
}