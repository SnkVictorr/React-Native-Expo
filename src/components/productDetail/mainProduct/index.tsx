import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import styles from "./style";
import FavoriteButton from "../favoriteButton";
import colors from "@/src/app/styles/colors";
import RatingReadOnly from "../avaliacoes";
import { Produto } from "@/src/app/types/produto";
import {
  Barcode,
  CreditCard,
  X,
  Plus,
  Minus,
  ShoppingCart,
  ShoppingBag,
} from "lucide-react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import ProductTabs from "../tabs";
import getProducts from "@/src/app/services/products/get";
import BackButton from "../../backButton";
import Frete from "../../Frete";
import { BASE_URL } from "@/src/app/config/api";
import formatter from "@/src/app/utils/formatadorDeMoeda";
import { addToCart } from "@/src/app/services/carrinho/post";
import AddToCartProcessing from "@/src/components/addToCartProcessing";
import { useAuth } from "@/src/app/context/AuthContext";

export default function MainProduct() {
  const { id } = useLocalSearchParams();
  const [instrumento, setInstrumento] = useState<Produto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const clienteId = user?.cliente_id || null;
  const [quantidade, setQuantidade] = useState(1);
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar o modal de prévia

  const [processing, setProcessing] = useState(false);
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

  const handleAddToCart = async () => {
    if (instrumento) {
      if (!clienteId) {
        setError("Cliente ID não encontrado. Por favor, faça login.");
        return;
      }
      const success = await addToCart(instrumento, clienteId, quantidade);
      if (success) {
        setProcessing(true);

        setModalVisible(false); // Fecha o modal após adicionar
        setQuantidade(1); // Reseta a quantidade
        setTimeout(() => {
          setProcessing(false);
        }, 2000);
      } else {
        setError("Falha ao adicionar o produto ao carrinho.");
      }
    }
  };

  const aumentarQuantidade = () => {
    setQuantidade(quantidade + 1);
  };

  const diminuirQuantidade = () => {
    if (quantidade > 1) {
      setQuantidade(quantidade - 1);
    }
  };

  const precoComDesconto = instrumento
    ? instrumento.preco - instrumento.desconto
    : 0;
  const precoTotal = precoComDesconto * quantidade;

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text style={{ color: "#FFFFFF" }}>Carregando produto...</Text>
      </View>
    );
  }

  if (error || !instrumento) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
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
          <View style={{ position: "absolute", width: "100%", zIndex: 2 }}>
            <BackButton style={{ top: 15, left: 15 }} />
            <FavoriteButton
              productId={instrumento.id_produto}
              clienteId={clienteId}
            />
          </View>
          <Image
            style={styles.img}
            source={{
              uri: `${BASE_URL}/produtos/imagens/${instrumento.imagem}`,
            }}
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
            <Text
              style={{
                color: colors.gray[400],
                flexGrow: 1,
              }}
            >
              {instrumento.marca}
            </Text>
            <RatingReadOnly value={4.5} />
          </View>
          <Text style={styles.title}>{instrumento.produto}</Text>
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
              {formatter.format(precoComDesconto)}
            </Text>
            <Text
              style={{ fontSize: 16, color: colors.gray[400], flexGrow: 1 }}
            >
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
            ou até 10x de {formatter.format(precoComDesconto / 10)} sem juros no
            cartão
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

          {/* Botão Adicionar ao Carrinho - Abre o Modal */}
          <Pressable
            style={{
              marginTop: 12,
              backgroundColor: colors.principal,
              paddingVertical: 12,
              borderRadius: 6,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => setModalVisible(true)}
          >
            <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "500" }}>
              Adicionar ao Carrinho
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

          <ProductTabs produtosObj={instrumento} />
        </View>
      </ScrollView>

      {/* Modal de Prévia do Produto */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Header do Modal */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Adicionar ao Carrinho</Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <X size={24} color={colors.gray[600]} />
              </TouchableOpacity>
            </View>

            {/* Conteúdo do Modal */}
            <ScrollView style={styles.modalContent}>
              {/* Informações do Produto */}
              <View style={styles.productInfo}>
                <Image
                  style={styles.modalImage}
                  source={{
                    uri: `${BASE_URL}/produtos/imagens/${instrumento.imagem}`,
                  }}
                />
                <View style={styles.productDetails}>
                  <Text style={styles.productName}>{instrumento.produto}</Text>
                  <Text
                    style={styles.productBrand}
                  >{`${instrumento.marca}`}</Text>
                  <Text style={styles.productPrice}>
                    {formatter.format(precoComDesconto)}
                  </Text>
                </View>
              </View>

              {/* Seletor de Quantidade */}
              <View style={styles.quantitySelector}>
                <Text style={styles.quantityLabel}>Quantidade</Text>
                <View style={styles.quantityControls}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={diminuirQuantidade}
                    disabled={quantidade === 1}
                  >
                    <Minus
                      size={20}
                      color={
                        quantidade === 1 ? colors.gray[100] : colors.principal
                      }
                    />
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{quantidade}</Text>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={aumentarQuantidade}
                  >
                    <Plus size={20} color={colors.principal} />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Preço Total */}
              <View style={styles.totalContainer}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalPrice}>
                  {formatter.format(precoTotal)}
                </Text>
              </View>
            </ScrollView>

            {/* Botão de Confirmar */}
            <View style={styles.modalFooter}>
              <Pressable style={styles.confirmButton} onPress={handleAddToCart}>
                <ShoppingCart size={20} color="#FFFFFF" />
                <Text style={styles.confirmButtonText}>
                  Adicionar ao Carrinho
                </Text>
              </Pressable>
              {/* Botão de continuar compra
              <Pressable
                style={styles.continueButton}
                onPress={handleAddToCart}
              >
                <ShoppingBag size={20} color={colors.principal} />
                <Text style={styles.continueButtonText} on>
                  Continuar Comprando
                </Text>
              </Pressable> */}
            </View>
          </View>
        </View>
      </Modal>
      <AddToCartProcessing visible={processing} />
    </View>
  );
}
