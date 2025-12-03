import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/src/app/context/AuthContext";
import { fetchCarrinho } from "@/src/app/services/carrinho/get";
import formatter from "@/src/app/utils/formatadorDeMoeda";
import { BASE_URL } from "@/src/app/config/api";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function CheckoutScreen() {
  const { user } = useAuth();
  const clienteId = user?.cliente_id || null;

  const [carrinho, setCarrinho] = useState([]);
  const [loading, setLoading] = useState(true);
  const frete = 19.9; // você pode trocar pelo componente <Frete />

  useEffect(() => {
    const carregar = async () => {
      try {
        if (!clienteId) return;

        const lista = await fetchCarrinho(clienteId);
        setCarrinho(lista || []);
      } finally {
        setLoading(false);
      }
    };

    carregar();
  }, [clienteId]);

  // Cálculo do subtotal
  const subtotal =
    carrinho?.reduce((acc, item) => {
      const st = (item.preco - item.desconto) * item.quantidade;
      return acc + st;
    }, 0) || 0;

  const total = subtotal + frete;

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0d0d0d",
        }}
      >
        <ActivityIndicator color="#fff" size="large" />
        <Text style={{ color: "#fff", marginTop: 12 }}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#0d0d0d" }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* 🔥 TÍTULO */}
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            color: "#fff",
            marginBottom: 20,
          }}
        >
          Resumo da Compra
        </Text>

        {/* 🔥 LISTA DE PRODUTOS */}
        {carrinho.map((item, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              borderColor: "#222",
              borderWidth: 1,
              borderRadius: 10,
              padding: 12,
              marginBottom: 12,
              backgroundColor: "#111",
            }}
          >
            <Image
              source={{
                uri: `${BASE_URL}/produtos/imagens/${item.imagem}`,
              }}
              style={{ width: 80, height: 80, borderRadius: 6 }}
            />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={{ color: "#fff", fontSize: 15 }} numberOfLines={2}>
                {item.produto}
              </Text>

              <Text style={{ color: "#c7a315", marginTop: 6 }}>
                {formatter.format(
                  (item.preco - item.desconto) * item.quantidade
                )}
              </Text>

              <Text style={{ color: "#666", fontSize: 12 }}>
                Quantidade: {item.quantidade}
              </Text>
            </View>
          </View>
        ))}

        {/* 🔥 ENDEREÇO – (Futuro: edição) */}
        <View
          style={{
            padding: 16,
            borderRadius: 10,
            backgroundColor: "#111",
            marginTop: 20,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16, marginBottom: 8 }}>
            Endereço de Entrega
          </Text>
          <Text style={{ color: "#888" }}>
            Rua Exemplo, 123 – Seu Bairro, SP
          </Text>

          <TouchableOpacity
            style={{ marginTop: 8, flexDirection: "row", alignItems: "center" }}
          >
            <Ionicons name="pencil" color="#c7a315" size={16} />
            <Text style={{ color: "#c7a315", marginLeft: 6 }}>
              Alterar endereço
            </Text>
          </TouchableOpacity>
        </View>

        {/* 🔥 PAGAMENTO */}
        <View
          style={{
            padding: 16,
            borderRadius: 10,
            backgroundColor: "#111",
            marginTop: 20,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16, marginBottom: 12 }}>
            Método de Pagamento
          </Text>

          <TouchableOpacity
            style={{
              backgroundColor: "#222",
              borderRadius: 8,
              padding: 12,
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Ionicons name="card" size={22} color="#c7a315" />
            <Text style={{ color: "#fff", marginLeft: 10, fontSize: 15 }}>
              Cartão de Crédito
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: "#222",
              borderRadius: 8,
              padding: 12,
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Ionicons name="barcode" size={22} color="#c7a315" />
            <Text style={{ color: "#fff", marginLeft: 10, fontSize: 15 }}>
              Boleto Bancário
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: "#222",
              borderRadius: 8,
              padding: 12,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Ionicons name="logo-alipay" size={22} color="#00E676" />
            <Text style={{ color: "#fff", marginLeft: 10, fontSize: 15 }}>
              Pix
            </Text>
          </TouchableOpacity>
        </View>

        {/* 🔥 RESUMO DE VALORES */}
        <View
          style={{
            padding: 16,
            backgroundColor: "#111",
            borderRadius: 10,
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <Text style={{ color: "#fff", marginBottom: 8 }}>
            Subtotal: {formatter.format(subtotal)}
          </Text>

          <Text style={{ color: "#fff", marginBottom: 8 }}>
            Frete: {formatter.format(frete)}
          </Text>

          <Text
            style={{
              color: "#c7a315",
              fontSize: 18,
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            Total: {formatter.format(total)}
          </Text>
        </View>
      </ScrollView>

      {/* 🔥 BOTÃO FINALIZAR */}
      <TouchableOpacity
        onPress={() => router.push("/finalizado")}
        style={{
          backgroundColor: "#c7a315",
          padding: 16,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#000" }}>
          Finalizar Pedido
        </Text>
      </TouchableOpacity>
    </View>
  );
}
