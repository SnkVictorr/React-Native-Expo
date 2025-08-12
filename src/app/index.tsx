import React from "react";
import {
  AppRegistry,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import HeaderMain from "../components/header-main";

import Swiper from "react-native-swiper";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />

      <HeaderMain />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <TextInput
            placeholder="O que você está procurando?"
            placeholderTextColor="#888"
            style={styles.searchInput}
          />
          <Ionicons name="search" size={20} color="#888" />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Navigation Pills */}
        <View style={styles.navPills}>
          <TouchableOpacity style={[styles.pill, styles.activePill]}>
            <Text style={styles.activePillText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.pill}>
            <Text style={styles.pillText}>Promoções</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.pill}>
            <Text style={styles.pillText}>Novidades</Text>
          </TouchableOpacity>
        </View>

        {/* Banner Principal */}
        {/* <View style={styles.bannerContainer}>
          <View style={styles.banner}>
            <View style={styles.bannerContent}>
              <Text style={styles.bannerDiscount}>30% Off em Instrumentos</Text>
              <View style={styles.bannerImage}>
                <Text style={styles.trumpetEmoji}>🎺</Text>
                <View style={styles.speakerLeft}>
                  <View style={styles.speaker} />
                </View>
                <View style={styles.speakerRight}>
                  <View style={styles.speaker} />
                </View>
              </View>
              <TouchableOpacity style={styles.seeOffersButton}>
                <Text style={styles.seeOffersText}>Ver ofertas</Text>
                <Ionicons name="arrow-forward" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </View> */}

        {/* Carousel */}
        <Swiper height={150} style={styles.wrapper} showsButtons={true}>
          <View style={styles.slide1}>
            <Image
              source={require("@/assets/images/banners/acessorios-banner.png")}
            />
          </View>
          <View style={styles.slide2}>
            <Text style={styles.text}>Beautiful</Text>
          </View>
          <View style={styles.slide3}>
            <Text style={styles.text}>And simple</Text>
          </View>
        </Swiper>

        {/* Categorias Principais */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Categorias Principais</Text>
          <View style={styles.categoriesGrid}>
            <TouchableOpacity style={styles.categoryCard}>
              <View style={styles.categoryIcon}>
                <Text style={styles.categoryEmoji}>🎵</Text>
              </View>
              <Text style={styles.categoryTitle}>Instrumentos</Text>
              <Text style={styles.categorySubtitle}>
                Encontre os melhores instrumentos musicais, com o melhor preço e
                as melhores recomendações
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.categoryCard}>
              <View style={styles.categoryIcon}>
                <Text style={styles.categoryEmoji}>🏷️</Text>
              </View>
              <Text style={styles.categoryTitle}>Marcas</Text>
              <Text style={styles.categorySubtitle}>
                Encontre as principais marcas fornecedoras de instrumentos
                musicais do mercado
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Seção de Destaques */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Destaques</Text>
          <View style={styles.featuresGrid}>
            <TouchableOpacity style={styles.featureCard}>
              <Text style={styles.featureEmoji}>🎸</Text>
              <Text style={styles.featureTitle}>Guitarras</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.featureCard}>
              <Text style={styles.featureEmoji}>🥁</Text>
              <Text style={styles.featureTitle}>Baterias</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.featureCard}>
              <Text style={styles.featureEmoji}>🎹</Text>
              <Text style={styles.featureTitle}>Teclados</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.featureCard}>
              <Text style={styles.featureEmoji}>🎤</Text>
              <Text style={styles.featureTitle}>Microfones</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer Info */}
        <View style={styles.footerInfo}>
          <Text style={styles.footerTitle}>Loja Virtual</Text>
          <Text style={styles.footerSubtitle}>Telefones:</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// AppRegistry.registerComponent("myproject", () => SwiperComponent);
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1a1a1a",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#1a1a1a",
  },
  menuButton: {
    padding: 5,
  },
  logoContainer: {
    flex: 1,
    alignItems: "center",
  },
  logo: {
    width: 40,
    height: 40,
    backgroundColor: "#f5c842",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    fontSize: 20,
  },
  cartButton: {
    padding: 5,
  },
  searchContainer: {
    paddingHorizontal: 25,
    paddingBottom: 15,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 2,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
  },
  navPills: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 20,
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
  bannerContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  banner: {
    backgroundColor: "#2d2d2d",
    borderRadius: 12,
    overflow: "hidden",
    minHeight: 180,
  },
  bannerContent: {
    padding: 20,
    alignItems: "center",
    position: "relative",
  },
  bannerDiscount: {
    color: "#f5c842",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  bannerImage: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    position: "relative",
    width: "100%",
  },
  trumpetEmoji: {
    fontSize: 40,
    marginHorizontal: 20,
  },
  speakerLeft: {
    position: "absolute",
    left: 20,
  },
  speakerRight: {
    position: "absolute",
    right: 20,
  },
  speaker: {
    width: 30,
    height: 40,
    backgroundColor: "#444",
    borderRadius: 4,
  },
  seeOffersButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5c842",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 5,
  },
  seeOffersText: {
    color: "#1a1a1a",
    fontWeight: "600",
  },
  categoriesSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  categoriesGrid: {
    gap: 15,
  },
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
    backgroundColor: "#f5c842",
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
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
    width: "100%",
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5",
  },
  slide3: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default HomeScreen;
