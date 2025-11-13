import { FlatList, Text, TouchableOpacity, View } from "react-native";
import React, { Component, useEffect, useState } from "react";
import { Image } from "react-native";
import { QuicheMedium } from "../../Quiche/quiche-medium";
import { OutfitText } from "../../OutfitText";
import MaxMinus from "../MaxMinus";
import ItemCarrinho from "@/src/app/types/carrinho";
import { getClienteId } from "@/src/app/services/clientes/get";
import { fetchCarrinho } from "@/src/app/services/carrinho/get";
import { deleteItemCart } from "@/src/app/services/carrinho/delete";
import { Trash, ShoppingCart } from "lucide-react-native";
import formatter from "@/src/app/utils/formatadorDeMoeda";
import Frete from "../../Frete";
import { BASE_URL, AUTH_TOKEN } from "@/src/app/config/api";

export default function CardCarrinho() {
  const [carrinho, setCarrinho] = useState<ItemCarrinho[] | null>(null);
  const [cliente_id, setCliente_id] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const id = 3;
        console.log("Cliente ID:", id);

        if (id) {
          setCliente_id(id);
          // Buscar carrinho imediatamente após obter o ID
          const carrinhoCarregado = await fetchCarrinho(id);
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
  }, []); // Removida a dependência do cliente_id

  // Função para remover item do carrinho
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

  // Função para incrementar quantidade
  const incrementarQuantidade = (index: number) => {
    if (!carrinho) return;
    const novosItens = [...carrinho];
    novosItens[index].quantidade += 1;
    setCarrinho(novosItens);
  };

  // Função para decrementar quantidade
  const decrementarQuantidade = (index: number) => {
    if (!carrinho) return;
    const novosItens = [...carrinho];
    if (novosItens[index].quantidade > 1) {
      novosItens[index].quantidade -= 1;
      setCarrinho(novosItens);
    }
  };

  // Verificação automática para carrinho vazio
  const carrinhoVazio = !carrinho || carrinho.length === 0;

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
          minHeight: 50,
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
          minHeight: 100,
        }}
      >
        <ShoppingCart size={64} color="#666666" />
        <OutfitText
          style={{
            fontSize: 18,
            color: "#666666",
            textAlign: "center",
            marginTop: 16,
            marginBottom: 8,
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
                style={{ width: 100, height: 100, borderRadius: 8 }}
              />
              <View style={{ flex: 1, flexDirection: "column", gap: 8 }}>
                <OutfitText
                  style={{ flex: 1, flexWrap: "wrap" }}
                  numberOfLines={2}
                >
                  {item.produto}
                </OutfitText>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <QuicheMedium style={{ fontSize: 16, color: "#c7a315" }}>
                    {formatter.format(item.preco - item.desconto)}
                  </QuicheMedium>
                  <MaxMinus
                    quantidade={item.quantidade}
                    incrementar={() => incrementarQuantidade(index)}
                    decrementar={() => decrementarQuantidade(index)}
                  />
                </View>
                <TouchableOpacity
                  onPress={() =>
                    removerDoCarrinho(
                      index,
                      item.id_produto,
                      cliente_id as number
                    )
                  }
                >
                  <Trash color="#ff4444" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />

      {!carrinhoVazio && (
        <View
          style={{
            backgroundColor: "#111111",
            paddingHorizontal: 20,
            marginTop: 10,
            paddingBottom: 20,
            borderRadius: 8,
          }}
        >
          <Frete />
        </View>
      )}
    </View>
  );
}
