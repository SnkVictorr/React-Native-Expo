import { FlatList, Text, TouchableOpacity, View, Image } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { QuicheMedium } from "../../Quiche/quiche-medium";
import { OutfitText } from "../../OutfitText";
import MaxMinus from "../MaxMinus";
import ItemCarrinho from "@/src/app/types/carrinho";
import { fetchCarrinho } from "@/src/app/services/carrinho/get";
import { deleteItemCart } from "@/src/app/services/carrinho/delete";
import { Trash, ShoppingCart } from "lucide-react-native";
import formatter from "@/src/app/utils/formatadorDeMoeda";
import Frete from "../../Frete";
import { BASE_URL } from "@/src/app/config/api";
import { useAuth } from "@/src/app/context/AuthContext";
import FooterCarrinho from "../Footer/";
import { useFocusEffect } from "expo-router";

export default function CardCarrinho() {
  const [carrinho, setCarrinho] = useState<ItemCarrinho[] | null>(null);
  const { user } = useAuth();
  const clienteId = user?.cliente_id || null;

  const [loading, setLoading] = useState<boolean>(true);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          setLoading(true);

          if (clienteId) {
            const carrinhoCarregado = await fetchCarrinho(clienteId);
            setCarrinho(carrinhoCarregado || []);
          } else {
            setCarrinho([]);
          }
        } catch (err) {
          console.error("Erro ao carregar dados:", err);
          setCarrinho([]);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, [clienteId]) // <--- dependência correta
  );

  const removerDoCarrinho = (
    index: number,
    id_produto: number,
    id_cliente: number
  ) => {
    if (!carrinho) return;
    const novosItens = [...carrinho];
    novosItens.splice(index, 1);
    setCarrinho(novosItens);

    deleteItemCart(id_produto, id_cliente);
  };

  const incrementarQuantidade = (index: number) => {
    if (!carrinho) return;
    const novosItens = [...carrinho];
    novosItens[index].quantidade += 1;
    setCarrinho(novosItens);
  };

  const decrementarQuantidade = (index: number) => {
    if (!carrinho) return;
    const novosItens = [...carrinho];

    if (novosItens[index].quantidade > 1) {
      novosItens[index].quantidade -= 1;
      setCarrinho(novosItens);
    }
  };

  const carrinhoVazio = !carrinho || carrinho.length === 0;

  // 🔥 CÁLCULO AUTOMÁTICO DO TOTAL
  const total: number =
    carrinho?.reduce((acc, item) => {
      const subtotal = (item.preco - item.desconto) * item.quantidade;
      return acc + subtotal;
    }, 0) || 0;

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <Text style={{ color: "#FFFFFF" }}>Carregando carrinho...</Text>
      </View>
    );
  }

  if (carrinhoVazio) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <ShoppingCart size={64} color="#666666" />
        <OutfitText
          style={{
            fontSize: 18,
            color: "#666666",
            marginTop: 16,
            marginBottom: 8,
            textAlign: "center",
          }}
        >
          Seu carrinho está vazio
        </OutfitText>
        <Text
          style={{
            fontSize: 14,
            color: "#888888",
            textAlign: "center",
            lineHeight: 20,
          }}
        >
          Adicione alguns produtos para continuar com suas compras
        </Text>
      </View>
    );
  }

  return (
    <>
      <View style={{ paddingTop: 16, flex: 1 }}>
        <FlatList
          data={carrinho}
          keyExtractor={(item) => `${item.id_produto}-${item.quantidade}`}
          renderItem={({ item, index }) => (
            <View
              style={{
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "#333333",
                padding: 16,
                backgroundColor: "#111111",
                marginBottom: 12,
              }}
            >
              <View style={{ flexDirection: "row", gap: 16 }}>
                <Image
                  source={{
                    uri: `${BASE_URL}/produtos/imagens/${item.imagem}`,
                  }}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 8,
                  }}
                />

                <View style={{ flex: 1, gap: 8 }}>
                  <OutfitText numberOfLines={2}>{item.produto}</OutfitText>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <QuicheMedium style={{ fontSize: 16, color: "#c7a315" }}>
                      {formatter.format(
                        (item.preco - item.desconto) * item.quantidade
                      )}
                    </QuicheMedium>
                  </View>

                  <TouchableOpacity
                    onPress={() =>
                      removerDoCarrinho(
                        index,
                        item.id_produto,
                        clienteId as number
                      )
                    }
                  >
                    <Trash
                      color="#ff4444"
                      size={18}
                      style={{ marginTop: 25 }}
                    />
                  </TouchableOpacity>
                  <MaxMinus
                    quantidade={item.quantidade}
                    incrementar={() => incrementarQuantidade(index)}
                    decrementar={() => decrementarQuantidade(index)}
                  />
                </View>
              </View>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 10 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View
        style={{
          backgroundColor: "#111111",
          paddingBottom: 15,
          borderColor: "#333333",
          borderWidth: 1,
          marginBottom: 15,
          borderRadius: 8,
          paddingHorizontal: 20,
        }}
      >
        <Frete />
      </View>
      {/* 🔥 ENVIA O TOTAL PARA O FOOTER */}
      <FooterCarrinho total={total} carrinho={carrinho} clienteId={clienteId} />
    </>
  );
}
