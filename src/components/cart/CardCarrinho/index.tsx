import { FlatList, Text, TouchableOpacity, View } from "react-native";
import React, { Component, useEffect, useState } from "react";
import { Image } from "react-native";
import { QuicheMedium } from "../../Quiche/quiche-medium";
import { OutfitText } from "../../OutfitText";
import MaxMinus from "../MaxMinus";
import ItemCarrinho from "@/src/app/types/carrinho";
import { getClienteId } from "@/src/app/services/cliente/get";
import { fetchCarrinho } from "@/src/app/services/carrinho/get";
import { deleteItemCart } from "@/src/app/services/carrinho/delete";
import { Trash } from "lucide-react-native";
import formatter from "@/src/app/utils/formatadorDeMoeda";

export default function CardCarrinho() {
  const [carrinho, setCarrinho] = useState<ItemCarrinho[] | null>(null);
  const [cliente_id, setCliente_id] = useState<number | null>(null);

  useEffect(() => {
    const fetchClienteId = async () => {
      const id = await getClienteId();
      console.log("Cliente ID:", id);
      if (id) {
        setCliente_id(id);
      }
    };

    fetchClienteId();
  }, []);

  useEffect(() => {
    const LoadCarrinho = async () => {
      try {
        const carrinhoCarregado = await fetchCarrinho(cliente_id as number);
        setCarrinho(carrinhoCarregado || null);
      } catch (err) {
        console.error(err);
      }
    };
    LoadCarrinho();
  }, [cliente_id]);

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

  return (
    <View style={{ paddingTop: 16 }}>
      <FlatList
        data={carrinho}
        keyExtractor={(item) => item.id_produto.toString()}
        renderItem={({ item, index }) => (
          <View
            style={{
              borderRadius: 8,
              borderWidth: 1,
              borderColor: "#333333",
              padding: 16,
              backgroundColor: "#111111",
            }}
          >
            <View style={{ flexDirection: "row", gap: 16 }}>
              <Image
                source={{
                  uri: `http://localhost:8080/produtos/imagens/${item.imagem}`,
                  headers: {
                    authorization:
                      "stNOJvYxgbX3bRg3CEGMTNiqnIO3TMMHPi8K3ehLzk3KqcN3tJbDnBdMwWvAj84r2fiKvaAxQC58i1BsR5iqjBzzscwMudNv8xL6",
                  },
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
                  <Trash />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}
