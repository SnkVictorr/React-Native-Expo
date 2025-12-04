import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  Pressable,
  BackHandler,
} from "react-native";
import Swiper from "react-native-swiper";
import ProductList1 from "../../components/main/ProductList1";
import MarcasList from "../../components/main/MarcasList";
import CategoryList from "../../components/main/categoryList";

import getProducts from "../services/products/get";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import stylesSearch from "../../components/searchBar/style";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "@/src/components/searchBar";

const HomeScreen = () => {
  const banners = [
    require("@/assets/images/banners/banner1.jpeg"),
    require("@/assets/images/banners/banner2.jpeg"),
    require("@/assets/images/banners/banner3.jpeg"),
    require("@/assets/images/banners/banner4.jpeg"),
  ];

  const [produtos, setProdutos] = React.useState([]);
  React.useEffect(() => {
    try {
      getProducts().then((data) => {
        setProdutos(data);
        console.log("Produtos carregados:");
      });
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    }
  }, []);

  const handleCartPress = () => {
    router.navigate("./(tabs)/carrinho");
  };

  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp(); // Fecha o app ao pressionar o botão de voltar
      return true; // Impede o comportamento padrão (voltar)
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.titleHarmonix}>HarmoniX</Text>
        <TouchableOpacity onPress={handleCartPress}>
          <Ionicons
            style={{ paddingRight: 15 }}
            name="cart"
            size={26}
            color="#FFFFFF"
          />
        </TouchableOpacity>
      </View>
      <SearchBar />
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 130 }}
      >
        {/* Carousel */}
        <View style={[styles.carousel]}>
          <Swiper
            autoplay={true}
            autoplayTimeout={8}
            loop
            height={192}
            style={styles.wrapper}
            showsButtons={false}
            dot={
              <View
                style={{
                  backgroundColor: "rgba(0,0,0,.2)",
                  width: 5,
                  height: 5,
                  borderRadius: 4,
                  marginLeft: 3,
                  marginRight: 3,
                  marginTop: 3,
                  marginBottom: 3,
                }}
              />
            }
            activeDot={
              <View
                style={{
                  backgroundColor: "#1a1a1a",
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  marginLeft: 3,
                  marginRight: 3,
                  marginTop: 3,
                  marginBottom: 3,
                }}
              />
            }
            paginationStyle={{
              bottom: 5,
            }}
            scrollEnabled={true}
            autoplayDirection={true}
          >
            {banners.map((img, index) => (
              <View key={index} style={styles.slide}>
                <Image
                  style={styles.image}
                  source={img}
                  resizeMode="cover"
                  // Para suavizar a transição da imagem, pode-se usar fadeDuration (Android)
                  fadeDuration={400}
                />
              </View>
            ))}
          </Swiper>
        </View>
        <MarcasList />
        {/* Lista de produtos 1 */}
        <ProductList1 produtosObj={produtos} />

        <CategoryList />
      </ScrollView>
    </SafeAreaView>
  );
};

// AppRegistry.registerComponent("myproject", () => SwiperComponent);
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1a1a1a",
    flex: 1,
    paddingTop: 10,
  },
  // header: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "space-between",
  //   paddingHorizontal: 20,
  //   paddingVertical: 15,
  //   backgroundColor: "#1a1a1a",
  // },
  // menuButton: {
  //   padding: 5,
  // },
  // logoContainer: {
  //   flex: 1,
  //   alignItems: "center",
  // },
  // logo: {
  //   width: 40,
  //   height: 40,
  //   backgroundColor: "#f5c842",
  //   borderRadius: 8,
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  // logoText: {
  //   fontSize: 20,
  // },
  // cartButton: {
  //   padding: 5,
  // },

  navPills: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 10,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#333",
  },
  activePill: {
    backgroundColor: "#f5c842",
  },
  pillText: {
    color: "#fff",
    fontSize: 14,
  },
  activePillText: {
    color: "#1a1a1a",
    fontSize: 14,
    fontWeight: "600",
  },
  // bannerContainer: {
  //   paddingHorizontal: 20,
  //   marginBottom: 30,
  // },
  // banner: {
  //   backgroundColor: "#2d2d2d",
  //   borderRadius: 12,
  //   overflow: "hidden",
  //   minHeight: 180,
  // },
  // bannerContent: {
  //   padding: 20,
  //   alignItems: "center",
  //   position: "relative",
  // },
  // bannerDiscount: {
  //   color: "#f5c842",
  //   fontSize: 20,
  //   fontWeight: "bold",
  //   marginBottom: 15,
  // },
  // bannerImage: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   marginVertical: 20,
  //   position: "relative",
  //   width: "100%",
  // },
  // trumpetEmoji: {
  //   fontSize: 40,
  //   marginHorizontal: 20,
  // },
  // speakerLeft: {
  //   position: "absolute",
  //   left: 20,
  // },
  // speakerRight: {
  //   position: "absolute",
  //   right: 20,
  // },
  // speaker: {
  //   width: 30,
  //   height: 40,
  //   backgroundColor: "#444",
  //   borderRadius: 4,
  // },
  // seeOffersButton: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   backgroundColor: "#f5c842",
  //   paddingHorizontal: 20,
  //   paddingVertical: 10,
  //   borderRadius: 8,
  //   gap: 5,
  // },
  // seeOffersText: {
  //   color: "#1a1a1a",
  //   fontWeight: "600",
  // },
  // categoriesSection: {
  //   paddingHorizontal: 20,
  //   marginBottom: 30,
  // },
  // sectionTitle: {
  //   color: "#fff",
  //   fontSize: 18,
  //   fontWeight: "bold",
  //   marginBottom: 15,
  // },
  // categoriesGrid: {
  //   gap: 15,
  // },
  categoryCard: {
    backgroundColor: "#2d2d2d",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  categoryIcon: {
    width: 60,
    height: 60,
    backgroundColor: "#f5c842",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  categoryEmoji: {
    fontSize: 24,
  },
  categoryTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  categorySubtitle: {
    color: "#ccc",
    fontSize: 12,
    textAlign: "center",
    lineHeight: 18,
  },
  featuresSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  featureCard: {
    backgroundColor: "#2d2d2d",
    width: "48%",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  featureEmoji: {
    fontSize: 30,
    marginBottom: 8,
  },
  featureTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  footerInfo: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: "#ffbf00",
    margin: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  footerTitle: {
    color: "#1a1a1a",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  footerSubtitle: {
    color: "#1a1a1a",
    fontSize: 14,
  },
  wrapper: {},
  carousel: {
    marginTop: 10,
    marginHorizontal: 10,
    marginBottom: 20,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    overflow: "hidden",
    paddingHorizontal: 3,
  },

  image: {
    width: "100%",
    flex: 1,
  },

  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  titleHarmonix: {
    color: "#f5c842",
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 20,
  },
});

export default HomeScreen;
