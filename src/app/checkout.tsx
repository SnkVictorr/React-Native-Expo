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
import { Produto } from "./types/produto";
import { SafeAreaView } from "react-native-safe-area-context";
import PaymentProcessing from "@/src/components/PaymentProcessing";
import colors from "./styles/colors";
import { OutfitText } from "../components/OutfitText";

export default function CheckoutScreen() {
  const { user } = useAuth();
  const clienteId = user?.cliente_id || null;

  const [carrinho, setCarrinho] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const frete = 19.9; // você pode trocar pelo componente <Frete />
  const [processingPayment, setProcessingPayment] = useState(false);

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
        <OutfitText style={{ color: "#fff", marginTop: 12 }}>Carregando...</OutfitText>
      </View>
    );
  }
  const finalizarPedido = () => {
    setProcessingPayment(true);

    setTimeout(() => {
      setProcessingPayment(false);
      router.replace("../pedido-finalizado");
    }, 2500); // animação de 2.5 segundos
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0d0d0d" }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* 🔥 TÍTULO */}
        <OutfitText
          style={{
            fontSize: 22,
            fontWeight: "bold",
            color: "#fff",
            marginBottom: 20,
          }}
        >
          Resumo da Compra
        </OutfitText>

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
              <OutfitText style={{ color: "#fff", fontSize: 15 }} numberOfLines={2}>
                {item.produto}
              </OutfitText>

              <OutfitText style={{ color: "#c7a315", marginTop: 6 }}>
                {formatter.format(
                  (item.preco - item.desconto) * item.quantidade
                )}
              </OutfitText>

              <OutfitText style={{ color: "#666", fontSize: 12 }}>
                Quantidade: {item.quantidade}
              </OutfitText>
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
          <OutfitText style={{ color: "#fff", fontSize: 16, marginBottom: 8 }}>
            Endereço de Entrega
          </OutfitText>
          <OutfitText style={{ color: "#888" }}>
            Rua Exemplo, 123 – Seu Bairro, SP
          </OutfitText>

          <TouchableOpacity
            style={{ marginTop: 8, flexDirection: "row", alignItems: "center" }}
          >
            <Ionicons name="pencil" color="#c7a315" size={16} />
            <OutfitText style={{ color: "#c7a315", marginLeft: 6 }}>
              Alterar endereço
            </OutfitText>
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
          <OutfitText style={{ color: "#fff", fontSize: 16, marginBottom: 12 }}>
            Método de Pagamento
          </OutfitText>

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
            <OutfitText style={{ color: "#fff", marginLeft: 10, fontSize: 15 }}>
              Cartão de Crédito
            </OutfitText>
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
            <OutfitText style={{ color: "#fff", marginLeft: 10, fontSize: 15 }}>
              Boleto Bancário
            </OutfitText>
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
            <OutfitText style={{ color: "#fff", marginLeft: 10, fontSize: 15 }}>
              Pix
            </OutfitText>
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
          <OutfitText style={{ color: "#fff", marginBottom: 8 }}>
            Subtotal: {formatter.format(subtotal)}
          </OutfitText>

          <OutfitText style={{ color: "#fff", marginBottom: 8 }}>
            Frete: {formatter.format(frete)}
          </OutfitText>

          <OutfitText
            style={{
              color: "#c7a315",
              fontSize: 18,
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            Total: {formatter.format(total)}
          </OutfitText>
        </View>
      </ScrollView>

      {/* 🔥 BOTÃO FINALIZAR */}
      <TouchableOpacity
        onPress={finalizarPedido}
        style={{
          backgroundColor: "#c7a315",
          padding: 16,
          alignItems: "center",
        }}
      >
        <OutfitText style={{ fontSize: 16, fontWeight: "bold", color: colors.gray[100] }}>
          Finalizar Pedido
        </OutfitText>
      </TouchableOpacity>

      <PaymentProcessing visible={processingPayment} />
    </SafeAreaView>
  );
}
